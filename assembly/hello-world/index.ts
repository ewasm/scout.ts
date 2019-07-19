import * as env from '../env'

export function main(): void {
  //var preStateRootPtr: u32 = memory.allocate(32)
  var preStateRootPtr: u32 = __heap_base
  env.eth2_loadPreStateRoot(preStateRootPtr)

  //var postStateRootPtr: u32 = memory.allocate(32)
  var postStateRootPtr: u32 = __heap_base + 32
  memory.copy(postStateRootPtr, preStateRootPtr, 32)

  var lastByte: u8 = load<u8>(preStateRootPtr, 31)
  store<u8>(postStateRootPtr, lastByte + 1, 31)

  env.eth2_savePostStateRoot(postStateRootPtr)
}
