/// <reference types="webassembly-js-api" />
/// <reference types="node" />
export declare const setMemory: (m: WebAssembly.Memory) => void;
export declare const getRes: () => Buffer;
export interface ShardBlock {
    env: number;
    blockData: Buffer;
}
export interface TestCase {
    script: string;
    preStateRoot: Buffer;
    blocks: Buffer[];
    postStateRoot: Buffer;
}
export interface EnvData {
    preStateRoot: Buffer;
    blockData: Buffer;
}
export declare const getImports: (env: EnvData) => {
    env: {
        eth2_loadPreStateRoot: (ptr: number) => void;
        eth2_blockDataSize: () => number;
        eth2_blockDataCopy: (ptr: number, offset: number, length: number) => void;
        eth2_savePostStateRoot: (ptr: number) => void;
        abort: () => never;
        debug_print32: (value: number) => void;
        debug_printMem: (ptr: number, length: number) => void;
        debug_printMemHex: (ptr: number, length: number) => void;
        bignum_add256: (aOffset: number, bOffset: number, cOffset: number) => void;
        bignum_mul256: (aOffset: number, bOffset: number, cOffset: number) => void;
        bignum_sub256: (aOffset: number, bOffset: number, cOffset: number) => void;
        bignum_div256: (aOffset: number, bOffset: number, cOffset: number) => void;
        bignum_mulMod: (aOffset: number, bOffset: number, cOffset: number, rOffset: number) => void;
    };
};
export declare function parseYaml(file: string): TestCase[];
