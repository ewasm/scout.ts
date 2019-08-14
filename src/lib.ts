import * as assert from 'assert'
import * as fs from 'fs'
import { safeLoad } from 'js-yaml'
import BN = require('bn.js')
import { TWO_POW256 } from 'ethereumjs-util'

// Cache size in bytes
export const CACHE_SIZE = 256 * 1024

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
  readableCache: Buffer
  writableCache: Buffer
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
      debug_startTimer: () => console.log('start timer'),
      debug_endTimer: () => console.log('end timer'),
      abort: () => { throw ('Wasm aborted') }
    },
    cache: {
      load: (ptr: number, offset: number, len: number) => {
        const c = env.readableCache.slice(offset, offset + len)
        memset(mem, ptr, c)
      },
      save: (ptr: number, offset: number, len: number) => {
        const c = memget(mem, ptr, len)
        env.writableCache.write(c.toString('hex'), offset, len, 'hex')
      }
    },
    bignum: {
      add256: (aOffset: number, bOffset: number, cOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32))
        const b = new BN(memget(mem, bOffset, 32))
        const c = a.add(b).mod(TWO_POW256).toArrayLike(Buffer, 'be', 32)
        memset(mem, cOffset, c)
      },
      mul256: (aOffset: number, bOffset: number, cOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32))
        const b = new BN(memget(mem, bOffset, 32))
        const c = a.mul(b).mod(TWO_POW256).toArrayLike(Buffer, 'be', 32)
        memset(mem, cOffset, c)
      },
      sub256: (aOffset: number, bOffset: number, cOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32))
        const b = new BN(memget(mem, bOffset, 32))
        const c = a.sub(b).toTwos(256).toArrayLike(Buffer, 'be', 32)
        memset(mem, cOffset, c)
      },
      div256: (aOffset: number, bOffset: number, cOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32))
        const b = new BN(memget(mem, bOffset, 32))
        if (b.isZero()) throw new Error('division by zero')
        const c = a.div(b).toArrayLike(Buffer, 'be', 32)
        memset(mem, cOffset, c)
      },
      mulMod: (aOffset: number, bOffset: number, cOffset: number, rOffset: number) => {
        const a = new BN(memget(mem, aOffset, 32))
        const b = new BN(memget(mem, bOffset, 32))
        const c = new BN(memget(mem, cOffset, 32))
        if (c.isZero()) throw new Error('modulus is zero')
        const r = a.mul(b).mod(c).toArrayLike(Buffer, 'be', 32)
        memset(mem, rOffset, r)
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
