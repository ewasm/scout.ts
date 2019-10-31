import { bn128_g1m_toMontgomery, bn128_g2m_toMontgomery, bn128_g1m_neg, bn128_ftm_one, bn128_pairingEq4, bn128_g1m_timesScalar, bn128_g1m_add, bn128_g1m_affine, bn128_g1m_neg} from "./websnark_bn128";
//import { bn128_g1m_toMontgomery } from "./websnark_bn128";

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
*/

export function main(): i32 {
  const SIZE_F = 32;
  let pFq12One = new ArrayBuffer(SIZE_F*12);
  bn128_ftm_one(pFq12One as usize);

  let input_data_len = eth2_blockDataSize();
  let input_data_buff = new ArrayBuffer(input_data_len);
  eth2_blockDataCopy(input_data_buff as usize, 0, input_data_len);


  let pAlfa1 = ( input_data_buff as usize ); // vk_a1.buffer as usize;
  let pBeta2 = ( input_data_buff as usize ) + 96;
  let pGamma2 = (input_data_buff as usize) + 288;
  let pDelta2 = ( input_data_buff as usize ) + 480; 

  let pA = ( input_data_buff as usize ) + 672;
  let pB = ( input_data_buff as usize ) + 768;
  let pC = ( input_data_buff as usize ) + 960;

  bn128_g1m_toMontgomery(pAlfa1, pAlfa1);
  bn128_g2m_toMontgomery(pBeta2, pBeta2);
  bn128_g2m_toMontgomery(pDelta2, pDelta2);
  bn128_g2m_toMontgomery(pGamma2, pGamma2);

  bn128_g1m_toMontgomery(pA, pA);
  bn128_g2m_toMontgomery(pB, pB);
  bn128_g1m_toMontgomery(pC, pC);

  let num_ic = Uint8Array.wrap(input_data_buff, 1056, 8)[0] as usize;
  let ic_start = ( input_data_buff as usize ) + 1064;
  let num_input = Uint8Array.wrap(input_data_buff, 1064 + num_ic * SIZE_F * 3, 8)[0] as usize;
  let input_start = ( input_data_buff as usize ) + 1064 + num_ic * SIZE_F * 3 + 8;

  // TODO assert input count == input constraint count - 1

  let pIC = ic_start;
  bn128_g1m_toMontgomery(pIC, pIC);

  for (let i = 0 as usize; i < num_input; i++ ) {
    // ICAux <== IC[i+1]
    let pICAux = pIC + ((i + 1) * SIZE_F * 3);

    // ICAux <== g1m_toMontgomery(ICAux)
    bn128_g1m_toMontgomery(pICAux, pICAux);

    // ICr <== input[i]
    let pICr = input_start + (i * SIZE_F);

    /* TODO add this back in after asc compiler bug is fixed
    if (int_gte(pICr, pr)) {
      return 1;
    }
    */

    bn128_g1m_timesScalar(pICAux, pICr, SIZE_F, pICAux);
    bn128_g1m_add(pICAux, pIC, pIC);
  }
  
  bn128_g1m_affine(pIC, pIC);
  bn128_g1m_neg(pIC, pIC);
  bn128_g1m_neg(pC, pC);
  bn128_g1m_neg(pAlfa1, pAlfa1);

  let return_buf = new Array<u32>(2);

  if (!bn128_pairingEq4(pA, pB, pIC, pGamma2, pC, pDelta2, pAlfa1, pBeta2, pFq12One as usize)) {
      return_buf[0] = 1;
  } else {
      return_buf[0] = 0;
  }

  eth2_savePostStateRoot(return_buf.buffer as usize);

  return 0;
}
