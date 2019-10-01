export declare function eth2_loadPreStateRoot(offset: u32): void;
export declare function eth2_blockDataSize(): u32;
export declare function eth2_blockDataCopy(outputOffset: u32, offset: u32, length: u32): void;
export declare function eth2_savePostStateRoot(offset: u32): void;
export declare function eth2_pushNewDeposit(offset: u32, length: u32): void;

export declare function debug_print32(value: u32): void;
export declare function debug_printMem(ptr: u32, length: u32): void;
export declare function debug_printMemHex(ptr: u32, length: u32): void;

export declare function bignum_add256(aOffset: u32, bOffset: u32, cOffset: u32): void;
export declare function bignum_mul256(aOffset: u32, bOffset: u32, cOffset: u32): void;
export declare function bignum_sub256(aOffset: u32, bOffset: u32, cOffset: u32): void;
export declare function bignum_div256(aOffset: u32, bOffset: u32, cOffset: u32): void;
export declare function bignum_mulMod(aOffset: u32, bOffset: u32, cOffset: u32, rOffset: u32): void;
