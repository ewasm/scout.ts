import * as assert from 'assert'
import * as fs from 'fs'
import { safeLoad } from 'js-yaml'
import BN = require('bn.js')
import { TWO_POW256 } from 'ethereumjs-util'

let mem: WebAssembly.Memory
let res: Buffer

export const setMemory = (m: WebAssembly.Memory) => {
  mem = m
}

export const getRes = () => res

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


//const TWO_POW256 = new BN('10000000000000000000000000000000000000000000000000000000000000000', 16);
const MASK_256 = new BN('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16);

//var secp256k1_field_modulus = new BN('fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f', 16);
//var secp256k1_r_inv = new BN('bcb223fedc24a059d838091dd2253531', 16);
//var secp256k1_r_squared = new BN('1000007a2000e90a1', 16);

// 0x30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47
var bn128_field_modulus = new BN('30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47', 16);
var bn128_r_inv = new BN('9ede7d651eca6ac987d20782e4866389', 16);
var bn128_r_squared = new BN('06d89f71cab8351f47ab1eff0a417ff6b5e71911d44501fbf32cfc5b538afa89', 16)


//var field_modulus = secp256k1_field_modulus;
//var r_inv = secp256k1_r_inv;
//var r_squared = secp256k1_r_squared;


var field_modulus = bn128_field_modulus;
var r_inv = bn128_r_inv;
var r_squared = bn128_r_squared;


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
  var k0 = t.mul(r_inv).maskn(128);
  var res2 = k0.mul(field_modulus).add(t).shrn(128);
  var k1 = res2.mul(r_inv).maskn(128);
  var result = k1.mul(field_modulus).add(res2).shrn(128);
  if (result.gt(field_modulus)) {
    result = result.sub(field_modulus)
  }
  return result
}

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
      },
      abort: () => { throw ('Wasm aborted') },
      debug_print32: (value: number) => console.log('debug_print32', value),
      debug_printMem: (ptr: number, length: number) => console.log('debug_printMem: ', ptr, length, memget(mem, ptr, length)),
      debug_printMemHex: (ptr: number, length: number) => {
        console.log('debug_printMemHex: ', ptr, length, memget(mem, ptr, length).toString('hex').match(/.{2}/g).reverse().join(""))
      },
      bignum_add256: (aOffset: number, bOffset: number, cOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32))
        const b = new BN(memget(mem, bOffset, 32))
        const c = a.add(b).mod(TWO_POW256).toArrayLike(Buffer, 'be', 32)
        memset(mem, cOffset, c)
      },
      bignum_mul256: (aOffset: number, bOffset: number, cOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32))
        const b = new BN(memget(mem, bOffset, 32))
        const c = a.mul(b).mod(TWO_POW256).toArrayLike(Buffer, 'be', 32)
        memset(mem, cOffset, c)
      },
      bignum_sub256: (aOffset: number, bOffset: number, cOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32))
        const b = new BN(memget(mem, bOffset, 32))
        const c = a.sub(b).toTwos(256).toArrayLike(Buffer, 'be', 32)
        memset(mem, cOffset, c)
      },
      bignum_div256: (aOffset: number, bOffset: number, cOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32))
        const b = new BN(memget(mem, bOffset, 32))
        if (b.isZero()) throw new Error('division by zero')
        const c = a.div(b).toArrayLike(Buffer, 'be', 32)
        memset(mem, cOffset, c)
      },
      bignum_mulMod: (aOffset: number, bOffset: number, cOffset: number, rOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32))
        const b = new BN(memget(mem, bOffset, 32))
        const c = new BN(memget(mem, cOffset, 32))
        if (c.isZero()) throw new Error('modulus is zero')
        const r = a.mul(b).mod(c).toArrayLike(Buffer, 'be', 32)
        memset(mem, rOffset, r)
      },
      // modular multiplication of two numbers in montgomery form (i.e. montgomery multiplication)
      bignum_f1m_mul: (aOffset: number, bOffset: number, rOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32), 'le')
        const b = new BN(memget(mem, bOffset, 32), 'le')

        var result = mulmodmont(a, b);

        //console.log('bignum_f1m_mul a:', a.toString())
        //console.log('bignum_f1m_mul b:', b.toString())
        //console.log('bignum_f1m_mul result:', result.toString())

        var result_le = result.toArrayLike(Buffer, 'le', 32);

        memset(mem, rOffset, result_le)
      },
      bignum_f1m_square: (inOffset: number, outOffset: number) => {
        const in_param = new BN(memget(mem, inOffset, 32), 'le');
        var result = mulmodmont(in_param, in_param);

        var result_le = result.toArrayLike(Buffer, 'le', 32)
        memset(mem, outOffset, result_le)
      },
      bignum_f1m_add: (aOffset: number, bOffset: number, outOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32), 'le');
        const b = new BN(memget(mem, bOffset, 32), 'le');
        var result = addmod(a, b);

        var result_le = result.toArrayLike(Buffer, 'le', 32)

        memset(mem, outOffset, result_le)
      },
      bignum_f1m_sub: (aOffset: number, bOffset: number, outOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32), 'le');
        const b = new BN(memget(mem, bOffset, 32), 'le');
        var result = submod(a, b);

        var result_le = result.toArrayLike(Buffer, 'le', 32)
        memset(mem, outOffset, result_le)
      },
      bignum_f1m_toMontgomery: (inOffset: number, outOffset: number) => {
        const in_param = new BN(memget(mem, inOffset, 32), 'le');

        var result = mulmodmont(in_param, r_squared);
        var result_le = result.toArrayLike(Buffer, 'le', 32)

        memset(mem, outOffset, result_le)
      },
      bignum_f1m_fromMontgomery: (inOffset: number, outOffset: number) => {
        const in_param = new BN(memget(mem, inOffset, 32), 'le');

        var one = new BN('1', 16);
        var result = mulmodmont(in_param, one);
        var result_le = result.toArrayLike(Buffer, 'le', 32)

        memset(mem, outOffset, result_le)
      },
      bignum_int_add: (aOffset: number, bOffset: number, outOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32), 'le');
        const b = new BN(memget(mem, bOffset, 32), 'le');
        //const result = a.add(b).maskn(256);

        // websnark int_add returns a carry bit if the operation overflowed
        const resultFull = a.add(b);
        let carry = 0;
        if (resultFull.gt(MASK_256)) {
          carry = 1;
        }
        //const result = resultFull.maskn(256);
        const result = resultFull.mod(TWO_POW256); // how ethereumjs-vm does it
        const result_le = result.toArrayLike(Buffer, 'le', 32)
        memset(mem, outOffset, result_le)

        return carry
      },
      bignum_int_sub: (aOffset: number, bOffset: number, outOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32), 'le')
        const b = new BN(memget(mem, bOffset, 32), 'le')

        // websnark int_sub returns a carry bit
        const resultFull = a.sub(b)
        let carry = 0
        if (resultFull.isNeg()) {
          carry = 1
        }
        const result = resultFull.toTwos(256);

        const result_le = result.toArrayLike(Buffer, 'le', 32)
        memset(mem, outOffset, result_le)
        
        return carry
      },
      bignum_int_mul: (aOffset: number, bOffset: number, outOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32), 'le');
        const b = new BN(memget(mem, bOffset, 32), 'le');
        //const result = a.mul(b).maskn(256);
        const result = a.mul(b).mod(TWO_POW256);

        const result_le = result.toArrayLike(Buffer, 'le', 32)
        memset(mem, outOffset, result_le)
      },
      bignum_int_div: (aOffset: number, bOffset: number, cOffset: number, rOffset: number) => {
        // c is the quotient
        // r is the remainder
        const a = new BN(memget(mem, aOffset, 32), 'le');
        const b = new BN(memget(mem, bOffset, 32), 'le');
        // @ts-ignore
        const result = a.divmod(b);
        const result_quotient_le = result.div.toArrayLike(Buffer, 'le', 32)
        const result_remainder_le = result.mod.toArrayLike(Buffer, 'le', 32)

        memset(mem, cOffset, result_quotient_le)
        memset(mem, rOffset, result_remainder_le)
      }
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
    assert(preStateRoot.length === 32)
    assert(postStateRoot.length === 32)

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
