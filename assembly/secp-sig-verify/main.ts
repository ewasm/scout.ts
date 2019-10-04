import { secp_g1m_toMontgomery, secp_g1m_timesScalar, secp_g1m_add, secp_fr_inverse, secp_g1m_affine, secp_g1m_fromMontgomery, secp_frm_neg } from "./websnark_secp256k1";
import { keccakMain } from "./keccak";
//import { hashBranchNode, RLPBranchNode, RLPData, decode, encode } from "./rlp";

//import { decode } from "./rlp";


@external("env", "debug_printMemHex")
export declare function debug_mem(pos: i32, len: i32): void;


@external("env", "eth2_blockDataSize")
export declare function eth2_blockDataSize(): i32;

@external("env", "eth2_blockDataCopy")
export declare function eth2_blockDataCopy(outputOffset: i32, srcOffset: i32, length: i32): void;

@external("env", "eth2_loadPreStateRoot")
export declare function eth2_loadPreStateRoot(offset: i32): void;

@external("env", "eth2_savePostStateRoot")
export declare function eth2_savePostStateRoot(offset: i32): void;


/****
## python reference: https://repl.it/repls/UsableBumpyPyramid

## Test vector of a signed tx (generated from smpt.js)

from account: 0x29120ac3527858f5637e698cdbf0548c6b59ec77
account privkey: a3e4f343e986d9979dc6d869d8c5a224836e313f33644b9c5342c1a9627fa066

tx destination account: 0x895b62b6dc6115fe23c931f9765041a078e12418
tx value: 0xff
tx nonxe: 0x00

txRlp (rlp_encode([tx_dest, tx_val, tx_nonce])): d894895b62b6dc6115fe23c931f9765041a078e1241881ff80
txHash (keccak256(txRlp)): 8725a400582dd3ba7da7722981222e18df4d2af8937c8be4ee4354ac1977a23c
txSig (ecsign(txHash, privkey)):
  { r: '15ed312c5863d1e3ff253e8c9077c460233f62bc73d69c5364e0f2de0f7cd064',
    s: '173d84e53ad0bb8bbbd2f48703c59697ca33bf9077524d9df154bc944f8f6516',
    v: '1c' }


the data needed to verify the sig is encoded as: concat([txRlp, txSig.r, txSig.s])
d894895b62b6dc6115fe23c931f9765041a078e1241881ff80  15ed312c5863d1e3ff253e8c9077c460233f62bc73d69c5364e0f2de0f7cd064  173d84e53ad0bb8bbbd2f48703c59697ca33bf9077524d9df154bc944f8f6516
*/


export function main(): i32 {

  let input_data_len = eth2_blockDataSize();
  let input_data_buff = new ArrayBuffer(input_data_len);
  eth2_blockDataCopy(input_data_buff as usize, 0, input_data_len);

  let sig_recovered_address = new ArrayBuffer(32);

  for (let i=0; i<72; i++) { // benchmarking loop
    sig_recovered_address = txSigECRecover(input_data_buff.slice());
  }

  eth2_savePostStateRoot(sig_recovered_address as usize);

  return 1;
}


