import * as assert from 'assert'
import * as fs from 'fs'
import { safeLoad } from 'js-yaml'

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
