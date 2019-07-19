const { safeLoad } = require('js-yaml')
const { TestCase, parseYaml, getImports, setMemory, getRes } = require('../dist/lib')

async function main() {
  let yamlPath = 'test.yaml'
  const yamlFile = await fetch(yamlPath)
  const testCases = parseYaml(await yamlFile.text())

  for (const testCase of testCases) {
    const wasmResponse = await fetch(testCase.script)
    const wasmBuffer = await wasmResponse.arrayBuffer()
    let preStateRoot = testCase.preStateRoot
    for (const block of testCase.blocks) {
      const compiled = await WebAssembly.instantiate(wasmBuffer, getImports({ preStateRoot, blockData: block }))
      const instance = compiled.instance
      setMemory(instance.exports.memory)
      instance.exports.main()
      preStateRoot = getRes()
    }
    if (!testCase.postStateRoot.equals(getRes())) {
      console.error('Assertion failed, post state root doesn\'t match')
    }
    console.log(`expected ${testCase.postStateRoot.toString('hex')}, received ${getRes().toString('hex')}`)
  }
}

main().then().catch((e) => { throw (e) })
