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

interface TestCase {
  script: string
  preStateRoot: Buffer
  blockData: Buffer
  postStateRoot: Buffer
}

const getImports = (testCase: TestCase) => {
  return {
    env: {
      eth2_loadPreStateRoot: (ptr: number) => {
        console.log('eth2_loadPreStateRoot')
        memset(mem, ptr, testCase.preStateRoot)
      },
      eth2_blockDataSize: () => {
        console.log('eth2_blockDataSize', testCase.blockData.length, testCase.blockData.byteLength)
        return testCase.blockData.byteLength
      },
      eth2_blockDataCopy: (ptr: number, offset: number, length: number) => {
        console.log('eth2_blockDataCopy', ptr, offset, length)
        memset(mem, ptr, testCase.blockData.slice(offset, offset + length))
      },
      eth2_savePostStateRoot: (ptr: number) => {
        console.log('eth2_savePostStateRoot')
        res = memget(mem, ptr, 32)
      },
      debug_startTimer: () => console.log('start timer'),
      debug_endTimer: () => console.log('end timer'),
      abort: () => { throw ('Wasm aborted') }
    }
  }
}

function readYaml (path = 'test.yaml'): TestCase {
  const testCaseFile = fs.readFileSync(path, { encoding: 'utf8' })
  const testCase = safeLoad(testCaseFile)
  const preStateRoot = Buffer.from(testCase.shard_pre_state.exec_env_states[0], 'hex')
  const blockData = Buffer.from(testCase.shard_blocks[0].data, 'hex')
  const postStateRoot = Buffer.from(testCase.shard_post_state.exec_env_states[0], 'hex')
  const script = testCase.beacon_state.execution_scripts[0]

  assert(preStateRoot.length === 32)
  assert(postStateRoot.length === 32)

  return {
    script,
    preStateRoot,
    blockData,
    postStateRoot
  }
}

async function main() {
  const testCase = readYaml()

  const wasmFile = fs.readFileSync(testCase.script)
  const wasmModule = new WebAssembly.Module(wasmFile)
  const instance = new WebAssembly.Instance(wasmModule, getImports(testCase))
  console.log(instance)
  mem = instance.exports.memory
  let t = process.hrtime()
  instance.exports.main()
  t = process.hrtime(t)
  console.log('benchmark took %d seconds and %d nanoseconds (%d ms)', t[0], t[1], t[1] / 1000000)
  console.log(`expected ${testCase.postStateRoot.toString('hex')}, received ${res.toString('hex')}`)
  assert(testCase.postStateRoot.equals(res))

}

main().then().catch((e) => { throw(e) })
