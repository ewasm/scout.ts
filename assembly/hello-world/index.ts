import * as env from '../env'
import * as bignum from '../bignum'

/*
 * Increments preStateRoot by one
 */
export function main(): void {
  var preStateRootPtr: u32 = __heap_base
  env.eth2_loadPreStateRoot(preStateRootPtr)

  var postStateRootPtr: u32 = __heap_base + 32

  var numPtr: u32 = __heap_base + 64
  store<u8>(numPtr, 1, 31)

  bignum.add256(preStateRootPtr, numPtr, postStateRootPtr)

  env.eth2_savePostStateRoot(postStateRootPtr)
}