function txSigECRecover(tx_sig_data: ArrayBuffer): ArrayBuffer {

  // tx rlp is 25 bytes
  // TODO: use rlp_decode to handle varying tx's
  let tx_rlp = Uint8Array.wrap(tx_sig_data, 0, 25);
  //debug_mem((tx_rlp.buffer as usize) + tx_rlp.byteOffset, 25);


  // r = 15ed312c5863d1e3ff253e8c9077c460233f62bc73d69c5364e0f2de0f7cd064
  let sig_r = Uint8Array.wrap(tx_sig_data, 25, 32);
  let sig_r_le = sig_r.reverse();

  // s = 173d84e53ad0bb8bbbd2f48703c59697ca33bf9077524d9df154bc944f8f6516
  let sig_s = Uint8Array.wrap(tx_sig_data, 57, 32); // starts at byte 57 (25 for tx_rlp + 32 for sig_r)
  let sig_s_le = sig_s.reverse();


  // r2.x = 15ed312c5863d1e3ff253e8c9077c460233f62bc73d69c5364e0f2de0f7cd064
  // r2.y = 9766674f6101fd5d4f24f8b1b2611cd1f21f5121be89bc84015a231ce63cb31
  // load into memory as little endian
  /*
  let r2_coords_x = Array.create<u8>(32);
  let r2_coords_y = Array.create<u8>(32);
  r2_coords_x = [100, 208, 124, 15, 222, 242, 224, 100, 83, 156, 214, 115, 188, 98, 63, 35, 96, 196, 119, 144, 140, 62, 37, 255, 227, 209, 99, 88, 44, 49, 237, 21];
  r2_coords_y = [49, 203, 99, 206, 49, 162, 21, 64, 200, 155, 232, 27, 18, 245, 33, 31, 205, 17, 38, 27, 139, 79, 242, 212, 213, 31, 16, 246, 116, 102, 118, 9];
  */

  let r2_coords = Array.create<u8>(96);
  // [x, y, 1]

  // r2.x is txSig.r
  // r2.y is fixed (derived form the secp curve)
  // TODO: do we need to check that the R2 points is valid?
  // initialize r2 with the x coord as zeros. txSig.r will be copied in memory.copy()
  r2_coords = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 203, 99, 206, 49, 162, 21, 64, 200, 155, 232, 27, 18, 245, 33, 31, 205, 17, 38, 27, 139, 79, 242, 212, 213, 31, 16, 246, 116, 102, 118, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let r2_x = Uint8Array.wrap(r2_coords.buffer, 0, 32);
  memory.copy((r2_x.buffer as usize) + r2_x.byteOffset, (sig_r_le.buffer as usize) + sig_r_le.byteOffset, 32);

  let r2_mont_form = new ArrayBuffer(96);
  secp_g1m_toMontgomery(r2_coords.buffer as usize, r2_mont_form as usize);

  //debug_mem(r2_coords.buffer as usize, 96);
  // 64d07c0fdef2e064539cd673bc623f2360c477908c3e25ffe3d163582c31ed1531cb63ce31a21540c89be81b12f5211fcd11261b8b4ff2d4d51f10f6746676090100000000000000000000000000000000000000000000000000000000000000

  //debug_mem(r2_mont_form as usize, 96);
  // 243791c9b0e3e823228deb7a896dbef8a2d5537cd37a9b4dad451954217c9c06ea03b8c702326a6a6e29d0c2e4e580ece5e46bbbafa3e7cb9cce7be83424ed12e14000001100000000000000000000000000000000000000730b0000133d0000


  let s_times_r2_result = new ArrayBuffer(96);
  secp_g1m_timesScalar(r2_mont_form as usize, (sig_s_le.buffer as usize) + sig_s_le.byteOffset, 32, s_times_r2_result as usize);
  //debug_mem(s_times_r2_result as usize, 96);
  // s_times_r2_result should be (LE) 2d9da8bd8d3918fb58a248bbb47d89df66940cd163d7e6390dfcdb3c745474659f12b894fb253ae447bebff6f2e94c40865ae7635f7410c2f7a755d35522d9073901ad0eb4596627789f3215374ccba59e1a4d033681f1c1580c060bc4eae9fc

  //let s_times_r2_result_affine_normal = new ArrayBuffer(96);
  //secp_g1m_affine(s_times_r2_result as usize, s_times_r2_result_affine_normal as usize);
  //secp_g1m_fromMontgomery(s_times_r2_result_affine_normal as usize, s_times_r2_result_affine_normal as usize);
  //debug_mem(0, 8);
  //debug_mem(s_times_r2_result_affine_normal as usize, 96);
  // with host funcs: c56e650848dcba22e9c5eaaf4af310455b6f521cb90b556dbab388b9c0190205cc9c5d22d315c4841a54a1529a759ed5a6569efbd62d8f7184d2eb0ab8574c420100000000000000000000000000000000000000000000000000000000000000
  // without: 058229da280d92f597bc88e740e54b513be59539ee6e88ab325e641d7dfc75d9c6b281953acfc58df03f1bc04be2a657f4beefa251fe725d8216f8fdcb5f50e90100000000000000000000000000000000000000000000000000000000000000


  //let s_times_r2_result_norm_form = new ArrayBuffer(96);
  //secp_g1m_fromMontgomery(s_times_r2_result as usize, s_times_r2_result_norm_form as usize);
  //debug_mem(s_times_r2_result_norm_form as usize, 96);
  // using host funcs: 4d8ac3a0cb79166e99af54ea0d49beefe6ba75203191972735a0113280db8d3655983521d58ba3228ed421e362dc42fe09d8ac32546baaf5daa9b330f1e0db90ac0f1705f7a0558123c7d524d750f16887b5f799f30ad0aeaa96475b2df7838a
  // no host funcs:   4d8ac3a0cb79166e99af54ea0d49beefe6ba75203191972735a0113280db8d3655983521d58ba3228ed421e362dc42fe09d8ac32546baaf5daa9b330f1e0db90ac0f1705f7a0558123c7d524d750f16887b5f799f30ad0aeaa96475b2df7838a


  // secp256k1 base point G
  // g = (0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798,
  // 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8)

  // TODO: move to global
  let g1_gen = Array.create<u8>(96);
  // [x, y, 1]
  g1_gen = [152, 23, 248, 22, 91, 129, 242, 89, 217, 40, 206, 45, 219, 252, 155, 2, 7, 11, 135, 206, 149, 98, 160, 85, 172, 187, 220, 249, 126, 102, 190, 121, 184, 212, 16, 251, 143, 208, 71, 156, 25, 84, 133, 166, 72, 180, 23, 253, 168, 8, 17, 14, 252, 251, 164, 93, 101, 196, 163, 38, 119, 218, 58, 72, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  secp_g1m_toMontgomery(g1_gen.buffer as usize, g1_gen.buffer as usize);
  //debug_mem(g1_gen.buffer as usize, 96);

  //debug_mem(0, 16);

  //let g1_gen_norm_form = new ArrayBuffer(96);
  //secp_g1m_fromMontgomery(g1_gen.buffer as usize, g1_gen_norm_form as usize);
  //debug_mem(g1_gen_norm_form as usize, 96);
  // no host funcs: 9817f8165b81f259d928ce2ddbfc9b02070b87ce9562a055acbbdcf97e66be79b8d410fb8fd0479c195485a648b417fda808110efcfba45d65c4a32677da3a480100000000000000000000000000000000000000000000000000000000000000
  // us host funcs: 9817f8165b81f259d928ce2ddbfc9b02070b87ce9562a055acbbdcf97e66be79b8d410fb8fd0479c195485a648b417fda808110efcfba45d65c4a32677da3a480100000000000000000000000000000000000000000000000000000000000000


  let tx_rlp_hash = new ArrayBuffer(32);
  // TODO: ensure that the keccak memory offset (llvm shadow stack) doesn't collide with websnark or assemblyscript
  keccakMain((tx_rlp.buffer as usize) + tx_rlp.byteOffset, 25, tx_rlp_hash as usize);
  //debug_mem(tx_rlp_hash as usize, 32);

  let tx_msg_hash = Uint8Array.wrap(tx_rlp_hash, 0, 32);
  // tx_msg_hash should be 8725a400582dd3ba7da7722981222e18df4d2af8937c8be4ee4354ac1977a23c
  let tx_msg_hash_le = tx_msg_hash.reverse();
  //debug_mem(tx_msg_hash_le.buffer as usize, 28);

  let neg_hash_msg = new ArrayBuffer(32);
  secp_frm_neg(tx_rlp_hash as usize, neg_hash_msg as usize);
  //debug_mem(neg_hash_msg as usize, 32);
  // (LE) 059fbeb6e0098fd15614cc1beeb161dbe5d1dd7ed68d5882452cd2a7ff5bda78
  // neg_hash_msg should be 78da5bffa7d22c4582588dd67eddd1e5db61b1ee1bcc1456d18f09e0b6be9f05

  let p_e_times_gen = new ArrayBuffer(96);
  secp_g1m_timesScalar(g1_gen.buffer as usize, neg_hash_msg as usize, 32, p_e_times_gen as usize);
  //debug_mem(p_e_times_gen as usize, 96);
  // (LE) 7789077fde1ddc9d1fc3215c7ae969a959b630587c5cfc8a279d38ed4938bd17cc59c8bcf8842dcd2e61c2d0917e46033f500ebec3e885467eca1470e61b715f08ee2d38062f346dde7f8b1bde821f2dba386501bb2ab7e139baf1a823775ffd

  let muls_added = new ArrayBuffer(96);
  secp_g1m_add(s_times_r2_result as usize, p_e_times_gen as usize, muls_added as usize);
  //debug_mem(muls_added as usize, 96);
  // (LE) 2f83406281fea1ccc4cb1f9e3653e0dfbecdf146f9eeb5ec1b21b788e3560573aec4b63c6c23caf77a1ceb1172dded035524d4e084778b7e3573f64e5acf090fa910fedf7e905e436ee8f592ca0e702ba29868de6c1d07d4910b248150b1d121

  let r_inverse = new ArrayBuffer(32);
  secp_fr_inverse((sig_r_le.buffer as usize) + sig_r_le.byteOffset, r_inverse as usize);
  //debug_mem(r_inverse as usize, 32);
  // (LE) f4c3aa2d9d29b5266685177d5063f26b2a757588f526f737ec39e3ae63ca606d

  let q2 = new ArrayBuffer(96);
  secp_g1m_timesScalar(muls_added as usize, r_inverse as usize, 32, q2 as usize);
  //debug_mem(q2 as usize, 96);

  let q2_affine = new ArrayBuffer(96);
  secp_g1m_affine(q2 as usize, q2_affine as usize);
  secp_g1m_fromMontgomery(q2_affine as usize, q2_affine as usize);
  //debug_mem(q2_affine as usize, 96);

  // convert q2 affine to big endian before hashing
  let q2_bytes_x = q2_affine.slice(0, 32);
  let q2_bytes_x_u8array = Uint8Array.wrap(q2_bytes_x, 0, 32);
  let q2_bytes_x_rev = q2_bytes_x_u8array.reverse();

  let q2_bytes_y = q2_affine.slice(32, 64);
  let q2_bytes_y_u8array = Uint8Array.wrap(q2_bytes_y, 0, 32);
  let q2_bytes_y_rev = q2_bytes_y_u8array.reverse();

  let q2_bytes = new ArrayBuffer(64);
  memory.copy((q2_bytes as usize), q2_bytes_x_rev.buffer as usize, 32);
  memory.copy((q2_bytes as usize) + 32, q2_bytes_y_rev.buffer as usize, 32);
  // TODO: do we need to check that q2 has the right order? (assert(g1_gen.order() * q2 == INFINITY))
  //debug_mem(q2_bytes as usize, 64);


  let q2HashOutput = new ArrayBuffer(32);
  // TODO: ensure that the keccak memory offset (llvm shadow stack) doesn't collide with websnark or assemblyscript
  keccakMain(q2_bytes as usize, 64, q2HashOutput as usize);
  // hash is 0f586183a7dfc59955f0abf829120ac3527858f5637e698cdbf0548c6b59ec77

  let sig_recovered_address = Uint8Array.wrap(q2HashOutput, 0, 32);
  sig_recovered_address.fill(0, 0, 12); // zero out first 12 bytes. remaining 20 bytes is the recovered address
  //debug_mem(sig_recovered_address.buffer as usize, 32);
  // recovered address is 29120ac3527858f5637e698cdbf0548c6b59ec77

  return sig_recovered_address.buffer;
}



