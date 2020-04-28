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
const MASK_384 = new BN('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16);

//var secp256k1_field_modulus = new BN('fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f', 16);
//var secp256k1_r_inv = new BN('bcb223fedc24a059d838091dd2253531', 16);
//var secp256k1_r_squared = new BN('1000007a2000e90a1', 16);

var bls12_field_modulus = new BN('1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab', 16);
//var bn128_r_inv = new BN('9ede7d651eca6ac987d20782e4866389', 16);
//var bls12_r_inv = new BN('286adb92d9d113e889f3fffcfffcfffd', 16);
var bls12_r_inv = new BN('16ef2ef0c8e30b48286adb92d9d113e889f3fffcfffcfffd', 16); // use 192-bit limbs
// see https://repl.it/repls/MoralMarriedTrees for info on calculating r_inv


//var bn128_r_squared = new BN('06d89f71cab8351f47ab1eff0a417ff6b5e71911d44501fbf32cfc5b538afa89', 16)
var bls12_r_squared = new BN('11988fe592cae3aa9a793e85b519952d67eb88a9939d83c08de5476c4c95b6d50a76e6a609d104f1f4df1f341c341746', 16);

/*
inv used in montmul: fffcfffd
pR:  1824b159acc5056f998c4fefecbc4ff55884b7fa0003480200000001fffffffe
pR2: 748d9d99f59ff1105d314967254398f2b6cedcb87925c23c999e990f3f29c6d
inv used in montmul: ffffffff
*/

//var field_modulus = secp256k1_field_modulus;
//var r_inv = secp256k1_r_inv;
//var r_squared = secp256k1_r_squared;


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

/*
function mulmodmont(a: BN, b: BN): BN {
  console.log('doing a.mul...')
  var t = a.mul(b);
  console.log('doing t.mul...')
  var k0 = t.mul(r_inv).maskn(128);
  console.log('doing k0.mul...')
  //var res2 = k0.mul(field_modulus).add(t).shrn(128);
  var res2 = k0.mul(field_modulus).add(t).shrn(192);
  console.log('doing res2.mul...')
  console.log('got res2:', res2.toString(16))
  var k1 = res2.mul(r_inv).maskn(128);
  console.log('doing k1.mul..')
  var k1_mul = k1.mul(field_modulus);
  console.log('doing k1_mul.add...')
  var k1_mul_add = k1_mul.add(res2);
  console.log('doing k1_mul_add.shrn...')
  console.log('k1_mul_add:', k1_mul_add.toString(16));
  var result = k1_mul_add.shrn(192);

  console.log('doing if result.gt...')
  if (result.gt(field_modulus)) {
    result = result.sub(field_modulus)
  }
  console.log('returning result:', result.toString(16))
  return result
}
*/


function mulmodmont(a: BN, b: BN): BN {
  var t = a.mul(b);
  //console.log('result768:', t.toString(16));

  var k0 = t.mul(r_inv).maskn(192);
  //console.log('k0:', k0.toString(16));

  var res2 = k0.mul(field_modulus).add(t).shrn(192);
  // var res2 = k0.mul(field_modulus).add(t).shrn(128);
  //console.log('got res2:', res2.toString(16));
  var k1 = res2.mul(r_inv).maskn(192);
  var result = k1.mul(field_modulus).add(res2).shrn(192);

  if (result.gt(field_modulus)) {
    result = result.sub(field_modulus)
  }
  //console.log('returning result:', result.toString(16))
  return result
}


/*
function mulmodmont(a: BN, b: BN): BN {
  var t = a.mul(b);
  var k0 = t.mul(r_inv).maskn(128);
  var res2 = k0.mul(field_modulus).add(t).shrn(128);
  var k1 = res2.mul(r_inv).maskn(128);
  var res3 = k1.mul(field_modulus).add(res2).shrn(128);
  var k2 = res3.mul(r_inv).maskn(128);
  var result = k2.mul(field_modulus).add(res3).shrn(128);
  if (result.gt(field_modulus)) {
    result = result.sub(field_modulus)
  }
  return result
}
*/

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
        //res = memget(mem, ptr, 32)
        console.log('eth2_savePostStateRoot:', memget(mem, ptr, 144).toString('hex'))
        
      },
      abort: () => { throw ('Wasm aborted') },
      debug_print32: (value: number) => console.log('debug_print32', value),
      debug_printMem: (ptr: number, length: number) => console.log('debug_printMem: ', ptr, length, memget(mem, ptr, length)),
      debug_printMemHex: (ptr: number, length: number) => {
        console.log('debug_printMemHex: ', ptr, length, memget(mem, ptr, length).toString('hex'))
      },
      bignum_add384: (aOffset: number, bOffset: number, cOffset: number) => {
        console.log('bignum_add384')
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES))
        const b = new BN(memget(mem, bOffset, BIGNUM_WIDTH_BYTES))
        const c = a.add(b).mod(TWO_POW384).toArrayLike(Buffer, 'be', BIGNUM_WIDTH_BYTES)
        memset(mem, cOffset, c)
        console.log('bignum_add384 done.')
      },
      bignum_mul384: (aOffset: number, bOffset: number, cOffset: number) => {
        console.log('bignum_mul384')
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES))
        const b = new BN(memget(mem, bOffset, 32))
        const c = a.mul(b).mod(TWO_POW384).toArrayLike(Buffer, 'be', BIGNUM_WIDTH_BYTES)
        memset(mem, cOffset, c)
        console.log('bignum_mul384 done')
      },
      bignum_sub384: (aOffset: number, bOffset: number, cOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32))
        const b = new BN(memget(mem, bOffset, 32))
        const c = a.sub(b).toTwos(384).toArrayLike(Buffer, 'be', BIGNUM_WIDTH_BYTES)
        memset(mem, cOffset, c)
      },
      bignum_div384: (aOffset: number, bOffset: number, cOffset: number) => {
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES))
        const b = new BN(memget(mem, bOffset, BIGNUM_WIDTH_BYTES))
        if (b.isZero()) throw new Error('division by zero')
        const c = a.div(b).toArrayLike(Buffer, 'be', BIGNUM_WIDTH_BYTES)
        memset(mem, cOffset, c)
      },
      bignum_mulMod384: (aOffset: number, bOffset: number, cOffset: number, rOffset: number) => {
        console.log('bignum_mulMod384')
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES))
        const b = new BN(memget(mem, bOffset, BIGNUM_WIDTH_BYTES))
        const c = new BN(memget(mem, cOffset, BIGNUM_WIDTH_BYTES))
        if (c.isZero()) throw new Error('modulus is zero')
        const r = a.mul(b).mod(c).toArrayLike(Buffer, 'be', BIGNUM_WIDTH_BYTES)
        memset(mem, rOffset, r)
        console.log('bignum_mulMod384 done.')
      },
      // modular multiplication of two numbers in montgomery form (i.e. montgomery multiplication)
      bignum_f1m_mul: (aOffset: number, bOffset: number, rOffset: number) => {
        console.log('bignum_f1m_mul.')
        const a = new BN(memget(mem, aOffset, BIGNUM_WIDTH_BYTES), 'le')
        const b = new BN(memget(mem, bOffset, BIGNUM_WIDTH_BYTES), 'le')

        var result = mulmodmont(a, b);

        //console.log('bignum_f1m_mul a:', a.toString())
        //console.log('bignum_f1m_mul b:', b.toString())
        //console.log('bignum_f1m_mul result:', result.toString())

        var result_le = result.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES);

        memset(mem, rOffset, result_le)
        console.log('bignum_f1m_mul done.')
      },
      bignum_f1m_square: (inOffset: number, outOffset: number) => {
        console.log('bignum_f1m_square')
        const in_param = new BN(memget(mem, inOffset, BIGNUM_WIDTH_BYTES), 'le');
        var result = mulmodmont(in_param, in_param);
        console.log('bignum_f1m_square got mulmodmont result...')
        var result_le = result.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES)
        console.log('bignum_f1m_square calling memset...')
        memset(mem, outOffset, result_le)
        console.log('bignum_f1m_square done.')
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
      bignum_f1m_toMontgomery: (inOffset: number, outOffset: number) => {
        console.log('bignum_f1m_toMontgomery')
        const in_param = new BN(memget(mem, inOffset, BIGNUM_WIDTH_BYTES), 'le');

        var result = mulmodmont(in_param, r_squared);
        var result_le = result.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES)

        memset(mem, outOffset, result_le)
        console.log('bignum_f1m_toMontgomery done.')
      },
      bignum_f1m_fromMontgomery: (inOffset: number, outOffset: number) => {
        console.log('bignum_f1m_fromMontgomery')
        const in_param = new BN(memget(mem, inOffset, BIGNUM_WIDTH_BYTES), 'le');

        var one = new BN('1', 16);
        var result = mulmodmont(in_param, one);
        var result_le = result.toArrayLike(Buffer, 'le', BIGNUM_WIDTH_BYTES)

        memset(mem, outOffset, result_le)
        console.log('bignum_f1m_fromMontgomery done.')
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
        //const result = a.mul(b).maskn(256);
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
