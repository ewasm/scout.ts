import * as assert from 'assert'
import * as fs from 'fs'
import { safeLoad } from 'js-yaml'
import { TestCase, parseYaml, getImports, setMemory, getRes } from './lib'

function main() {
  let yamlPath
  if (process.argv.length === 3) {
    yamlPath = process.argv[2]
  } else if (process.argv.length === 2) {
    yamlPath = 'test.yaml'
  } else {
    throw new Error('invalid args')
  }
  const yamlFile = fs.readFileSync(yamlPath, { encoding: 'utf8' })
  const testCases = parseYaml(yamlFile)

  for (const testCase of testCases) {
    const wasmFile = fs.readFileSync(testCase.script)
    const wasmModule = new WebAssembly.Module(wasmFile)
    let preStateRoot = testCase.preStateRoot
    for (const block of testCase.blocks) {
      const instance = new WebAssembly.Instance(wasmModule, getImports({ preStateRoot, blockData: block }))
      setMemory(instance.exports.memory)
      let t = process.hrtime()
      instance.exports.main()
      t = process.hrtime(t)
      console.log('benchmark took %d seconds and %d nanoseconds (%d ms)', t[0], t[1], t[1] / 1000000)
      preStateRoot = getRes()
    }
    assert(testCase.postStateRoot.equals(getRes()), `expected ${testCase.postStateRoot.toString('hex')}, received ${getRes().toString('hex')}`)
  }
}

main()
