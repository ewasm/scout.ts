import * as env from '../env'

/**
 * Examples for linking a library
 */
@external("env", "incr")
export declare function incr(a: u32): u32

@external("env", "add")
export declare function add(a: u32, b: u32): u32

/*
 * Increments preStateRoot by one
 */
export function main(): void {
  var preStateRootPtr: u32 = __heap_base
  env.eth2_loadPreStateRoot(preStateRootPtr)

  var postStateRootPtr: u32 = __heap_base + 32

  var numPtr: u32 = __heap_base + 64
  // Silly example of how you can use lib
  store<u8>(numPtr, add(0, 1), 31)

  env.bignum_add256(preStateRootPtr, numPtr, postStateRootPtr)

  env.eth2_savePostStateRoot(postStateRootPtr)
}
