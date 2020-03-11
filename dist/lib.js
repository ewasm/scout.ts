"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var js_yaml_1 = require("js-yaml");
var BN = require("bn.js");
var ethereumjs_util_1 = require("ethereumjs-util");
var mem;
var res;
exports.setMemory = function (m) {
    mem = m;
};
exports.getRes = function () { return res; };
var memset = function (mem, offset, data) {
    var asBytes = new Uint8Array(mem.buffer, offset, data.length);
    asBytes.set(data);
};
var memget = function (mem, offset, length) {
    return Buffer.from(new Uint8Array(mem.buffer, offset, length));
};
exports.getImports = function (env) {
    return {
        env: {
            eth2_loadPreStateRoot: function (ptr) {
                memset(mem, ptr, env.preStateRoot);
            },
            eth2_blockDataSize: function () {
                return env.blockData.byteLength;
            },
            eth2_blockDataCopy: function (ptr, offset, length) {
                memset(mem, ptr, env.blockData.slice(offset, offset + length));
            },
            eth2_savePostStateRoot: function (ptr) {
                res = memget(mem, ptr, 32);
            },
            abort: function () { throw ('Wasm aborted'); },
            debug_print32: function (value) { return console.log('debug_print32', value); },
            debug_printMem: function (ptr, length) { return console.log('debug_printMem: ', ptr, length, memget(mem, ptr, length)); },
            debug_printMemHex: function (ptr, length) {
                console.log('debug_printMemHex: ', ptr, length, memget(mem, ptr, length).toString('hex'));
            },
            bignum_add256: function (aOffset, bOffset, cOffset) {
                var a = new BN(memget(mem, aOffset, 32));
                var b = new BN(memget(mem, bOffset, 32));
                var c = a.add(b).mod(ethereumjs_util_1.TWO_POW256).toArrayLike(Buffer, 'be', 32);
                memset(mem, cOffset, c);
            },
            bignum_mul256: function (aOffset, bOffset, cOffset) {
                var a = new BN(memget(mem, aOffset, 32));
                var b = new BN(memget(mem, bOffset, 32));
                var c = a.mul(b).mod(ethereumjs_util_1.TWO_POW256).toArrayLike(Buffer, 'be', 32);
                memset(mem, cOffset, c);
            },
            bignum_sub256: function (aOffset, bOffset, cOffset) {
                var a = new BN(memget(mem, aOffset, 32));
                var b = new BN(memget(mem, bOffset, 32));
                var c = a.sub(b).toTwos(256).toArrayLike(Buffer, 'be', 32);
                memset(mem, cOffset, c);
            },
            bignum_div256: function (aOffset, bOffset, cOffset) {
                var a = new BN(memget(mem, aOffset, 32));
                var b = new BN(memget(mem, bOffset, 32));
                if (b.isZero())
                    throw new Error('division by zero');
                var c = a.div(b).toArrayLike(Buffer, 'be', 32);
                memset(mem, cOffset, c);
            },
            bignum_mulMod: function (aOffset, bOffset, cOffset, rOffset) {
                var a = new BN(memget(mem, aOffset, 32));
                var b = new BN(memget(mem, bOffset, 32));
                var c = new BN(memget(mem, cOffset, 32));
                if (c.isZero())
                    throw new Error('modulus is zero');
                var r = a.mul(b).mod(c).toArrayLike(Buffer, 'be', 32);
                memset(mem, rOffset, r);
            }
        }
    };
};
function parseYaml(file) {
    var testCase = js_yaml_1.safeLoad(file);
    var scripts = testCase.beacon_state.execution_scripts;
    var shardBlocks = testCase.shard_blocks;
    var testCases = [];
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        var preStateRoot = Buffer.from(testCase.shard_pre_state.exec_env_states[i], 'hex');
        var postStateRoot = Buffer.from(testCase.shard_post_state.exec_env_states[i], 'hex');
        assert(preStateRoot.length === 32);
        assert(postStateRoot.length === 32);
        var blocks = [];
        for (var _i = 0, shardBlocks_1 = shardBlocks; _i < shardBlocks_1.length; _i++) {
            var b = shardBlocks_1[_i];
            if (parseInt(b.env, 10) === i) {
                blocks.push(Buffer.from(b.data, 'hex'));
            }
        }
        testCases.push({
            script: script,
            preStateRoot: preStateRoot,
            postStateRoot: postStateRoot,
            blocks: blocks
        });
    }
    return testCases;
}
exports.parseYaml = parseYaml;
//# sourceMappingURL=lib.js.map