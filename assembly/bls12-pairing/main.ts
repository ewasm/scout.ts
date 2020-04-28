import { bls12_g1m_toMontgomery, bls12_g2m_toMontgomery, bls12_g1m_fromMontgomery, bls12_g1m_timesScalar, bls12_g1m_affine, bls12_g1m_neg, bls12_ftm_one, bls12_pairingEq2 } from "./websnark_bls12";

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


/***
* load test vector
* TODO: document where the test vector comes from
*
* all input coordinates (G1 points and G2 points) are in normal form
* websnark expects inputs to be in montgomery form. To convert them,
* use g1m_toMontgomery and g2m_toMontgomery



const proof_a = [bigInt("089f41b0e239736338dbacf5893756a5a97ccbacb0f6ba326767b161018a803f", 16), bigInt("26e20505b4f4a99859be674e5fc17025a6b81236302e6c21a59f95e0873b9fa4", 16)]

const pProofA = bn128.alloc(SIZE_F * 3);

bn128.setG1(pProofA, proof_a) // same as setG1Affine

proof_a_le =
3f808a0161b1676732baf6b0accb7ca9a5563789f5acdb38637339e2b0419f08a49f3b87e0959fa5216c2e303612b8a62570c15f4e67be5998a9f4b40505e2260100000000000000000000000000000000000000000000000000000000000000


bn128.instance.exports.g1m_toMontgomery(pProofA, pProofA)


const vk_a = [
            [bigInt("24963f8ac35ad1fa13d850fb61eb3c1d2766572452248b14c8e392591b14342b",16), bigInt("167595c7e7cd0c935e3a275f254340f7c5a28f5edfa92963a1627e04398fe14c", 16)],
            [bigInt("25b7f1627599cac3ac91731ff8653662c70afe283da733cd885e12b2be54d313",16), bigInt("1a995764699581e0c41626103f9b9a675a503148f4d0b67cbaf1f7ef0b1cc41d",16)]
           ]

bn128.setG2Affine(pVKA, vk_a);
bn128.instance.exports.g2m_toMontgomery(pVKA, pVKA);

2b34141b5992e3c8148b2452245766271d3ceb61fb50d813fad15ac38a3f9624
4ce18f39047e62a16329a9df5e8fa2c5f74043255f273a5e930ccde7c7957516

13d354beb2125e88cd33a73d28fe0ac7623665f81f7391acc3ca997562f1b725
1dc41c0beff7f1ba7cb6d0f44831505a679a9b3f102616c4e08195696457991a

0100000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000


vk_a_le =
2b34141b5992e3c8148b2452245766271d3ceb61fb50d813fad15ac38a3f96244ce18f39047e62a16329a9df5e8fa2c5f74043255f273a5e930ccde7c79575160100000000000000000000000000000000000000000000000000000000000000
13d354beb2125e88cd33a73d28fe0ac7623665f81f7391acc3ca997562f1b7251dc41c0beff7f1ba7cb6d0f44831505a679a9b3f102616c4e08195696457991a0100000000000000000000000000000000000000000000000000000000000000






// second G1 point
const proof_a_p = [bigInt("2034a6f7e573a3b1d2c16934721c754bc50fc8c232a4e83c8a7dfa8770311ddf", 16), bigInt("23630f23dda7cbc29e510ee9b92e16e16277736a32b01c670bbc77f4c6978fd", 16)]

// in Little endian:
df1d317087fa7d8a3ce8a432c2c80fc54b751c723469c1d2b1a373e5f7a63420
fd78694c7fc7bb70c6012ba3367727166ee1929bee10e529bc7cda3df2303602
0100000000000000000000000000000000000000000000000000000000000000

proof_a_p = df1d317087fa7d8a3ce8a432c2c80fc54b751c723469c1d2b1a373e5f7a63420fd78694c7fc7bb70c6012ba3367727166ee1929bee10e529bc7cda3df23036020100000000000000000000000000000000000000000000000000000000000000


const pProof_a_p = bn128.alloc(SIZE_F * 3);
const pProof_a_p_neg = bn128.alloc(SIZE_F * 3);

bn128.setG1(pProof_a_p, proof_a_p) // same as setG1Affine
bn128.instance.exports.g1m_neg(pProof_a_p, pProof_a_p_neg)
bn128.instance.exports.g1m_toMontgomery(pProof_a_p_neg, pProof_a_p_neg)



// p2 is the second G2 point
const P2 = [
            [bigInt("1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed",16), bigInt("198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c2", 16)],
            [bigInt("12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa",16), bigInt("090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b",16)]
           ]

// in little endian:
edf692d95cbdde46ddda5ef7d422436779445c5e66006a42761e1f12efde0018
c212f3aeb785e49712e7a9353349aaf1255dfb31b7bf60723a480d9293938e19

aa7dfa6601cce64c7bd3430c69e7d1e38f40cb8d8071ab4aeb6d8cdba55ec812
5b9722d1dcdaac55f38eb37033314bbc95330c69ad999eec75f05f58d0890609

0100000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000


edf692d95cbdde46ddda5ef7d422436779445c5e66006a42761e1f12efde0018c212f3aeb785e49712e7a9353349aaf1255dfb31b7bf60723a480d9293938e190100000000000000000000000000000000000000000000000000000000000000
aa7dfa6601cce64c7bd3430c69e7d1e38f40cb8d8071ab4aeb6d8cdba55ec8125b9722d1dcdaac55f38eb37033314bbc95330c69ad999eec75f05f58d08906090100000000000000000000000000000000000000000000000000000000000000



let pFq12One = bn128.alloc(SIZE_F * 12);
bn128.instance.exports.ftm_one(pFq12One);

const pairingEq2_result = bn128.instance.exports.bn128_pairingEq2(pProofA, pVKA, pProof_a_p_neg, pP2, pFq12One);
console.log("bn128_pairingEq2 result should be true/1:", pairingEq2_result);


the data needed to check the pairing is encoded as: concat([...])

proof_a 96 bytes
3f808a0161b1676732baf6b0accb7ca9a5563789f5acdb38637339e2b0419f08a49f3b87e0959fa5216c2e303612b8a62570c15f4e67be5998a9f4b40505e2260100000000000000000000000000000000000000000000000000000000000000

vka 192 bytes
2b34141b5992e3c8148b2452245766271d3ceb61fb50d813fad15ac38a3f96244ce18f39047e62a16329a9df5e8fa2c5f74043255f273a5e930ccde7c79575160100000000000000000000000000000000000000000000000000000000000000
13d354beb2125e88cd33a73d28fe0ac7623665f81f7391acc3ca997562f1b7251dc41c0beff7f1ba7cb6d0f44831505a679a9b3f102616c4e08195696457991a0100000000000000000000000000000000000000000000000000000000000000

proof_ap 96 bytes
df1d317087fa7d8a3ce8a432c2c80fc54b751c723469c1d2b1a373e5f7a63420fd78694c7fc7bb70c6012ba3367727166ee1929bee10e529bc7cda3df23036020100000000000000000000000000000000000000000000000000000000000000

p2 192 bytes
edf692d95cbdde46ddda5ef7d422436779445c5e66006a42761e1f12efde0018c212f3aeb785e49712e7a9353349aaf1255dfb31b7bf60723a480d9293938e190100000000000000000000000000000000000000000000000000000000000000
aa7dfa6601cce64c7bd3430c69e7d1e38f40cb8d8071ab4aeb6d8cdba55ec8125b9722d1dcdaac55f38eb37033314bbc95330c69ad999eec75f05f58d08906090100000000000000000000000000000000000000000000000000000000000000



block data:
3f808a0161b1676732baf6b0accb7ca9a5563789f5acdb38637339e2b0419f08a49f3b87e0959fa5216c2e303612b8a62570c15f4e67be5998a9f4b40505e22601000000000000000000000000000000000000000000000000000000000000002b34141b5992e3c8148b2452245766271d3ceb61fb50d813fad15ac38a3f96244ce18f39047e62a16329a9df5e8fa2c5f74043255f273a5e930ccde7c795751613d354beb2125e88cd33a73d28fe0ac7623665f81f7391acc3ca997562f1b7251dc41c0beff7f1ba7cb6d0f44831505a679a9b3f102616c4e08195696457991a01000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000df1d317087fa7d8a3ce8a432c2c80fc54b751c723469c1d2b1a373e5f7a63420fd78694c7fc7bb70c6012ba3367727166ee1929bee10e529bc7cda3df23036020100000000000000000000000000000000000000000000000000000000000000edf692d95cbdde46ddda5ef7d422436779445c5e66006a42761e1f12efde0018c212f3aeb785e49712e7a9353349aaf1255dfb31b7bf60723a480d9293938e19aa7dfa6601cce64c7bd3430c69e7d1e38f40cb8d8071ab4aeb6d8cdba55ec8125b9722d1dcdaac55f38eb37033314bbc95330c69ad999eec75f05f58d089060901000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

*/


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

  let g1_gen = Uint8Array.wrap(input_data_buff, 0, 144);

  let scalar_arr = Array.create<u8>(8);
  //scalar_arr = [42, 0, 0, 0, 0, 0, 0, 0];
  scalar_arr = [42, 0, 0, 0, 0, 0, 0, 0];

  //let scalar_uintarr = Uint8Array.wrap(scalar_arr.buffer, 0, 8);
  //g1_gen.buffer as usize

  let pG1_mul_result = new ArrayBuffer(SIZE_F*3);

  bls12_g1m_toMontgomery((g1_gen.buffer as usize) + g1_gen.byteOffset, (g1_gen.buffer as usize) + g1_gen.byteOffset);

  bls12_g1m_timesScalar((g1_gen.buffer as usize) + g1_gen.byteOffset, (scalar_arr.buffer as usize), 8, pG1_mul_result as usize);

  let pG1_mul_affine = new ArrayBuffer(SIZE_F*3);
  bls12_g1m_affine(pG1_mul_result as usize, pG1_mul_affine as usize);
  bls12_g1m_fromMontgomery(pG1_mul_affine as usize, pG1_mul_affine as usize);

  //eth2_savePostStateRoot((pG1_mul_affine as usize));
  eth2_savePostStateRoot((pG1_mul_affine as usize) + 16);
  //eth2_savePostStateRoot((pG1_mul_affine as usize) + 44);
  //eth2_savePostStateRoot(scalar_arr.buffer as usize);



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




