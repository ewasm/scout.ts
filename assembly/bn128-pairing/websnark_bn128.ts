

/**
* to call a wasm function defined outside of AS from within AS, I guess
* we have declare it as an import. the function won't actually be an imported
* host function, because in gulpfile.js we splice the wat code and paste module-funcs.wat
* into the AssemblyScript output main.wat.
* then the external function will be declared twice (once as an import statement
* generated by AS, and a second time as the function def/wat code pasted in).
* so to make it valid again, gulpfile.js will find and delete the import statement
* put there by AS.
*/


bn128_g1m_toMontgomery, bn128_g2m_toMontgomery, bn128_g1m_neg, bn128_ftm_one, bn128_pairingEq2

//   (func $g1m_toMontgomery (export "g1m_toMontgomery")  (param $p0 i32) (param $p1 i32)
@external("watimports", "$g1m_toMontgomery")
export declare function bn128_g1m_toMontgomery(input: i32, output: i32): void;

//   (func $g2m_toMontgomery (export "g2m_toMontgomery")  (param $p0 i32) (param $p1 i32)
@external("watimports", "$g2m_toMontgomery")
export declare function bn128_g2m_toMontgomery(input: i32, output: i32): void;

//  (func $g1m_neg (export "g1m_neg") (type $t0) (param $p0 i32) (param $p1 i32)
@external("watimports", "$g1m_neg")
export declare function bn128_g1m_neg(input: i32, output: i32): void;

//   (func $ftm_one (export "ftm_one") (type $t1) (param $p0 i32)
@external("watimports", "$ftm_one")
export declare function bn128_ftm_one(p0: i32): void;

//   (func $bn128_pairingEq2 (export "bn128_pairingEq2") (type $t10) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32) (param $p4 i32) (result i32)
@external("watimports", "$bn128_pairingEq2")
export declare function bn128_pairingEq2(p0: i32, p1: i32, p2: i32, p3: i32, p4: i32): i32;

@external("watimports", "$bn128_pairingEq4")
export declare function bn128_pairingEq4(p0: i32, p1: i32, p2: i32, p3: i32, p4: i32, p5: i32, p6: i32, p7: i32, p8: i32): i32;

@external("watimports", "$bn128_g1m_timesScalar")
export  declare function bn128_g1m_timesScalar(p0: i32, p1: i32, p2: i32, p3: i32): void;

@external("watimports", "$bn128_g1m_add")
export declare function bn128_g1m_add(p0: i32, p1: i32, p2: i32): void;

@external("watimports", "$bn128_g1m_affine")
export declare function bn128_g1m_affine(p0: i32, p1: i32): void;

// This line causes a bug with the asc compiler
// @external("watimports", "$int_gte")
// export declare function int_gte(p0: i32, p1: i32): void;