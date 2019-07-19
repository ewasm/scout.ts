import * as assert from 'assert'
import * as fs from 'fs'
import { safeLoad } from 'js-yaml'


let mem: WebAssembly.Memory
let res: Buffer

const memset = (mem: WebAssembly.Memory, offset: number, data: Buffer) => {
  const asBytes = new Uint8Array(mem.buffer, offset, data.length)
  asBytes.set(data)
}

const memget = (mem: WebAssembly.Memory, offset: number, length: number) => {
  return Buffer.from(new Uint8Array(mem.buffer, offset, length))
}

interface ShardBlock {
  env: number
  blockData: Buffer
}

interface TestCase {
  script: string
  preStateRoot: Buffer
  blocks: Buffer[]
  postStateRoot: Buffer
}

interface EnvData {
  preStateRoot: Buffer
  blockData: Buffer
}

const getImports = (env: EnvData) => {
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

function readYaml (path = 'bazaar.yaml'): TestCase[] {
  const testCaseFile = fs.readFileSync(path, { encoding: 'utf8' })
  const testCase = safeLoad(testCaseFile)
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

async function main() {
  const testCases = readYaml()

  for (const testCase of testCases) {
    const wasmFile = fs.readFileSync(testCase.script)
    const wasmModule = new WebAssembly.Module(wasmFile)
    let preStateRoot = testCase.preStateRoot
    for (const block of testCase.blocks) {
      const instance = new WebAssembly.Instance(wasmModule, getImports({ preStateRoot, blockData: block }))
      mem = instance.exports.memory
      let t = process.hrtime()
      instance.exports.main()
      t = process.hrtime(t)
      console.log('benchmark took %d seconds and %d nanoseconds (%d ms)', t[0], t[1], t[1] / 1000000)
      preStateRoot = res
    }
    console.log(`expected ${testCase.postStateRoot.toString('hex')}, received ${res.toString('hex')}`)
    assert(testCase.postStateRoot.equals(res))
  }
}

main().then().catch((e) => { throw(e) })
