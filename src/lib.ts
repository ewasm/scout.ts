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

// 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f == 115792089237316195423570985008687907853269984665640564039457584007908834671663
//const q = bigInt("115792089237316195423570985008687907853269984665640564039457584007908834671663");

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
        console.log('debug_printMemHex: ', ptr, length, memget(mem, ptr, length).toString('hex'))
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
      bignum_mulModMont: (aOffset: number, bOffset: number, rOffset: number) => {
        //console.log('bignum_mulModMont.')
        /*
        BN.prototype.redMul = function redMul (num) {
          assert(this.red, 'redMul works only with red numbers');
          this.red._verify2(this, num);
          return this.red.mul(this, num);
        };
 
        Red.prototype.mul = function mul (a, b) {
          this._verify2(a, b);
          return this.imod(a.mul(b));
        };

        Red.prototype.imod = function imod (a) {
          if (this.prime) return this.prime.ireduce(a)._forceRed(this);

          a.umod(this.m)._forceRed(this)._move(a);
          return a;
        };

        BN.prototype.umod = function umod (num) {
          return this.divmod(num, 'mod', true).mod;
        };

        MPrime.prototype.ireduce = function ireduce (num) {
          // Assumes that `num` is less than `P^2`
          // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
          var r = num;
          var rlen;

          do {
            this.split(r, this.tmp);
            r = this.imulK(r);
            r = r.iadd(this.tmp);
            rlen = r.bitLength();
          } while (rlen > this.n);

          var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
          if (cmp === 0) {
            r.words[0] = 0;
            r.length = 1;
          } else if (cmp > 0) {
            r.isub(this.p);
          } else {
            r._strip();
          }

          return r;
        };
        */

        // modulus c is a state variable, not an argument
        const a = new BN(memget(mem, aOffset, 32), 'le')
        const b = new BN(memget(mem, bOffset, 32), 'le')

        var red = BN.red('k256')

        // use forceRed to flag that the numbers are already in montgomery form
        // error TS2339: Property 'forceRed' does not exist on type 'BN'.
        // @ts-ignore
        var redA = a.forceRed(red)
        // looks like typescript defs for bn.js don't include forceRed
        // @ts-ignore
        var redB = b.forceRed(red)

        const r = redA.redMul(redB).toArrayLike(Buffer, 'le', 32)

        // error TS2576: Property 'red' is a static member of type 'BN'
        //a.red = red
        //b.red = red

        /*
        // this compiles with default typescript types
        var redA = a.toRed(red)
        var redB = b.toRed(red)
        const r = redA.redMul(b).toArrayLike(Buffer, 'le', 32)
        */


        //const r = a.redMul(b).toArrayLike(Buffer, 'le', 32)
        //console.log('bignum_mulModMont result:', r.toString('hex'))
        memset(mem, rOffset, r)

        /*
        //const c = new BN(memget(mem, cOffset, 32))
        if (c.isZero()) throw new Error('modulus is zero')
        const r = a.mul(b).mod(c).toArrayLike(Buffer, 'be', 32)
        memset(mem, rOffset, r)
        */
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
