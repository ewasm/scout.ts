
import { ethash_keccak256 } from "./keccak";
import { RLPData, decode } from "./rlp";

/** debugging functions
export declare function sayHello(a: i32): void;

@external("main", "debug")
export declare function debug(a: i32): void;
*/

@external("env", "eth2_blockDataSize")
export declare function getBlockDataSize(): i32;

@external("env", "eth2_blockDataCopy")
//export declare function copyBlockData(srcOffset: i32, length: i32, outputOffset: i32): void;
export declare function copyBlockData(outputOffset: i32, srcOffset: i32, length: i32): void;

@external("env", "eth2_savePostStateRoot")
//export declare function copyBlockData(srcOffset: i32, length: i32, outputOffset: i32): void;
export declare function savePostStateRoot(offset: i32): void;

// https://github.com/ewasm/ewasm-rust-api/blob/master/src/eth2.rs#L22
// pub fn eth2_blockDataCopy(outputOfset: *const u32, offset: u32, length: u32);


/**
 * Verify a proof for the Ethereum Merkle-Patricia-Trie.
 * 
 * Verification logic was ported from https://github.com/ethereumjs/merkle-patricia-tree/blob/v3.0.0/src/proof.js#L31-L39.
 * 
 * 
 * Input:
 *   * `proof_nodes[]`: a merkle proof, which is an array of nodes (from the root node to the account leaf)
 *   * pre-state root. should match `keccak(proof_nodes[0])`
 *   * account address
 * 
 * 
 * Trie nodes:
 *   * Ethereum's merkle-patricia-trie is a hexary trie, meaning branch nodes are arrays of 16 elements.
 *     * btw, branch nodes also have a 17th element that I forget the purpose of
 *   * Branch nodes look like this:
 *       branch_node = [hash_0, hash_1, hash_2, hash_3, hash_4, hash_5, hash_6, hash_7, hash_8, hash_9, hash_a, hash_b, hash_c, hash_d, hash_e, hash_f, 17th_element]
 *   * there are only three types of nodes (branch, leaf, extension). Most nodes in a proof are branch nodes.
 *   * The root node is a branch node. The test vector proof used here looks like this:
 *     proof_nodes = [root_branch, level_1_branch, level_2_branch, level_3_branch, account_leaf]
 *   * occassionally when two or more leafs have a shared prefix longer than two hex chars, an intermediate node in the proof will be an extension node
 *     * extension nodes are a minor implementation detail, they aren't handled yet in this code and aren't important to the verification logic anyway.
 *   * Leaf nodes look like this:
 *     account_leaf = [node_key, node_value]
 *   * node_value is an encoded account, which has four fields: [nonce, balance, stateRoot, codeRoot]
 *   * node_key is a leftover portion of the "leaf key". the initial portion is implicit in the path from the root node to the leaf node, like so:
 *         root_branch = [0, 1, hash_2, 3, 4, 5, hash_6, 7, 8, hash_9, a, b, c, hash_d, e, f, 17]
 *         level_1_branch = [0, 1, 2, 3, 4, hash_5, 6, 7, 8, 9, a, b, hash_c, d, e, f, 17]
 *         level_2_branch = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, hash_b, c, d, e, f, 17]
 *         level_3_branch = [0, 1, 2, 3, hash_4, 5, 6, 7, 8, 9, a, b, c, d, e, f, 17]
 *         account_leaf = [0cd89ae762119fed6ecd8dc969077bb2d6a3471c639a10e710a9374a121d, [none, balance, stateRoot, codeRoot]]
 *     * `hash_6` or `hash_d` indicates that a hash is present at index `6` or index `d` in the node.
 *     * `6` or `d` indicate that no hash is present at that index, meaning the trie is empty down that path
 *   * the above is a simplified picture of the proof in the test vector (in reality the root and level_1 branches are full)
 *     * the test vector is a proof for an account with address 0x6cdf39d8d75538a0cad721f24276ec48562e5c90
 *     * the "leaf key" is the keccak of the address: 25b40cd89ae762119fed6ecd8dc969077bb2d6a3471c639a10e710a9374a121d
 *     * the initial portion of the key that is implicit in the path is "25b4"
 *       * hash_2 in the root branch, hash_5 in level_1_branch, hash_b in level_2_branch, ...
 *     * the remaining portion "0cd89ae762119..." is found in the node_key in the leaf node
 * 
 * Algorithm:
 *   * algo verifies that an account (nonce, balance, code, stateRoot) is in fact a leaf in the trie
 *   * first, compute keccak(address). this is the key for the account leaf
 *   ******** begin tangent on the key and the path
 *     * technically the proof can be verified without the account address, since the key is already
 *       present in the proof.
 *       * the key is present in the proof in two ways: the latter portion is explicit in the leaf node
 *         itself, and the initial portion is implicit in the path
 *       * the path is length 4 so the first 4 chars in the key need to be extracted. Our knowledge
 *         looks like this:
 *             ["_,_,_,_" + "0cd89ae762119..."]
 *     * the implicit portion "_,_,_,_" could be extracted from the proof by hashing the leaf node, and 
 *       comparing the hash against each index in level_3_branch. it would match with hash_4, so you can
 *       update the key like:
 *             ["_,_,_,_" + "0cd89ae762119..."] -> ["_,_,_" + "40cd89ae762119..."]
 *     * and then do the same until you have the whole key.
 *     * having the whole key makes it easier to verify the proof by simply following the path. without it,
 *       a lot of bit twiddling would be necessary to figure out the path.
 *     * sorry to belabor, but the the point of all this is that similar inefficiences pop up when moving
 *       from verifying a single branch, to verifying a multi-proof. The multi-proof should include extra 
 *       structural information (as described in the turbo-geth docs), not just de-duplicated branch proofs.
 *   ******** end tangent
 *   * 
 *
 *
  **/



