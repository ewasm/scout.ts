#!/usr/bin/env node

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
    let preStateRoot = testCase.preStateRoot
    let start = process.hrtime()
    let t_end_start, t_begin_exec, t_end_exec
    const wasmFile = fs.readFileSync(testCase.script)
    const wasmModule = new WebAssembly.Module(wasmFile)
    for (const block of testCase.blocks) {
      const instance = new WebAssembly.Instance(wasmModule, getImports({ preStateRoot, blockData: block }))
      setMemory(instance.exports.memory)
      t_end_start = process.hrtime(start)
      t_begin_exec = process.hrtime()
      instance.exports.main()
      t_end_exec = process.hrtime(t_begin_exec)
      console.log('benchmark startup took %d seconds and %d nanoseconds (%dms)', t_end_start[0], t_end_start[1], t_end_start[1] / 1000000)
      console.log('benchmark execution took %d seconds and %d nanoseconds (%dms)', t_end_exec[0], t_end_exec[1], t_end_exec[1] / 1000000)
    }
    assert(testCase.postStateRoot.equals(getRes()), `expected ${testCase.postStateRoot.toString('hex')}, received ${getRes().toString('hex')}`)
  }
}

main()
