import { bls12_g1m_toMontgomery, bls12_g2m_toMontgomery, bls12_g2m_timesScalar, bls12_g2m_affine, bls12_g1m_fromMontgomery, bls12_g1m_timesScalar, bls12_g1m_affine, bls12_g1m_neg, bls12_ftm_one, bls12_pairingEq2 } from "./websnark_bls12";

//@external("env", "debug_printMemHex")
//export declare function debug_mem(pos: i32, len: i32): void;

//@external("env", "debug_print32")
//export declare function debug_print32(pos: i32): void;

@external("env", "eth2_savePostStateRoot")
export declare function eth2_savePostStateRoot(offset: i32): void;


export function main(): void {

  let input_data_arr = Array.create<u8>(864);
  input_data_arr = [56, 217, 212, 93, 224, 111, 172, 225, 94, 118, 37, 247, 193, 106, 41, 62, 79, 105, 124, 232, 235, 66, 182, 151, 63, 29, 145, 30, 125, 118, 105, 178, 136, 229, 21, 242, 255, 92, 46, 146, 43, 16, 11, 195, 72, 128, 130, 0, 25, 140, 218, 108, 111, 120, 215, 79, 166, 194, 7, 245, 42, 180, 97, 231, 24, 161, 203, 218, 91, 189, 97, 170, 71, 143, 80, 87, 185, 72, 103, 147, 49, 169, 191, 73, 40, 142, 204, 170, 218, 93, 58, 247, 122, 244, 81, 19, 253, 255, 2, 0, 0, 0, 9, 118, 2, 0, 12, 196, 11, 0, 244, 235, 186, 88, 199, 83, 87, 152, 72, 95, 69, 87, 82, 112, 83, 88, 206, 119, 109, 236, 86, 162, 151, 26, 7, 92, 147, 228, 128, 250, 195, 94, 246, 21, 200, 205, 63, 142, 43, 180, 42, 116, 61, 43, 23, 196, 48, 216, 125, 103, 165, 145, 130, 122, 200, 36, 212, 222, 179, 128, 186, 221, 5, 35, 0, 44, 154, 53, 85, 161, 168, 79, 111, 198, 113, 237, 89, 240, 104, 200, 229, 14, 170, 192, 148, 218, 177, 175, 50, 38, 214, 195, 210, 180, 176, 40, 200, 47, 14, 159, 28, 219, 169, 26, 46, 131, 243, 101, 61, 59, 70, 79, 195, 90, 208, 58, 195, 155, 222, 84, 112, 209, 24, 138, 220, 143, 254, 189, 46, 15, 170, 66, 55, 43, 97, 0, 104, 111, 108, 99, 78, 247, 75, 124, 107, 175, 104, 78, 3, 157, 90, 193, 162, 221, 226, 42, 63, 127, 81, 130, 253, 239, 72, 19, 201, 239, 236, 31, 238, 189, 214, 245, 152, 50, 148, 127, 181, 0, 11, 42, 139, 146, 221, 10, 114, 71, 108, 209, 99, 176, 150, 171, 168, 88, 172, 190, 175, 45, 115, 161, 200, 131, 209, 178, 163, 251, 53, 139, 152, 219, 99, 113, 51, 92, 245, 255, 10, 218, 209, 30, 10, 175, 129, 44, 12, 0, 253, 255, 2, 0, 0, 0, 9, 118, 2, 0, 12, 196, 11, 0, 244, 235, 186, 88, 199, 83, 87, 152, 72, 95, 69, 87, 82, 112, 83, 88, 206, 119, 109, 236, 86, 162, 151, 26, 7, 92, 147, 228, 128, 250, 195, 94, 246, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 245, 216, 86, 141, 241, 77, 150, 35, 187, 41, 138, 207, 40, 61, 243, 211, 112, 33, 96, 231, 237, 30, 148, 118, 64, 187, 240, 100, 17, 250, 104, 0, 22, 13, 22, 49, 196, 255, 38, 91, 38, 206, 83, 30, 234, 136, 19, 20, 41, 233, 49, 140, 130, 229, 95, 88, 155, 97, 10, 160, 69, 76, 56, 204, 255, 189, 220, 195, 96, 0, 135, 14, 28, 72, 198, 162, 57, 138, 58, 104, 213, 176, 80, 106, 51, 222, 150, 38, 222, 54, 44, 25, 141, 1, 3, 16, 253, 255, 2, 0, 0, 0, 9, 118, 2, 0, 12, 196, 11, 0, 244, 235, 186, 88, 199, 83, 87, 152, 72, 95, 69, 87, 82, 112, 83, 88, 206, 119, 109, 236, 86, 162, 151, 26, 7, 92, 147, 228, 128, 250, 195, 94, 246, 21, 16, 10, 148, 2, 162, 143, 242, 245, 26, 150, 180, 135, 38, 251, 245, 179, 128, 229, 42, 62, 181, 147, 168, 161, 233, 174, 60, 26, 157, 153, 148, 152, 107, 54, 99, 24, 99, 183, 103, 111, 215, 188, 80, 67, 146, 145, 129, 5, 6, 246, 35, 158, 117, 192, 169, 165, 195, 96, 205, 188, 157, 197, 160, 170, 6, 120, 134, 226, 24, 126, 177, 59, 103, 179, 65, 133, 204, 182, 26, 27, 71, 133, 21, 242, 14, 237, 182, 194, 243, 237, 96, 115, 9, 42, 146, 17, 74, 76, 73, 96, 248, 10, 115, 76, 90, 156, 54, 94, 31, 250, 124, 89, 90, 99, 10, 170, 108, 133, 230, 231, 95, 73, 13, 110, 233, 181, 239, 187, 162, 37, 239, 240, 117, 169, 211, 7, 229, 218, 128, 126, 142, 253, 131, 0, 93, 176, 100, 223, 146, 252, 192, 173, 220, 97, 20, 43, 10, 39, 170, 24, 160, 235, 228, 59, 106, 172, 173, 134, 58, 163, 61, 201, 78, 92, 73, 121, 237, 202, 60, 164, 80, 88, 23, 231, 242, 27, 222, 99, 161, 194, 43, 11, 253, 255, 2, 0, 0, 0, 9, 118, 2, 0, 12, 196, 11, 0, 244, 235, 186, 88, 199, 83, 87, 152, 72, 95, 69, 87, 82, 112, 83, 88, 206, 119, 109, 236, 86, 162, 151, 26, 7, 92, 147, 228, 128, 250, 195, 94, 246, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //input_data_arr = [19, 57, 46, 65, 74, 91, 252, 28, 31, 156, 150, 248, 75, 129, 253, 252, 108, 78, 86, 217, 32, 50, 78, 146, 0, 21, 125, 240, 133, 23, 231, 100, 213, 201, 28, 95, 80, 132, 184, 211, 58, 16, 118, 216, 254, 106, 119, 2, 65, 77, 205, 165, 163, 155, 215, 92, 120, 6, 155, 98, 62, 110, 110, 8, 211, 77, 225, 31, 33, 94, 83, 212, 200, 60, 190, 78, 76, 29, 102, 216, 20, 204, 171, 149, 184, 132, 58, 109, 154, 91, 233, 7, 158, 38, 97, 5, 182, 85, 203, 204, 53, 143, 11, 170, 81, 130, 238, 25, 112, 157, 163, 238, 110, 22, 190, 199, 69, 126, 74, 51, 232, 221, 54, 219, 167, 95, 240, 100, 231, 183, 235, 89, 74, 123, 187, 135, 224, 69, 204, 32, 47, 25, 145, 11, 130, 227, 103, 214, 40, 27, 82, 135, 244, 209, 127, 157, 223, 97, 84, 119, 45, 170, 14, 186, 15, 215, 115, 104, 43, 91, 49, 13, 236, 13, 77, 210, 132, 2, 140, 99, 197, 52, 15, 10, 70, 157, 98, 53, 6, 75, 128, 4, 218, 19, 104, 247, 147, 101, 95, 127, 115, 253, 194, 103, 21, 197, 239, 136, 36, 37, 199, 23, 129, 50, 229, 2, 226, 153, 245, 74, 28, 173, 26, 81, 15, 98, 116, 46, 1, 42, 115, 109, 32, 72, 119, 53, 6, 149, 86, 25, 233, 55, 241, 138, 188, 53, 115, 238, 181, 191, 185, 148, 37, 113, 98, 252, 193, 88, 108, 212, 53, 207, 210, 205, 25, 39, 40, 138, 25, 114, 34, 201, 147, 142, 110, 100, 74, 89, 105, 40, 189, 165, 167, 46, 85, 171, 98, 20, 204, 188, 65, 7, 98, 172, 103, 128, 17, 167, 117, 187, 209, 54, 129, 89, 181, 112, 104, 117, 129, 109, 31, 52, 58, 91, 12, 119, 116, 50, 110, 150, 1, 180, 109, 244, 9, 145, 231, 59, 68, 82, 13, 23, 27, 177, 187, 25, 47, 64, 31, 31, 159, 236, 99, 94, 199, 48, 62, 150, 4, 52, 172, 155, 17, 5, 197, 11, 154, 185, 230, 188, 183, 68, 216, 130, 58, 13, 23, 209, 164, 112, 190, 241, 41, 144, 66, 176, 39, 114, 36, 4, 113, 23, 51, 3, 173, 207, 111, 192, 215, 113, 207, 79, 189, 232, 87, 195, 38, 139, 215, 109, 0, 127, 19, 222, 37, 58, 65, 197, 239, 139, 36, 201, 233, 231, 211, 121, 140, 198, 61, 60, 239, 21, 155, 120, 152, 95, 223, 189, 149, 211, 155, 4, 27, 220, 138, 186, 31, 9, 117, 75, 69, 98, 194, 164, 177, 151, 146, 25, 149, 122, 49, 237, 247, 154, 97, 231, 192, 172, 192, 128, 188, 116, 130, 160, 121, 195, 16, 241, 128, 64, 168, 200, 166, 36, 158, 140, 169, 13, 236, 14, 153, 169, 89, 225, 118, 204, 160, 196, 180, 59, 241, 101, 106, 210, 31, 57, 223, 198, 217, 18, 181, 117, 206, 46, 117, 248, 96, 239, 97, 68, 224, 176, 176, 102, 62, 80, 110, 40, 214, 113, 17, 169, 85, 251, 149, 186, 170, 9, 162, 29, 181, 141, 106, 202, 173, 157, 228, 251, 117, 234, 148, 85, 157, 219, 135, 100, 139, 36, 69, 53, 153, 237, 1, 174, 45, 209, 234, 194, 145, 219, 135, 109, 160, 7, 60, 155, 63, 254, 243, 208, 97, 253, 31, 17, 64, 10];

  let input_data_buff = input_data_arr.buffer;

  const SIZE_F = 48;



  //bls12.instance.exports.g1m_timesScalar(p1, s_reduced, n8, g1_mul_result);

  // 0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb
  //let g1_x = Uint8Array.wrap(input_data_buff, 0, 48);

  // 0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1
  //let g1_y = Uint8Array.wrap(input_data_buff, 48, 96);

  // 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
  // 0x010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000


  // G1 point is 144 bytes
  let g1_times_37 = Uint8Array.wrap(input_data_buff, 0, 144);
  //bls12_g1m_toMontgomery((g1_times_37.buffer as usize) + g1_times_37.byteOffset, (g1_times_37.buffer as usize) + g1_times_37.byteOffset);

  let g2_times_27 = Uint8Array.wrap(input_data_buff, 144, 288);
  //bls12_g2m_toMontgomery((g2_times_27.buffer as usize) + g2_times_27.byteOffset, (g2_times_27.buffer as usize) + g2_times_27.byteOffset);

  //debug_mem((g1_times_37.buffer as usize) + g1_times_37.byteOffset, 144);
  //debug_mem((g2_times_27.buffer as usize) + g2_times_27.byteOffset as usize, 288);
  
  // G1 point is 144 bytes
  let g1_times_999 = Uint8Array.wrap(input_data_buff, 432, 144);
  //bls12_g1m_toMontgomery((g1_times_999.buffer as usize) + g1_times_999.byteOffset, (g1_times_999.buffer as usize) + g1_times_999.byteOffset);


  let g2_gen = Uint8Array.wrap(input_data_buff, 576, 288);
  //bls12_g2m_toMontgomery((g2_gen.buffer as usize) + g2_gen.byteOffset, (g2_gen.buffer as usize) + g2_gen.byteOffset);


  let pFq12One = new ArrayBuffer(SIZE_F*12);
  bls12_ftm_one(pFq12One as usize);
  //eth2_savePostStateRoot(pFq12One as usize + 144);


  let pairingEq2_result = bls12_pairingEq2((g1_times_37.buffer as usize) + g1_times_37.byteOffset, (g2_times_27.buffer as usize) + g2_times_27.byteOffset, (g1_times_999.buffer as usize) + g1_times_999.byteOffset, (g2_gen.buffer as usize) + g2_gen.byteOffset, pFq12One as usize);

  //let return_buf = new Array<u32>(32);
  //return_buf[0] = pairingEq2_result;
  //eth2_savePostStateRoot(return_buf.buffer as usize);


  let result_expected = 1;
  assert(pairingEq2_result == result_expected);



  /*****  pairing test **/
  // G2 point is 288 bytes
  /*
  let g1_gen = Uint8Array.wrap(input_data_buff, 0, 144);
  bls12_g1m_toMontgomery((g1_gen.buffer as usize) + g1_gen.byteOffset, (g1_gen.buffer as usize) + g1_gen.byteOffset);


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


  debug_mem(g1_times_999 as usize, 144);
  debug_mem((g2_gen.buffer as usize) + g2_gen.byteOffset as usize, 288);

  let pairingEq2_result = bls12_pairingEq2(g1_times_37 as usize, g2_times_27 as usize, g1_times_999 as usize, (g2_gen.buffer as usize) + g2_gen.byteOffset, pFq12One as usize);

  let return_buf = new Array<u32>(32);
  return_buf[0] = pairingEq2_result;
  eth2_savePostStateRoot(return_buf.buffer as usize);
  */
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

  //return 1;
}




