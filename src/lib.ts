import * as assert from 'assert'
import * as fs from 'fs'
import { safeLoad } from 'js-yaml'
import BN = require('bn.js')

let mem: WebAssembly.Memory
let res: Buffer

export const setMemory = (m: WebAssembly.Memory) => {
  mem = m
}

export const getRes = () => {
  if (res) {
    return res
  } else {
    return Buffer.from([])
  }
  
}

const memset = (mem: WebAssembly.Memory, offset: number, data: Buffer) => {
  const asBytes = new Uint8Array(mem.buffer, offset, data.length)
  asBytes.set(data)
}

const memget = (mem: WebAssembly.Memory, offset: number, length: number) => {
  return Buffer.from(new Uint8Array(mem.buffer, offset, length))
}

export interface ShardBlock {
  env: number
  blockData: Buffer
}

export interface TestCase {
  script: string
  preStateRoot: Buffer
  blocks: Buffer[]
  postStateRoot: Buffer
}

export interface EnvData {
  preStateRoot: Buffer
  blockData: Buffer
}

let MulModMontCallCount = 0;


const MASK_384 = new BN('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16);

var bls12_field_modulus = new BN('1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab', 16);
var bls12_r_inv = new BN('16ef2ef0c8e30b48286adb92d9d113e889f3fffcfffcfffd', 16); // use 192-bit limbs
// see https://repl.it/repls/MoralMarriedTrees for info on calculating r_inv

var bls12_r_squared = new BN('11988fe592cae3aa9a793e85b519952d67eb88a9939d83c08de5476c4c95b6d50a76e6a609d104f1f4df1f341c341746', 16);


var field_modulus = bls12_field_modulus;
var r_inv = bls12_r_inv;
var r_squared = bls12_r_squared;


function addmod(a: BN, b: BN): BN {
  var res = a.add(b);
  if (res.cmp(field_modulus) >= 0) {
    res.isub(field_modulus);
  }
  return res
}

function submod(a: BN, b: BN): BN {
  var res = a.sub(b);
  if (res.cmpn(0) < 0) {
    res.iadd(field_modulus);
  }
  return res
}


function mulmodmont(a: BN, b: BN): BN {
  var t = a.mul(b);
  var k0 = t.mul(r_inv).maskn(192);
  var res2 = k0.mul(field_modulus).add(t).shrn(192);
  var k1 = res2.mul(r_inv).maskn(192);
  var result = k1.mul(field_modulus).add(res2).shrn(192);

  if (result.gt(field_modulus)) {
    result = result.sub(field_modulus)
  }
  return result
}


const BIGNUM_WIDTH_BYTES = 48; // 384-bit arithmetic

const TWO_POW384 = new BN('01000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 16);

export const getImports = (env: EnvData) => {
  return {
    env: {
      eth2_loadPreStateRoot: (ptr: number) => {
        memset(mem, ptr, env.preStateRoot)
      },
      eth2_blockDataSize: () => {
        return env.blockData.byteLength
      },
      eth2_blockDataCopy: (ptr: number, offset: number, length: number) => {
        memset(mem, ptr, env.blockData.slice(offset, offset + length))
      },
      eth2_savePostStateRoot: (ptr: number) => {
        res = memget(mem, ptr, 32)
        //console.log('eth2_savePostStateRoot:', memget(mem, ptr, 144).toString('hex'))
      },
      abort: () => { throw ('Wasm aborted') },
      debug_print32: (value: number) => console.log('debug_print32: ', value),
      debug_printMem: (ptr: number, length: number) => console.log('debug_printMem: ', ptr, length, memget(mem, ptr, length)),
      debug_printMemHex: (ptr: number, length: number) => {
        console.log('debug_printMemHex: ', ptr, length, memget(mem, ptr, length).toString('hex'))
      },
      // modular multiplication of two numbers in montgomery form (i.e. montgomery multiplication)
      bignum_f1m_mul: (aOffset: number, bOffset: number, rOffset: number) => {
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES), 'le')
        const b = new BN(memget(mem, bOffset, BIGNUM_WIDTH_BYTES), 'le')

        var result = mulmodmont(a, b);
        var result_le = result.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES);

        memset(mem, rOffset, result_le)
      },
      bignum_f1m_add: (aOffset: number, bOffset: number, outOffset: number) => {
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES), 'le');
        const b = new BN(memget(mem, bOffset, BIGNUM_WIDTH_BYTES), 'le');
        var result = addmod(a, b);

        var result_le = result.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES)

        memset(mem, outOffset, result_le)
      },
      bignum_f1m_sub: (aOffset: number, bOffset: number, outOffset: number) => {
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES), 'le');
        const b = new BN(memget(mem, bOffset, BIGNUM_WIDTH_BYTES), 'le');
        var result = submod(a, b);

        var result_le = result.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES)
        memset(mem, outOffset, result_le)
      },
      bignum_int_add: (aOffset: number, bOffset: number, outOffset: number) => {
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES), 'le');
        const b = new BN(memget(mem, bOffset, BIGNUM_WIDTH_BYTES), 'le');
        //const result = a.add(b).maskn(256);

        // websnark int_add returns a carry bit if the operation overflowed
        const resultFull = a.add(b);
        let carry = 0;
        if (resultFull.gt(MASK_384)) {
          carry = 1;
        }
        //const result = resultFull.maskn(256);
        const result = resultFull.mod(TWO_POW384); // how ethereumjs-vm does it

        const result_le = result.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES)
        memset(mem, outOffset, result_le)

        return carry
      },
      bignum_int_sub: (aOffset: number, bOffset: number, outOffset: number) => {
        //console.log('bignum_int_sub')
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES), 'le')
        const b = new BN(memget(mem, bOffset, BIGNUM_WIDTH_BYTES), 'le')

        // websnark int_sub returns a carry bit
        const resultFull = a.sub(b)
        let carry = 0
        if (resultFull.isNeg()) {
          carry = 1
        }
        const result = resultFull.toTwos(384);

        const result_le = result.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES)
        memset(mem, outOffset, result_le)
        
        return carry
      },
      bignum_int_mul: (aOffset: number, bOffset: number, outOffset: number) => {
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES), 'le');
        const b = new BN(memget(mem, bOffset, BIGNUM_WIDTH_BYTES), 'le');
        const result = a.mul(b).mod(TWO_POW384);

        const result_le = result.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES)
        memset(mem, outOffset, result_le)
      },
      bignum_int_div: (aOffset: number, bOffset: number, cOffset: number, rOffset: number) => {
        // c is the quotient
        // r is the remainder
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES), 'le');
        const b = new BN(memget(mem, bOffset, BIGNUM_WIDTH_BYTES), 'le');
        // @ts-ignore
        const result = a.divmod(b);
        const result_quotient_le = result.div.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES)
        const result_remainder_le = result.mod.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES)

        memset(mem, cOffset, result_quotient_le)
        memset(mem, rOffset, result_remainder_le)
      },
    }
  }
}

export function parseYaml (file: string): TestCase[] {
  const testCase = safeLoad(file)
  const scripts = testCase.beacon_state.execution_scripts
  const shardBlocks = testCase.shard_blocks
  const testCases = []
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i]
    const preStateRoot = Buffer.from(testCase.shard_pre_state.exec_env_states[i], 'hex')
    const postStateRoot = Buffer.from(testCase.shard_post_state.exec_env_states[i], 'hex')
    //assert(preStateRoot.length === 32)
    //assert(postStateRoot.length === 32)

    const blocks = []
    for (let b of shardBlocks) {
      if (parseInt(b.env, 10) === i) {
        blocks.push(Buffer.from(b.data, 'hex'))
      }
    }

    testCases.push({
      script,
      preStateRoot,
      postStateRoot,
      blocks
    })
  }


  return testCases
}