export function main(): i32 {


/** these globals were defined above as top level statements
 * but AS compiled them to a start function (which Scout won't run).
 *
 * There is an @global decorator, but looks like its only for functions, not variables
*/

// define two globals for using keccak: the context and the output buffer
// both will be reused repeatedly when calling keccak

// allocate keccak context buffer
let keccakCtx = new ArrayBuffer(650); // more than 616 (see the docs in keccak.tx)
let keccakCtxBuf = changetype<usize>(keccakCtx);

// allocate keccak output buffer
let hashOutputBuf = new ArrayBuffer(32);
let hashOutput = Uint64Array.wrap(hashOutputBuf, 0, 4);
// another option is Uint8Array.wrap(hashOutputBuf, 0, 32)
// we use Uint64Array so we can test equivalence of hashes by checking 4 elements rather than 32
let hashOutputPtr = changetype<usize>(hashOutputBuf);




  // INPUT 1: root hash (the pre-state root), hardcoded for testing TODO: fetch from EEI
  let root_hash = Array.create<u8>(32);
  // 0x65b7b9ccb7a4d828986e488e081bc11bfa5ef6141fb06b0af2e9a0bda273a753
  root_hash = [101, 183, 185, 204, 183, 164, 216, 40, 152, 110, 72, 142, 8, 27, 193, 27, 250, 94, 246, 20, 31, 176, 107, 10, 242, 233, 160, 189, 162, 115, 167, 83];
  let root_hash_data = Uint64Array.wrap(root_hash.buffer, 0, 4);


  // INPUT 2: address is another input, also hardcoded for testing.
  let address_raw = Array.create<u8>(20);
  // keccak("6cdf39d8d75538a0cad721f24276ec48562e5c90")
  address_raw = [108, 223, 57, 216, 215, 85, 56, 160, 202, 215, 33, 242, 66, 118, 236, 72, 86, 46, 92, 144];
  let address_data = Uint8Array.wrap(address_raw.buffer, 0, 20);

  // get the key for the account leaf (the hash of the address)
  let addressHashOutput = new ArrayBuffer(32);
  let addressHashOutputPtr = changetype<usize>(addressHashOutput);
  //keccak(keccakCtxBuf, address_data.dataStart, 20, addressHashOutputPtr);
  ethash_keccak256(addressHashOutputPtr, address_data.dataStart, 20);
  //debug(addressHashOutputPtr);

  // use Uint8 for address_hash because it'll be converted into nibbles
  let address_hash = Uint8Array.wrap(addressHashOutput, 0, 32);

  /**
   * Next we convert address_hash to an array of nibbles (i.e. single hex chars)
   * We use the var name `key_path` for the array of nibbles, because
   * the key is used to derive the path while iterating over the proof nodes.
   * 
   * The path is implicit in the proof data structure, and is reconstructed
   * by calling matchingNibbleLength() as nodes are traversed.
   * In the simple cases the call to matchingNibbleLength is not needed,
   * because the result is just 1 nibble. Branch nodes are the simple cases.
   * Reminder: there are three node types:  branch, leaf, and extension.
   * A call to matchingNibbleLength is only done for leaf nodes and extension nodes.
   * A more optimized proof encoding might precompute the calls to matchingNibbleLength()
   * and include the results in the proof data, to avoid bit twiddling during verification.
   */

  // a better name might be key_nibbles (or key_nibbles_of_the_account_leaf, to distinguish from keys of other nodes traversed in the proof)
  let key_path = uintArrToNibbleArr(address_hash);

  // key_path_i or kp_i is a counter to track how many nibbles in the key_path have been traversed (starting from the root node)
  let kp_i = 0;



  // INPUT 3: get proof data from the EEI
  let input_data_len = getBlockDataSize();
  let input_data_buff = new ArrayBuffer(input_data_len);
  let input_data_buff_ptr = changetype<usize>(input_data_buff);
  //copyBlockData(0, input_data_len, input_data_buff_ptr);
  copyBlockData(input_data_buff_ptr, 0, input_data_len);
  let input_data = Uint8Array.wrap(input_data_buff, 0, input_data_len);

  //sayHello(888);
  //sayHello(input_data_len);

  // proof data is RLP. decode it into an array of nodes.
  let proof_decoded = decode(input_data);
  // proof_decoded is type RLPData: { buffer: Uint8Array, children: RLPData[] }

  /**
   * Note on the data types
   * Three main AS types for dealing with data:
   * (1) ArrayBuffer  (2) UintXArray aka TypedArray  (3) DataView
   * ArrayBuffer is the "backing buffer" for both TypedArray and DataViews (access with uint_arr.buffer and data_view.buffer)
   * 
   * Note that you cannot read directly from an ArrayBuffer, you need to wrap it in a TypedArray or a DataView
   * 
   * To read from a DataView, you use `data_view.getUint8(0)` or `getUint64(19)`
   * To read from a TypedArray, you use `uint_arr[0]` or `uint_arr[19]`.
   * So the difference is a DataView lets you read any width uints, but a UintXArray you can only read width X.
   * 
   * The RLPData class uses Uint8Arrays, but the Uint8Array with the data is confusingly named `rlp_node.buffer` (so the backing buffer is at `rlp_node.buffer.buffer`)
   * TODO: rename it to rlp_node.uint_arr (or something)
   */

  //sayHello(999);
  //sayHello(proof_decoded.children.length);


  // wantHash is initially set to the root hash, because the root node is first one processed in the main loop
  let wantHash = Uint64Array.wrap(root_hash.buffer, 0, 4);


  // benchmark tries to approximate verifying a multiproof of 70 account leafs (from a trie of 5000 accounts)
  // the multiproof has approx 200 nodes, and each node is hashed during verification
  // the test vector here is a proof for a single leaf, which happens to be an array of 5 nodes
  // so if we verify it 40 times, it should approximate verifying a 70 account multiproof.
  let result: i32;
  for (let i = 0; i < 1; i++) {
    result = verifyProof(wantHash, key_path, proof_decoded, hashOutputPtr, hashOutput);
  }

  //return 1;
  savePostStateRoot(result);
  return result;
} // end mpt_verify()



