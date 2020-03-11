#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var fs = require("fs");
var lib_1 = require("./lib");
function main() {
    var yamlPath;
    if (process.argv.length === 3) {
        yamlPath = process.argv[2];
    }
    else if (process.argv.length === 2) {
        yamlPath = 'test.yaml';
    }
    else {
        throw new Error('invalid args');
    }
    var yamlFile = fs.readFileSync(yamlPath, { encoding: 'utf8' });
    var testCases = lib_1.parseYaml(yamlFile);
    for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
        var testCase = testCases_1[_i];
        var preStateRoot = testCase.preStateRoot;
        var start = process.hrtime();
        var t_end_start = void 0, t_begin_exec = void 0, t_end_exec = void 0;
        var wasmFile = fs.readFileSync(testCase.script);
        var wasmModule = new WebAssembly.Module(wasmFile);
        for (var _a = 0, _b = testCase.blocks; _a < _b.length; _a++) {
            var block = _b[_a];
            var instance = new WebAssembly.Instance(wasmModule, lib_1.getImports({ preStateRoot: preStateRoot, blockData: block }));
            lib_1.setMemory(instance.exports.memory);
            t_end_start = process.hrtime(start);
            t_begin_exec = process.hrtime();
            instance.exports.main();
            t_end_exec = process.hrtime(t_begin_exec);
            console.log('benchmark startup took %d seconds and %d nanoseconds (%dms)', t_end_start[0], t_end_start[1], t_end_start[1] / 1000000);
            console.log('benchmark execution took %d seconds and %d nanoseconds (%dms)', t_end_exec[0], t_end_exec[1], t_end_exec[1] / 1000000);
        }
        assert(testCase.postStateRoot.equals(lib_1.getRes()), "expected " + testCase.postStateRoot.toString('hex') + ", received " + lib_1.getRes().toString('hex'));
    }
}
main();
//# sourceMappingURL=cli.js.map