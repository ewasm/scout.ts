import * as env from '../env'
import * as bignum from '../bignum'
import * as cache from '../cache'

/*
 * Increments preStateRoot by the cached value of previous block data
 */
export function main(): void {
  var preStateRootPtr: u32 = __heap_base
  env.eth2_loadPreStateRoot(preStateRootPtr)

  var postStateRootPtr: u32 = __heap_base + 32

  var numPtr: u32 = __heap_base + 64
  cache.load(numPtr, 0, 32)

  bignum.add256(preStateRootPtr, numPtr, postStateRootPtr)

  var blockDataPtr: u32 = __heap_base + 96
  env.eth2_blockDataCopy(blockDataPtr, 0, 32)
  cache.save(blockDataPtr, 0, 32)

  env.eth2_savePostStateRoot(postStateRootPtr)
}
