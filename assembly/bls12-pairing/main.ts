import { bls12_g1m_toMontgomery, bls12_g2m_toMontgomery, bls12_g2m_timesScalar, bls12_g2m_affine, bls12_g1m_fromMontgomery, bls12_g1m_timesScalar, bls12_g1m_affine, bls12_g1m_neg, bls12_ftm_one, bls12_pairingEq2 } from "./websnark_bls12";

//@external("env", "debug_printMemHex")
//export declare function debug_mem(pos: i32, len: i32): void;

//@external("env", "debug_print32")
//export declare function debug_print32(pos: i32): void;

@external("env", "eth2_blockDataSize")
export declare function eth2_blockDataSize(): i32;

@external("env", "eth2_blockDataCopy")
export declare function eth2_blockDataCopy(outputOffset: i32, srcOffset: i32, length: i32): void;

@external("env", "eth2_loadPreStateRoot")
export declare function eth2_loadPreStateRoot(offset: i32): void;

@external("env", "eth2_savePostStateRoot")
export declare function eth2_savePostStateRoot(offset: i32): void;


export function main(): i32 {

  let input_data_len = eth2_blockDataSize();
  let input_data_buff = new ArrayBuffer(input_data_len);
  eth2_blockDataCopy(input_data_buff as usize, 0, input_data_len);

  const SIZE_F = 48;



  //bls12.instance.exports.g1m_timesScalar(p1, s_reduced, n8, g1_mul_result);

  // 0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb
  //let g1_x = Uint8Array.wrap(input_data_buff, 0, 48);

  // 0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1
  //let g1_y = Uint8Array.wrap(input_data_buff, 48, 96);

  // 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
  // 0x010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

  // G1 point is 144 bytes
  let g1_gen = Uint8Array.wrap(input_data_buff, 0, 144);
  
  bls12_g1m_toMontgomery((g1_gen.buffer as usize) + g1_gen.byteOffset, (g1_gen.buffer as usize) + g1_gen.byteOffset);

  /*  ** test toMontgomery */
  //eth2_savePostStateRoot((g1_gen.buffer as usize) + g1_gen.byteOffset);
  // should return 160c53fd9087b35cf5ff769967fc1778c1a13b14c7954f1547e7d0f3cd6aaef040f4db21cc6eceed75fb0b9e417701127122e70cd593acba8efd18791a63228cce250757135f59dd945140502958ac51c05900ad3f8c1c0e6aa20850fc3ebc0bfdff02000000097602000cc40b00f4ebba58c7535798485f455752705358ce776dec56a2971a075c93e480fac35ef615



  /*****  pairing test **/
  // G2 point is 288 bytes
  let g2_gen = Uint8Array.wrap(input_data_buff, 144, 288);
  bls12_g2m_toMontgomery((g2_gen.buffer as usize) + g2_gen.byteOffset, (g2_gen.buffer as usize) + g2_gen.byteOffset);

  let scalar_37 = Array.create<u8>(8);
  //scalar_arr = [42, 0, 0, 0, 0, 0, 0, 0];
  scalar_37 = [37, 0, 0, 0, 0, 0, 0, 0];

  let scalar_27 = Array.create<u8>(8);
  scalar_27 = [27, 0, 0, 0, 0, 0, 0, 0];

  let scalar_999 = Array.create<u8>(8);
  // 0x03e7
  scalar_999 = [231, 3, 0, 0, 0, 0, 0, 0];



  let g1_times_37 = new ArrayBuffer(SIZE_F*3);
  let g1_times_999 = new ArrayBuffer(SIZE_F*3);

  bls12_g1m_timesScalar((g1_gen.buffer as usize) + g1_gen.byteOffset, (scalar_37.buffer as usize), 2, g1_times_37 as usize);
  bls12_g1m_affine(g1_times_37 as usize, g1_times_37 as usize);

  bls12_g1m_timesScalar((g1_gen.buffer as usize) + g1_gen.byteOffset, (scalar_999.buffer as usize), 2, g1_times_999 as usize);
  bls12_g1m_affine(g1_times_999 as usize, g1_times_999 as usize);

  bls12_g1m_neg(g1_times_999 as usize, g1_times_999 as usize);

  let g2_times_27 = new ArrayBuffer(SIZE_F*6);

  bls12_g2m_timesScalar((g2_gen.buffer as usize) + g2_gen.byteOffset, (scalar_27.buffer as usize), 2, g2_times_27 as usize);
  bls12_g2m_affine(g2_times_27 as usize, g2_times_27 as usize);


  let pFq12One = new ArrayBuffer(SIZE_F*12);
  bls12_ftm_one(pFq12One as usize);
  //eth2_savePostStateRoot(pFq12One as usize + 144);


  let pairingEq2_result = bls12_pairingEq2(g1_times_37 as usize, g2_times_27 as usize, g1_times_999 as usize, (g2_gen.buffer as usize) + g2_gen.byteOffset, pFq12One as usize);

  let return_buf = new Array<u32>(32);
  return_buf[0] = pairingEq2_result;
  eth2_savePostStateRoot(return_buf.buffer as usize);

  /*****/




  /*
  //**** test g1_gen * 42
  let scalar_42 = Array.create<u8>(8);
  scalar_42 = [42, 0, 0, 0, 0, 0, 0, 0];

  let pG1_mul_result = new ArrayBuffer(SIZE_F*3);

  bls12_g1m_timesScalar((g1_gen.buffer as usize) + g1_gen.byteOffset, (scalar_42.buffer as usize), 8, pG1_mul_result as usize);

  let pG1_mul_affine = new ArrayBuffer(SIZE_F*3);
  bls12_g1m_affine(pG1_mul_result as usize, pG1_mul_affine as usize);
  bls12_g1m_fromMontgomery(pG1_mul_affine as usize, pG1_mul_affine as usize);

  //eth2_savePostStateRoot((pG1_mul_affine as usize));
  //eth2_savePostStateRoot((pG1_mul_affine as usize) + 16);
  */


  /*
  let proof_a = Uint8Array.wrap(input_data_buff, 0, 96);
  // at offset 96

  let vk_a = Uint8Array.wrap(input_data_buff, 96, 192);
  // at offset 288

  let proof_ap = Uint8Array.wrap(input_data_buff, 288, 96);
  // at offset 384

  let p2 = Uint8Array.wrap(input_data_buff, 384, 192);
  // at offset 576 - end of data


  let pProofA = new ArrayBuffer(SIZE_F*3);
  // bn128.instance.exports.g1m_toMontgomery(pProofA, pProofA)
  bn128_g1m_toMontgomery((proof_a.buffer as usize) + proof_a.byteOffset, pProofA as usize);

  let pVKA = new ArrayBuffer(SIZE_F*6);
  // bn128.instance.exports.g2m_toMontgomery(pVKA, pVKA);
  bn128_g2m_toMontgomery((vk_a.buffer as usize) + vk_a.byteOffset, pVKA as usize);



  let pProof_a_p_neg = new ArrayBuffer(SIZE_F*3);
  bn128_g1m_neg((proof_ap.buffer as usize) + proof_ap.byteOffset, pProof_a_p_neg as usize);
  bn128_g1m_toMontgomery(pProof_a_p_neg as usize, pProof_a_p_neg as usize);

  //bn128.setG1(pProof_a_p, proof_a_p) // same as setG1Affine
  //bn128.instance.exports.g1m_neg(pProof_a_p, pProof_a_p_neg)
  //bn128.instance.exports.g1m_toMontgomery(pProof_a_p_neg, pProof_a_p_neg)


  let pP2 = new ArrayBuffer(SIZE_F*6);
  bn128_g2m_toMontgomery((p2.buffer as usize) + p2.byteOffset, pP2 as usize);


  //let pFq12One = bn128.alloc(SIZE_F * 12);
  //bn128.instance.exports.ftm_one(pFq12One);


  let pFq12One = new ArrayBuffer(SIZE_F*12);
  bn128_ftm_one(pFq12One as usize);

  //const pairingEq2_result = bn128.instance.exports.bn128_pairingEq2(pProofA, pVKA, pProof_a_p_neg, pP2, pFq12One);

  //let pairingEq2_result = new 
  let pairingEq2_result = bn128_pairingEq2(pProofA as usize, pVKA as usize, pProof_a_p_neg as usize, pP2 as usize, pFq12One as usize);

  //let return_buf = Array.create<u32>(2);
  let return_buf = new Array<u32>(2);
  return_buf[0] = pairingEq2_result;

  //secp_g1m_timesScalar(r2_mont_form as usize, (sig_s_le.buffer as usize) + sig_s_le.byteOffset, 32, s_times_r2_result as usize);

  //eth2_savePostStateRoot(pairingEq2_result as usize);
  eth2_savePostStateRoot(return_buf.buffer as usize);
  */

  return 1;
}