/** Decoding the account leaf node:
* input rlp: f86b9f200cd89ae762119fed6ecd8dc969077bb2d6a3471c639a10e710a9374a121db849f8478083ffffffa056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a0c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
* output: got decoded rlp: [ <Buffer 20 0c d8 9a e7 62 11 9f ed 6e cd 8d c9 69 07 7b b2 d6 a3 47 1c 63 9a 10 e7 10 a9 37 4a 12 1d>,
*<Buffer f8 47 80 83 ff ff ff a0 56 e8 1f 17 1b cc 55 a6 ff 83 45 e6 92 c0 f8 6e 5b 48 e0 1b 99 6c ad c0 01 62 2f b5 e3 63 b4 21 a0 c5 d2 46 01 86 f7 23 3c 92 ... 23 more bytes> ]
*/


// verifyProof in ethereumjs/merkle-patricia-trie returns the account leaf value (0xf8478083ffff...), we do the same here (a Uint8Array)
// the pre-state root is passed in as the wantHash
//function verifyProof(wantHash: Uint64Array, key_path: Array<u8>, proof_decoded: RLPData): Uint8Array {
//function verifyProof(wantHash: Uint64Array, key_path: Array<u8>, proof_decoded: RLPData): i32 {

// quick hack to get access to global keccak vars is to pass them in
function verifyProof(wantHash: Uint64Array, key_path: Array<u8>, proof_decoded: RLPData,
                    hashOutputPtr: usize, hashOutput: Uint64Array): i32 {

  let kp_i = 0;

  // Main Loop. process each node in the proof starting from the root node, down to the leaf
  for (let i = 0; i < proof_decoded.children.length; i++) {
    //sayHello(55555);
    //sayHello(i);

    // hash the node and check it against wantHash
    // reuse the same context, and same output
    //keccak(keccakCtxBuf, proof_decoded.children[i].buffer.dataStart, proof_decoded.children[i].buffer.length, hashOutputPtr);
    ethash_keccak256(hashOutputPtr, proof_decoded.children[i].buffer.dataStart, proof_decoded.children[i].buffer.length);
    //debug(hashOutputPtr);

    //debug(wantHash.dataStart);
    //debug(wantHash.length);
    //debug(changetype<usize>(root_hash));
    //debug(changetype<usize>(root_hash_data.buffer));

    // TODO: make helper for hash comparison, and use @inline
    if (  (wantHash[0] != hashOutput[0])
        || (wantHash[1] != hashOutput[1])
        || (wantHash[2] != hashOutput[2])
        || (wantHash[3] != hashOutput[3]) ) {
      //sayHello(696969);
      throw new Error('hashes dont match!');
    }

    // RLP decode the trie node
    let node_decoded = decode(proof_decoded.children[i].buffer);
    let node_type = getNodeType(node_decoded.children);

    //sayHello(node_decoded.children.length);
    //sayHello(54321);

    // NEXT STEP. use key_path[kp_i] to get the next wantHash
    if (node_type == NodeType.Branch) {
      var next_in_path = node_decoded.children[key_path[kp_i]];
      kp_i = kp_i + 1;

      // TODO: if key.length === 0 throw

      if (next_in_path.children.length == 2) {
        throw new Error('TODO: handle embedded node');
      }

      //sayHello(121212);
      //debug(next_in_path.buffer.dataStart);

      //wantHash = next_in_path.buffer;
      //next_in_path.buffer.byteOffset
      wantHash = Uint64Array.wrap(next_in_path.buffer.buffer, next_in_path.buffer.byteOffset, 4);
      //debug(wantHash.dataStart);

    } // end branch case


    if (node_type == NodeType.Leaf) {
      //sayHello(131313);
      // TODO: extension node handled here too

      // step 1. check that the node's key matches the path key

      let node_key = node_decoded.children[0];
      let node_value = node_decoded.children[1];

      //debug(1311);
      //debug(node_key.buffer.dataStart);
      /// node_key.buffer 200cd89ae762119fed6ecd8dc969077bb2d6a3471c639a10e710a9374a121db8

      // key: 2         25b40cd89ae762119fed6ecd8dc969077bb2d6a3471c639a10e710a9374a121d

      // node_key needs to become an array of nibbles
      let node_key_nibs = uintArrToNibbleArr(node_key.buffer);
      node_key_nibs = removeHexPrefix(node_key_nibs);

      let sliced_path_for_nibble_matching = key_path.slice(kp_i);
      //debug(1212);
      let match_len = matchingNibbleLength(node_key_nibs, sliced_path_for_nibble_matching);
      //debug(match_len);

      if (match_len !== node_key_nibs.length) {
        //sayHello(1393939);
        throw new Error('Key does not match with the proof one (extention|leaf)');
      }

      // TODO: should increment kp_i here?
      // in the current test vector, the leaf case is terminal so it doesn't matter
      // kp_i = kp_i + node_key_nibs.length;

      //debug(kp_i);
      //debug(key_path.length);
      //debug(sliced_path.length);

      // TODO: we need another slice of the key_path
      let sliced_path_for_length_check = sliced_path_for_nibble_matching.slice(node_key_nibs.length);

      if (sliced_path_for_length_check.length == 0) { // TODO: check this == 0
        //sayHello(141414);
        if (node_value.buffer.length == 17) {
          throw new Error('TODO: handle embedded branch');
        }
        // TODO check that this is the last node in the proof
        // i !== proof.length - 1

        //sayHello(6969696);
        //debug(node_value.buffer.dataStart);
        return node_value.buffer.dataStart;

      }

      //sayHello(151515);
      //debug(node_value.buffer.dataStart);

      //next_in_path.buffer.byteOffset
      wantHash = Uint64Array.wrap(node_value.buffer.buffer, node_value.buffer.byteOffset, 4);
      //debug(wantHash.dataStart);
    } // end leaf case


  } // close for loop


  return 123;

}






