import { bls12_g1m_toMontgomery, bls12_g2m_toMontgomery, bls12_g2m_timesScalar, bls12_g2m_affine, bls12_f6m_mul, bls12_f6m_fromMontgomery, bls12_f6m_toMontgomery, bls12_g1m_fromMontgomery, bls12_g1m_timesScalar, bls12_g1m_affine, bls12_g1m_neg, bls12_ftm_one, bls12_pairingEq2 } from "./websnark_bls12";

//@external("env", "debug_printMemHex")
//export declare function debug_mem(pos: i32, len: i32): void;

//@external("env", "debug_print_f2")
//export declare function debug_print_f2(pos: i32): void;

//@external("env", "debug_print_f6")
//export declare function debug_print_f6(pos: i32): void;

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

  const SIZE_F6 = (SIZE_F*2)*3;

  //bls12.instance.exports.g1m_timesScalar(p1, s_reduced, n8, g1_mul_result);

  // 0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb
  //let g1_x = Uint8Array.wrap(input_data_buff, 0, 48);

  // 0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1
  //let g1_y = Uint8Array.wrap(input_data_buff, 48, 96);

  // 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
  // 0x010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000


  let f6_point1 = Uint8Array.wrap(input_data_buff, 0, SIZE_F6);
  // second point starts where the first one ends
  let f6_point2 = Uint8Array.wrap(input_data_buff, SIZE_F6, SIZE_F6);


  let f6_point1_mont_form = new ArrayBuffer(SIZE_F6);
  let f6_point2_mont_form = new ArrayBuffer(SIZE_F6);

  let f6_result_mont_form = new ArrayBuffer(SIZE_F6);
  let f6_result_norm_form = new ArrayBuffer(SIZE_F6);

  bls12_f6m_toMontgomery((f6_point1.buffer as usize) + f6_point1.byteOffset, f6_point1_mont_form as usize);
  bls12_f6m_toMontgomery((f6_point2.buffer as usize) + f6_point2.byteOffset, f6_point2_mont_form as usize);

  //debug_print32(77);
  //debug_print_f6(f6_point1_mont_form as usize);

  //debug_print32(78);
  //debug_print_f6(f6_point2_mont_form as usize);

  /*  *** to test just one f1m_mul ***/
  /*
  bls12_f6m_mul(f6_point1_mont_form as usize, f6_point2_mont_form as usize, f6_result_mont_form as usize);
  debug_print32(33);
  debug_print_f6(f6_result_mont_form as usize);
  bls12_f6m_fromMontgomery(f6_result_mont_form as usize, f6_result_norm_form as usize);
  debug_print32(55);
  debug_print_f6(f6_result_norm_form as usize);
  eth2_savePostStateRoot(f6_result_norm_form as usize);
  */
  // should return 8ae161a0dcb13fde29e7c870ad9613aa67ebf8cc8b37375ee963eb37c7ddc66d401599ddb71db2edf686bb1651a24e0e5fdf0d90a16cf0abdb2ebaed3c1f032dd26ec8c6f021b267dc39488729ab7b8bb5e0b17e38a8d53eb0eff6ec0b25820e5c0dd6a08f1721b0dc78f2b498fc98ba812d4391716e64ce9bde5d772de26ead91cdd7f106a03bdf9cabd8fd7c24261040e69eb4784eaa562b084c6684d300a2f20e22dd82b28b9096b169a96be58c3c325a04668b8606ca86fa282b19b88515a043fa1147415928c079dcfae1156457cd89f4a03f7fcd5116fb71ecf3bea972c78e8e5391c9deecea40f2376ab3740b1a9c0d9e0feaf29b30eea3fe21386223c5fb3d35d5b54f9338ec1ac1cf3d936a924d7df2f4acb9b69508d77673a41c05



  let f6_point1_res1 = new ArrayBuffer(SIZE_F6);
  let f6_point1_res2 = new ArrayBuffer(SIZE_F6);
  let f6_point1_res3 = new ArrayBuffer(SIZE_F6);
  let f6_point1_res4 = new ArrayBuffer(SIZE_F6);
  let f6_point1_res5 = new ArrayBuffer(SIZE_F6);

  bls12_f6m_mul(f6_point1_mont_form as usize, f6_point2_mont_form as usize, f6_point1_res4 as usize);
  bls12_f6m_mul(f6_point1_mont_form as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);

  //for (let i = 0; i < 135; i++) {
  for (let i = 0; i < 135; i++) {
      bls12_f6m_mul(f6_point1_res4 as usize, f6_point1_res5 as usize, f6_point1_res1 as usize);
      bls12_f6m_mul(f6_point1_res5 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);
      bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
      bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res4 as usize);
      bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);

      bls12_f6m_mul(f6_point1_res4 as usize, f6_point1_res5 as usize, f6_point1_res1 as usize);
      bls12_f6m_mul(f6_point1_res5 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);
      bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
      bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res4 as usize);
      bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);
  }
  eth2_savePostStateRoot(f6_point1_res5 as usize);
  
  

  /* *** to do the whole loop *** */
  /*
  let f6_point1_res1 = new ArrayBuffer(SIZE_F6);
  let f6_point1_res2 = new ArrayBuffer(SIZE_F6);
  let f6_point1_res3 = new ArrayBuffer(SIZE_F6);
  let f6_point1_res4 = new ArrayBuffer(SIZE_F6);
  let f6_point1_res5 = new ArrayBuffer(SIZE_F6);
  
  let f6_point1_res6 = new ArrayBuffer(SIZE_F6);
  let f6_point1_res7 = new ArrayBuffer(SIZE_F6);
  let f6_point1_res8 = new ArrayBuffer(SIZE_F6);
  let f6_point1_res9 = new ArrayBuffer(SIZE_F6);
  //let f6_point1_res10 = new ArrayBuffer(SIZE_F6);







  // 2 calls
  bls12_f6m_mul(f6_point1_mont_form as usize, f6_point2_mont_form as usize, f6_point1_res1 as usize);
  bls12_f6m_mul(f6_point2_mont_form as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);

  bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
  bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res4 as usize);
  bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);

  bls12_f6m_mul(f6_point1_res4 as usize, f6_point1_res5 as usize, f6_point1_res6 as usize);
  bls12_f6m_mul(f6_point1_res5 as usize, f6_point1_res6 as usize, f6_point1_res7 as usize);
  bls12_f6m_mul(f6_point1_res6 as usize, f6_point1_res7 as usize, f6_point1_res8 as usize);

  bls12_f6m_mul(f6_point1_res7 as usize, f6_point1_res8 as usize, f6_point1_res9 as usize);
  bls12_f6m_mul(f6_point1_res8 as usize, f6_point1_res9 as usize, f6_point1_res1 as usize);
  bls12_f6m_mul(f6_point1_res9 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);


  for (let i = 0; i < 135*3; i++) {
      if (i % 13 < 5) {
        bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
        bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res4 as usize);
        bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);
      } else if (i % 13 >= 5 && i % 13 < 9) {
        bls12_f6m_mul(f6_point1_res4 as usize, f6_point1_res5 as usize, f6_point1_res6 as usize);
        bls12_f6m_mul(f6_point1_res5 as usize, f6_point1_res6 as usize, f6_point1_res7 as usize);
        bls12_f6m_mul(f6_point1_res6 as usize, f6_point1_res7 as usize, f6_point1_res8 as usize);
      } else {
        bls12_f6m_mul(f6_point1_res7 as usize, f6_point1_res8 as usize, f6_point1_res9 as usize);
        bls12_f6m_mul(f6_point1_res8 as usize, f6_point1_res9 as usize, f6_point1_res1 as usize);
        bls12_f6m_mul(f6_point1_res9 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);
      }
  }
  eth2_savePostStateRoot(f6_point1_res1 as usize);
  */







  /*
  bls12_f6m_mul(f6_point1_mont_form as usize, f6_point2_mont_form as usize, f6_point1_res4 as usize);
  bls12_f6m_mul(f6_point1_mont_form as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);
  */

  /*
  for (let i = 0; i < 675; i++) {
      bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res1 as usize);
      if (i % 7 == 0) {
        bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
      } else {
        bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);
      }
      //bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
      //bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res4 as usize);
      //bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);
  }
  */


  /*
  // 1,310 calls
  for (let i = 0; i < 153; i++) {
      bls12_f6m_mul(f6_point1_res4 as usize, f6_point1_res5 as usize, f6_point1_res1 as usize);
      bls12_f6m_mul(f6_point1_res5 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);
      bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
      bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res4 as usize);
      bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);
      bls12_f6m_mul(f6_point1_res4 as usize, f6_point1_res5 as usize, f6_point1_res1 as usize);
      bls12_f6m_mul(f6_point1_res5 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);
      bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
      bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res4 as usize);
      bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);
  }
  */


  /*
  bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
  bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res4 as usize);
  bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);
  bls12_f6m_mul(f6_point1_res4 as usize, f6_point1_res5 as usize, f6_point1_res6 as usize);
  bls12_f6m_mul(f6_point1_res5 as usize, f6_point1_res6 as usize, f6_point1_res7 as usize);

  bls12_f6m_mul(f6_point1_res6 as usize, f6_point1_res7 as usize, f6_point1_res8 as usize);
  bls12_f6m_mul(f6_point1_res7 as usize, f6_point1_res8 as usize, f6_point1_res9 as usize);
  bls12_f6m_mul(f6_point1_res8 as usize, f6_point1_res9 as usize, f6_point1_res10 as usize);
  bls12_f6m_mul(f6_point1_res9 as usize, f6_point1_res10 as usize, f6_point1_res1 as usize);
  bls12_f6m_mul(f6_point1_res10 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);


  for (let i = 0; i < 131*3; i++) {
      if (i % 7 == 0) {
        bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
        bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res4 as usize);
        bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);
      } else if (i % 7 == 2) {
        bls12_f6m_mul(f6_point1_res4 as usize, f6_point1_res5 as usize, f6_point1_res6 as usize);
        bls12_f6m_mul(f6_point1_res5 as usize, f6_point1_res6 as usize, f6_point1_res7 as usize);
        bls12_f6m_mul(f6_point1_res6 as usize, f6_point1_res7 as usize, f6_point1_res8 as usize);
      } else {
        bls12_f6m_mul(f6_point1_res7 as usize, f6_point1_res8 as usize, f6_point1_res9 as usize);
        bls12_f6m_mul(f6_point1_res8 as usize, f6_point1_res9 as usize, f6_point1_res10 as usize);
        bls12_f6m_mul(f6_point1_res9 as usize, f6_point1_res10 as usize, f6_point1_res1 as usize);
      }

      bls12_f6m_mul(f6_point1_res10 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);
  }
  eth2_savePostStateRoot(f6_point1_res10 as usize);
  */


  /*
  for (let i = 0; i < 135; i++) {
      bls12_f6m_mul(f6_point1_res4 as usize, f6_point1_res5 as usize, f6_point1_res1 as usize);
      bls12_f6m_mul(f6_point1_res5 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);
      bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
      bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res4 as usize);
      bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);
      bls12_f6m_mul(f6_point1_res4 as usize, f6_point1_res5 as usize, f6_point1_res1 as usize);
      bls12_f6m_mul(f6_point1_res5 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);
      bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);
      bls12_f6m_mul(f6_point1_res2 as usize, f6_point1_res3 as usize, f6_point1_res4 as usize);
      bls12_f6m_mul(f6_point1_res3 as usize, f6_point1_res4 as usize, f6_point1_res5 as usize);
  }
  eth2_savePostStateRoot(f6_point1_res5 as usize);
  */




  // plus 3 more for 1315
  //bls12_f6m_mul(f6_point1_res4 as usize, f6_point1_res5 as usize, f6_point1_res1 as usize);
  //bls12_f6m_mul(f6_point1_res5 as usize, f6_point1_res1 as usize, f6_point1_res2 as usize);
  //bls12_f6m_mul(f6_point1_res1 as usize, f6_point1_res2 as usize, f6_point1_res3 as usize);

  



  /*  ** test toMontgomery */
  //eth2_savePostStateRoot((g1_gen.buffer as usize) + g1_gen.byteOffset);
  // should return 160c53fd9087b35cf5ff769967fc1778c1a13b14c7954f1547e7d0f3cd6aaef040f4db21cc6eceed75fb0b9e417701127122e70cd593acba8efd18791a63228cce250757135f59dd945140502958ac51c05900ad3f8c1c0e6aa20850fc3ebc0bfdff02000000097602000cc40b00f4ebba58c7535798485f455752705358ce776dec56a2971a075c93e480fac35ef615








  /*****  pairing test **/
  // G2 point is 288 bytes
  /*
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

  return 1;
}




