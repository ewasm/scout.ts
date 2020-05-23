import { bls12_g1m_toMontgomery, bls12_g2m_toMontgomery, bls12_g2m_timesScalar, bls12_g2m_affine, bls12_f6m_mul, bls12_f6m_fromMontgomery, bls12_f6m_toMontgomery, bls12_g1m_fromMontgomery, bls12_g1m_timesScalar, bls12_g1m_affine, bls12_g1m_neg, bls12_ftm_one, bls12_pairingEq2 } from "./websnark_bls12";

export function main(): void {

  let input_data_arr = Array.create<u8>(8);
  // input_data_arr = 13392e414a5bfc1c1f9c96f84b81fdfc6c4e56d920324e9200157df08517e764d5c91c5f5084b8d33a1076d8fe6a7702414dcda5a39bd75c78069b623e6e6e08d34de11f215e53d4c83cbe4e4c1d66d814ccab95b8843a6d9a5be9079e266105b655cbcc358f0baa5182ee19709da3ee6e16bec7457e4a33e8dd36dba75ff064e7b7eb594a7bbb87e045cc202f19910b82e367d6281b5287f4d17f9ddf6154772daa0eba0fd773682b5b310dec0d4dd284028c63c5340f0a469d6235064b8004da1368f793655f7f73fdc26715c5ef882425c7178132e502e299f54a1cad1a510f62742e012a736d2048773506955619e937f18abc3573eeb5bfb994257162fcc1586cd435cfd2cd1927288a197222c9938e6e644a596928bda5a72e55ab6214ccbc410762ac678011a775bbd1368159b5706875816d1f343a5b0c7774326e9601b46df40991e73b44520d171bb1bb192f401f1f9fec635ec7303e960434ac9b1105c50b9ab9e6bcb744d8823a0d17d1a470bef1299042b02772240471173303adcf6fc0d771cf4fbde857c3268bd76d007f13de253a41c5ef8b24c9e9e7d3798cc63d3cef159b78985fdfbd95d39b041bdc8aba1f09754b4562c2a4b1979219957a31edf79a61e7c0acc080bc7482a079c310f18040a8c8a6249e8ca90dec0e99a959e176cca0c4b43bf1656ad21f39dfc6d912b575ce2e75f860ef6144e0b0b0663e506e28d67111a955fb95baaa09a21db58d6acaad9de4fb75ea94559ddb87648b24453599ed01ae2dd1eac291db876da0073c9b3ffef3d061fd1f11400a
  input_data_arr = [19, 57, 46, 65, 74, 91, 252, 28, 31, 156, 150, 248, 75, 129, 253, 252, 108, 78, 86, 217, 32, 50, 78, 146, 0, 21, 125, 240, 133, 23, 231, 100, 213, 201, 28, 95, 80, 132, 184, 211, 58, 16, 118, 216, 254, 106, 119, 2, 65, 77, 205, 165, 163, 155, 215, 92, 120, 6, 155, 98, 62, 110, 110, 8, 211, 77, 225, 31, 33, 94, 83, 212, 200, 60, 190, 78, 76, 29, 102, 216, 20, 204, 171, 149, 184, 132, 58, 109, 154, 91, 233, 7, 158, 38, 97, 5, 182, 85, 203, 204, 53, 143, 11, 170, 81, 130, 238, 25, 112, 157, 163, 238, 110, 22, 190, 199, 69, 126, 74, 51, 232, 221, 54, 219, 167, 95, 240, 100, 231, 183, 235, 89, 74, 123, 187, 135, 224, 69, 204, 32, 47, 25, 145, 11, 130, 227, 103, 214, 40, 27, 82, 135, 244, 209, 127, 157, 223, 97, 84, 119, 45, 170, 14, 186, 15, 215, 115, 104, 43, 91, 49, 13, 236, 13, 77, 210, 132, 2, 140, 99, 197, 52, 15, 10, 70, 157, 98, 53, 6, 75, 128, 4, 218, 19, 104, 247, 147, 101, 95, 127, 115, 253, 194, 103, 21, 197, 239, 136, 36, 37, 199, 23, 129, 50, 229, 2, 226, 153, 245, 74, 28, 173, 26, 81, 15, 98, 116, 46, 1, 42, 115, 109, 32, 72, 119, 53, 6, 149, 86, 25, 233, 55, 241, 138, 188, 53, 115, 238, 181, 191, 185, 148, 37, 113, 98, 252, 193, 88, 108, 212, 53, 207, 210, 205, 25, 39, 40, 138, 25, 114, 34, 201, 147, 142, 110, 100, 74, 89, 105, 40, 189, 165, 167, 46, 85, 171, 98, 20, 204, 188, 65, 7, 98, 172, 103, 128, 17, 167, 117, 187, 209, 54, 129, 89, 181, 112, 104, 117, 129, 109, 31, 52, 58, 91, 12, 119, 116, 50, 110, 150, 1, 180, 109, 244, 9, 145, 231, 59, 68, 82, 13, 23, 27, 177, 187, 25, 47, 64, 31, 31, 159, 236, 99, 94, 199, 48, 62, 150, 4, 52, 172, 155, 17, 5, 197, 11, 154, 185, 230, 188, 183, 68, 216, 130, 58, 13, 23, 209, 164, 112, 190, 241, 41, 144, 66, 176, 39, 114, 36, 4, 113, 23, 51, 3, 173, 207, 111, 192, 215, 113, 207, 79, 189, 232, 87, 195, 38, 139, 215, 109, 0, 127, 19, 222, 37, 58, 65, 197, 239, 139, 36, 201, 233, 231, 211, 121, 140, 198, 61, 60, 239, 21, 155, 120, 152, 95, 223, 189, 149, 211, 155, 4, 27, 220, 138, 186, 31, 9, 117, 75, 69, 98, 194, 164, 177, 151, 146, 25, 149, 122, 49, 237, 247, 154, 97, 231, 192, 172, 192, 128, 188, 116, 130, 160, 121, 195, 16, 241, 128, 64, 168, 200, 166, 36, 158, 140, 169, 13, 236, 14, 153, 169, 89, 225, 118, 204, 160, 196, 180, 59, 241, 101, 106, 210, 31, 57, 223, 198, 217, 18, 181, 117, 206, 46, 117, 248, 96, 239, 97, 68, 224, 176, 176, 102, 62, 80, 110, 40, 214, 113, 17, 169, 85, 251, 149, 186, 170, 9, 162, 29, 181, 141, 106, 202, 173, 157, 228, 251, 117, 234, 148, 85, 157, 219, 135, 100, 139, 36, 69, 53, 153, 237, 1, 174, 45, 209, 234, 194, 145, 219, 135, 109, 160, 7, 60, 155, 63, 254, 243, 208, 97, 253, 31, 17, 64, 10];

  let input_data_buff = input_data_arr.buffer;

  const SIZE_F = 48;

  const SIZE_F6 = (SIZE_F*2)*3;

  let f6_point1 = Uint8Array.wrap(input_data_buff, 0, SIZE_F6);
  // second point starts where the first one ends
  let f6_point2 = Uint8Array.wrap(input_data_buff, SIZE_F6, SIZE_F6);

  let f6_point1_mont_form = new ArrayBuffer(SIZE_F6);
  let f6_point2_mont_form = new ArrayBuffer(SIZE_F6);

  let f6_result_mont_form = new ArrayBuffer(SIZE_F6);
  let f6_result_norm_form = new ArrayBuffer(SIZE_F6);

  bls12_f6m_toMontgomery((f6_point1.buffer as usize) + f6_point1.byteOffset, f6_point1_mont_form as usize);
  bls12_f6m_toMontgomery((f6_point2.buffer as usize) + f6_point2.byteOffset, f6_point2_mont_form as usize);


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
  //eth2_savePostStateRoot(f6_point1_res5 as usize);

  // Uint64Array.wrap() works here for result_actual. But using Uint8Array because Uint64Array doesn't work on result_expected_buff..
  let result_actual = Uint8Array.wrap(f6_point1_res5, 0, 32);

  let result_expected_arr = Array.create<u8>(8);
  //result_expected_arr = 74229fc665e6c3f4401905c1a454ea57c8931739d05a074fd60400f19684d680
  result_expected_arr = [116, 34, 159, 198, 101, 230, 195, 244, 64, 25, 5, 193, 164, 84, 234, 87, 200, 147, 23, 57, 208, 90, 7, 79, 214, 4, 0, 241, 150, 132, 214, 128];
  let result_expected_buff = result_expected_arr.buffer;

  // Uint64Array.wrap() doesn't work here... but Uint8Array.wrap() does.
  let result_expected = Uint8Array.wrap(result_expected_buff, 0, 32);

  assert(result_actual[0] == result_expected[0]);
  assert(result_actual[1] == result_expected[1]);
  assert(result_actual[2] == result_expected[2]);

}