enum NodeType {
  Branch,
  Leaf,
  Extension,
  Err
}


function getNodeType(node_data: RLPData[]): NodeType {
  //sayHello(789);
  //sayHello(node_data.length);
  if (node_data.length == 17) {
    //sayHello(171717);
    return NodeType.Branch;
  } else if (node_data.length == 2) {
    // first nibble of the key is a node type indicator
    let key = node_data[0];

    // key is an RLPData type, so key.buffer is a Uint8Array
    // Get the first byte of a Uint8Array with uint_arr[0]
    let bkey = i32(key.buffer[0]);
    // we only need to check the first nibble here
    let first_nibble = bkey >> 4;
    // second nibble = bkey % 16;

    // if isTerminator(key)
    if (first_nibble > 1) {
      //sayHello(3333);
      return NodeType.Leaf;
    }

    return NodeType.Extension;
  }

  //sayHello(66666);
  return NodeType.Err;
}


function matchingNibbleLength(nib1: Array<u8>, nib2: Array<u8>): i32 {
  //debug(1231);

  var i = 0;
  for (; i < nib1.length; i++) {
    //debug(i);
    //debug(nib1[i]);
    //debug(nib2[i]);

    if (nib1[i] != nib2[i]) {
      break;
    }
    i = i + 1;
  }

  //debug(i);
  //debug(1241);
  return i;
}


function removeHexPrefix(nib_arr: Array<u8>): Array<u8> {
  // the hex prefix is merkle-patricia-trie encoding, not RLP
  if (nib_arr[0] % 2) {
    return nib_arr.slice(1);
  } else {
    return nib_arr.slice(2);
  }
}

function uintArrToNibbleArr(uint_arr: Uint8Array): Array<u8> {
  var len = uint_arr.length;

  var nib_arr = Array.create<u8>(len * 2); // length is num of hex chars for address_hash
  // TODO: we might not need to convert the whole thing to nibbles, just enough chars to follow the path to the proof

  let q = 0;
  for (let i = 0; i < len; i++) {
    q = i * 2;
    nib_arr[q] = uint_arr[i] >> 4;
    q = q + 1;
    nib_arr[q] = uint_arr[i] % 16;
  }

  return nib_arr;
}

