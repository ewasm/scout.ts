;;(module
;;  (type $t0 (func (param i32 i32)))
;;  (type $t1 (func (result i32)))
;;  (type $t2 (func (param i32 i32 i32)))
;;  (type $t3 (func (param i32)))
;;  (type $t4 (func))
;;  (type $t5 (func (param i32 i32) (result i32)))
;;  (type $t6 (func (param i32) (result i32)))
;;  (type $t7 (func (param i32) (result i64)))
;;  (type $t8 (func (param i32 i32 i32) (result i32)))
;;  (import "env" "eth2_blockDataSize" (func $eth2_blockDataSize ))
;;  (import "env" "eth2_blockDataCopy" (func $eth2_blockDataCopy ))
;;  (import "env" "eth2_savePostStateRoot" (func $eth2_savePostStateRoot ))
  (func $keccak/keccakMain (export "keccakMain")  (param $p0 i32) (param $p1 i32) (param $p2 i32)
    (call $_ZN11tiny_keccak6Keccak9keccak25617h98182a2aac63aac3E
      (local.get $p0)
      (local.get $p1)
      (local.get $p2)))
  (func $_ZN11tiny_keccak6Keccak9keccak25617h98182a2aac63aac3E  (param $p0 i32) (param $p1 i32) (param $p2 i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32)
    (global.set $tinykeccak_g0
      (local.tee $l3
        (i32.sub
          (global.get $tinykeccak_g0)
          (i32.const 224))))
    (drop
      (call $tinykeccak_memset
        (i32.add
          (local.get $l3)
          (i32.const 8))
        (i32.const 0)
        (i32.const 204)))
    (i64.store align=4
      (i32.add
        (local.get $l3)
        (i32.const 20))
      (i64.load offset=12 align=1
        (local.get $p0)))
    (i64.store align=4
      (i32.add
        (local.get $l3)
        (i32.const 28))
      (i64.load offset=20 align=1
        (local.get $p0)))
    (i64.store align=4
      (i32.add
        (local.get $l3)
        (i32.const 36))
      (i64.load offset=28 align=1
        (local.get $p0)))
    (i32.store
      (i32.add
        (local.get $l3)
        (i32.const 44))
      (i32.load offset=36 align=1
        (local.get $p0)))
    (i32.store8
      (i32.add
        (local.get $l3)
        (i32.const 50))
      (i32.load8_u offset=42
        (local.get $p0)))
    (i32.store16 offset=216
      (local.get $l3)
      (i32.const 257))
    (local.set $l4
      (i32.const 136))
    (i32.store offset=212
      (local.get $l3)
      (i32.const 136))
    (i32.store offset=8
      (local.get $l3)
      (i32.load align=1
        (local.get $p0)))
    (i64.store offset=12 align=4
      (local.get $l3)
      (i64.load offset=4 align=1
        (local.get $p0)))
    (i32.store16 offset=48
      (local.get $l3)
      (i32.load16_u offset=40 align=1
        (local.get $p0)))
    (i32.store8
      (i32.add
        (local.get $l3)
        (i32.const 51))
      (i32.load8_u offset=43
        (local.get $p0)))
    (i32.store
      (i32.add
        (local.get $l3)
        (i32.const 52))
      (i32.load offset=44 align=1
        (local.get $p0)))
    (i32.store16
      (i32.add
        (local.get $l3)
        (i32.const 92))
      (i32.load16_u offset=84 align=1
        (local.get $p0)))
    (i32.store8
      (i32.add
        (local.get $l3)
        (i32.const 94))
      (i32.load8_u offset=86
        (local.get $p0)))
    (i64.store offset=56
      (local.get $l3)
      (i64.load offset=48 align=1
        (local.get $p0)))
    (i64.store offset=64
      (local.get $l3)
      (i64.load offset=56 align=1
        (local.get $p0)))
    (i64.store offset=72
      (local.get $l3)
      (i64.load offset=64 align=1
        (local.get $p0)))
    (i64.store offset=80
      (local.get $l3)
      (i64.load offset=72 align=1
        (local.get $p0)))
    (i32.store offset=88
      (local.get $l3)
      (i32.load offset=80 align=1
        (local.get $p0)))
    (i32.store8
      (i32.add
        (local.get $l3)
        (i32.const 95))
      (i32.load8_u offset=87
        (local.get $p0)))
    (i64.store align=4
      (i32.add
        (local.get $l3)
        (i32.const 100))
      (i64.load offset=92 align=1
        (local.get $p0)))
    (i64.store align=4
      (i32.add
        (local.get $l3)
        (i32.const 108))
      (i64.load offset=100 align=1
        (local.get $p0)))
    (i64.store align=4
      (i32.add
        (local.get $l3)
        (i32.const 116))
      (i64.load offset=108 align=1
        (local.get $p0)))
    (i64.store align=4
      (i32.add
        (local.get $l3)
        (i32.const 124))
      (i64.load offset=116 align=1
        (local.get $p0)))
    (i32.store
      (i32.add
        (local.get $l3)
        (i32.const 132))
      (i32.load offset=124 align=1
        (local.get $p0)))
    (i32.store8
      (i32.add
        (local.get $l3)
        (i32.const 138))
      (i32.load8_u offset=130
        (local.get $p0)))
    (i32.store offset=96
      (local.get $l3)
      (i32.load offset=88 align=1
        (local.get $p0)))
    (i32.store16 offset=136
      (local.get $l3)
      (i32.load16_u offset=128 align=1
        (local.get $p0)))
    (i32.store8
      (i32.add
        (local.get $l3)
        (i32.const 139))
      (i32.load8_u offset=131
        (local.get $p0)))
    (i32.store8
      (i32.add
        (local.get $l3)
        (i32.const 140))
      (i32.load8_u offset=132
        (local.get $p0)))
    (i32.store8
      (i32.add
        (local.get $l3)
        (i32.const 141))
      (i32.load8_u offset=133
        (local.get $p0)))
    (i32.store8
      (i32.add
        (local.get $l3)
        (i32.const 142))
      (i32.load8_u offset=134
        (local.get $p0)))
    (i32.store8
      (i32.add
        (i32.add
          (local.get $l3)
          (i32.const 8))
        (i32.const 135))
      (i32.load8_u offset=135
        (local.get $p0)))
    (i32.store offset=208
      (local.get $l3)
      (local.get $p1))
    (block $B0
      (block $B1
        (block $B2
          (block $B3
            (br_if $B3
              (i32.gt_u
                (local.get $p1)
                (i32.const 135)))
            (local.set $l5
              (i32.add
                (local.get $l3)
                (i32.const 8)))
            (local.set $l6
              (local.get $p1))
            (br $B2))
          (i32.store8 offset=216
            (local.get $l3)
            (i32.const 0))
          (call $_ZN11tiny_keccak7keccakf17h647c386047eb024aE
            (i32.add
              (local.get $l3)
              (i32.const 8)))
          (block $B4
            (br_if $B4
              (i32.lt_u
                (local.tee $l6
                  (i32.add
                    (local.get $p1)
                    (i32.const -136)))
                (local.tee $l7
                  (i32.load offset=212
                    (local.get $l3)))))
            (local.set $l4
              (i32.const 136))
            (loop $L5
              (br_if $B1
                (i32.ge_u
                  (local.get $l4)
                  (local.get $p1)))
              (block $B6
                (br_if $B6
                  (i32.eqz
                    (local.get $l7)))
                (local.set $l8
                  (i32.add
                    (local.get $p0)
                    (local.get $l4)))
                (local.set $l5
                  (i32.add
                    (local.get $l3)
                    (i32.const 8)))
                (local.set $l9
                  (local.get $l7))
                (loop $L7
                  (i32.store8
                    (local.get $l5)
                    (i32.xor
                      (i32.load8_u
                        (local.get $l5))
                      (i32.load8_u
                        (local.get $l8))))
                  (local.set $l5
                    (i32.add
                      (local.get $l5)
                      (i32.const 1)))
                  (local.set $l8
                    (i32.add
                      (local.get $l8)
                      (i32.const 1)))
                  (br_if $L7
                    (local.tee $l9
                      (i32.add
                        (local.get $l9)
                        (i32.const -1))))))
              (local.set $l4
                (i32.add
                  (local.get $l7)
                  (local.get $l4)))
              (call $_ZN11tiny_keccak7keccakf17h647c386047eb024aE
                (i32.add
                  (local.get $l3)
                  (i32.const 8)))
              (br_if $L5
                (i32.ge_u
                  (local.tee $l6
                    (i32.sub
                      (local.get $l6)
                      (local.get $l7)))
                  (local.tee $l7
                    (i32.load offset=212
                      (local.get $l3)))))))
          (br_if $B0
            (i32.ge_u
              (local.get $l4)
              (local.get $p1)))
          (block $B8
            (br_if $B8
              (i32.eqz
                (local.get $l6)))
            (local.set $l8
              (i32.add
                (local.get $p0)
                (local.get $l4)))
            (local.set $l5
              (i32.add
                (local.get $l3)
                (i32.const 8)))
            (local.set $l9
              (local.get $l6))
            (loop $L9
              (i32.store8
                (local.get $l5)
                (i32.xor
                  (i32.load8_u
                    (local.get $l5))
                  (i32.load8_u
                    (local.get $l8))))
              (local.set $l5
                (i32.add
                  (local.get $l5)
                  (i32.const 1)))
              (local.set $l8
                (i32.add
                  (local.get $l8)
                  (i32.const 1)))
              (br_if $L9
                (local.tee $l9
                  (i32.add
                    (local.get $l9)
                    (i32.const -1))))))
          (i32.store offset=208
            (local.get $l3)
            (local.get $l6))
          (local.set $l5
            (i32.add
              (local.get $l3)
              (i32.const 8))))
        (i32.store8
          (local.tee $l8
            (i32.add
              (i32.add
                (local.get $l3)
                (i32.const 8))
              (local.get $l6)))
          (i32.xor
            (i32.load8_u
              (local.get $l8))
            (i32.load8_u offset=217
              (local.get $l3))))
        (i32.store8 offset=143
          (local.get $l3)
          (i32.xor
            (i32.load8_u offset=143
              (local.get $l3))
            (i32.const 128)))
        (call $_ZN11tiny_keccak7keccakf17h647c386047eb024aE
          (local.get $l5))
        (i64.store
          (i32.add
            (local.get $p2)
            (i32.const 24))
          (i64.load
            (i32.add
              (i32.add
                (local.get $l3)
                (i32.const 8))
              (i32.const 24))))
        (i64.store
          (i32.add
            (local.get $p2)
            (i32.const 16))
          (i64.load
            (i32.add
              (i32.add
                (local.get $l3)
                (i32.const 8))
              (i32.const 16))))
        (i64.store
          (i32.add
            (local.get $p2)
            (i32.const 8))
          (i64.load
            (i32.add
              (i32.add
                (local.get $l3)
                (i32.const 8))
              (i32.const 8))))
        (i64.store
          (local.get $p2)
          (i64.load offset=8
            (local.get $l3)))
        (global.set $tinykeccak_g0
          (i32.add
            (local.get $l3)
            (i32.const 224)))
        (return))
      (call $_ZN4core9panicking5panic17hf6893ada3b8c575bE
        (i32.const 8472))
      (unreachable))
    (call $_ZN4core9panicking5panic17hf6893ada3b8c575bE
      (i32.const 8496))
    (unreachable))

;;  (func $main (export "main") 
;;    (local $l0 i32) (local $l1 i32) (local $l2 i32) (local $l3 i32)
;;    (global.set $tinykeccak_g0
;;      (local.tee $l0
;;        (i32.sub
;;          (global.get $tinykeccak_g0)
;;          (i32.const 32))))
;;    (i64.store
;;      (i32.add
;;        (local.get $l0)
;;        (i32.const 24))
;;      (i64.const 0))
;;    (i64.store
;;      (i32.add
;;        (local.get $l0)
;;        (i32.const 16))
;;      (i64.const 0))
;;    (i64.store
;;      (i32.add
;;        (local.get $l0)
;;        (i32.const 8))
;;      (i64.const 0))
;;    (i64.store
;;      (local.get $l0)
;;      (i64.const 0))
;;    (local.set $l1
;;      (call $eth2_blockDataSize))
;;    (block $B0
;;      (block $B1
;;        (br_if $B1
;;          (i32.le_s
;;            (local.tee $l2
;;              (call $eth2_blockDataSize))
;;            (i32.const -1)))
;;        (block $B2
;;          (block $B3
;;            (br_if $B3
;;              (local.get $l2))
;;            (local.set $l3
;;              (i32.const 1))
;;            (br $B2))
;;          (br_if $B0
;;            (i32.eqz
;;              (local.tee $l3
;;                (call $__rust_alloc
;;                  (local.get $l2)
;;                  (i32.const 1))))))
;;        (call $eth2_blockDataCopy
;;          (local.get $l3)
;;          (i32.const 0)
;;          (local.get $l2))
;;        (call $_ZN11tiny_keccak6Keccak9keccak25617h98182a2aac63aac3E
;;          (local.get $l3)
;;          (local.get $l1)
;;          (local.get $l0))
;;        (call $eth2_savePostStateRoot
;;          (local.get $l0))
;;        (global.set $tinykeccak_g0
;;          (i32.add
;;            (local.get $l0)
;;            (i32.const 32)))
;;        (return))
;;      (call $_ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$11allocate_in28_$u7b$$u7b$closure$u7d$$u7d$17h9a1ceb65ddcbacd6E.llvm.10122565713108729420)
;;      (unreachable))
;;    (call_indirect  $T0
;;      (local.get $l2)
;;      (i32.const 1)
;;      (select
;;        (local.tee $l0
;;          (i32.load offset=8212
;;            (i32.const 0)))
;;        (i32.const 1)
;;        (local.get $l0)))
;;    (unreachable)
;;    (unreachable))

  (func $__rust_alloc  (param $p0 i32) (param $p1 i32) (result i32)
    (call $__rg_alloc
      (local.get $p0)
      (local.get $p1)))
  (func $_ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$11allocate_in28_$u7b$$u7b$closure$u7d$$u7d$17h9a1ceb65ddcbacd6E.llvm.10122565713108729420 
    (call $_ZN5alloc7raw_vec17capacity_overflow17h16df9fe99dbac830E)
    (unreachable))
  (func $_ZN3std5alloc24default_alloc_error_hook17hb13db55d969cf9ecE  (param $p0 i32) (param $p1 i32))
  (func $_ZN5alloc7raw_vec17capacity_overflow17h16df9fe99dbac830E 
    (call $_ZN4core9panicking5panic17hf6893ada3b8c575bE
      (i32.const 8216))
    (unreachable))
  (func $__rg_alloc  (param $p0 i32) (param $p1 i32) (result i32)
    (local $l2 i32) (local $l3 i32) (local $l4 i32)
    (local.set $l2
      (i32.const 0))
    (block $B0
      (br_if $B0
        (i32.eqz
          (local.get $p0)))
      (br_if $B0
        (i32.eqz
          (local.get $p1)))
      (local.set $p1
        (i32.add
          (select
            (i32.sub
              (local.get $p1)
              (local.tee $l2
                (i32.rem_u
                  (local.get $p0)
                  (local.get $p1))))
            (i32.const 0)
            (local.get $l2))
          (local.get $p0)))
      (local.set $l2
        (i32.shl
          (local.tee $l3
            (memory.size))
          (i32.const 16)))
      (block $B1
        (br_if $B1
          (local.tee $p0
            (i32.load offset=8192
              (i32.const 0))))
        (i32.store offset=8192
          (i32.const 0)
          (local.get $l2))
        (local.set $p0
          (local.get $l2)))
      (block $B2
        (br_if $B2
          (i32.le_u
            (local.tee $p1
              (i32.add
                (local.get $p1)
                (local.get $p0)))
            (local.get $l2)))
        (local.set $l2
          (i32.const 0))
        (br_if $B0
          (i32.eq
            (memory.grow
              (i32.sub
                (i32.shr_u
                  (i32.add
                    (select
                      (i32.sub
                        (i32.const 65536)
                        (local.tee $l4
                          (i32.and
                            (local.get $p1)
                            (i32.const 65535))))
                      (i32.const 0)
                      (local.get $l4))
                    (local.get $p1))
                  (i32.const 16))
                (local.get $l3)))
            (i32.const -1))))
      (i32.store offset=8192
        (i32.const 0)
        (local.get $p1))
      (local.set $l2
        (local.get $p0)))
    (local.get $l2))
  (func $_ZN3std9panicking20rust_panic_with_hook17hf7e8b2da7ed58045E  (param $p0 i32)
    (local $l1 i32) (local $l2 i32)
    (local.set $l1
      (i32.const 1))
    (block $B0
      (block $B1
        (block $B2
          (br_if $B2
            (i32.eq
              (i32.load offset=8200
                (i32.const 0))
              (i32.const 1)))
          (i64.store offset=8200
            (i32.const 0)
            (i64.const 4294967297))
          (br $B1))
        (i32.store offset=8204
          (i32.const 0)
          (local.tee $l1
            (i32.add
              (i32.load offset=8204
                (i32.const 0))
              (i32.const 1))))
        (br_if $B0
          (i32.gt_u
            (local.get $l1)
            (i32.const 2))))
      (br_if $B0
        (i32.le_s
          (local.tee $l2
            (i32.load offset=8208
              (i32.const 0)))
          (i32.const -1)))
      (i32.store offset=8208
        (i32.const 0)
        (local.get $l2))
      (br_if $B0
        (i32.gt_u
          (local.get $l1)
          (i32.const 1)))
      (call $rust_panic)
      (unreachable))
    (unreachable)
    (unreachable))
  (func $rust_panic 
    (unreachable)
    (unreachable))
  (func $_ZN3std9panicking18continue_panic_fmt17h5519dc854fac25aeE  (param $p0 i32)
    (local $l1 i32)
    (global.set $tinykeccak_g0
      (local.tee $l1
        (i32.sub
          (global.get $tinykeccak_g0)
          (i32.const 16))))
    (drop
      (call $_ZN4core6option15Option$LT$T$GT$6unwrap17ha2b11047cab166abE
        (i32.load offset=8
          (local.get $p0))))
    (i64.store offset=8
      (local.get $l1)
      (i64.load align=4
        (i32.add
          (local.get $p0)
          (i32.const 20))))
    (i64.store
      (local.get $l1)
      (i64.load offset=12 align=4
        (local.get $p0)))
    (call $_ZN3std9panicking20rust_panic_with_hook17hf7e8b2da7ed58045E
      (local.get $l1))
    (unreachable))
  (func $_ZN4core6option15Option$LT$T$GT$6unwrap17ha2b11047cab166abE  (param $p0 i32) (result i32)
    (block $B0
      (br_if $B0
        (local.get $p0))
      (call $_ZN4core9panicking5panic17hf6893ada3b8c575bE
        (i32.const 8652))
      (unreachable))
    (local.get $p0))
  (func $_ZN4core9panicking5panic17hf6893ada3b8c575bE  (param $p0 i32)
    (local $l1 i32) (local $l2 i64) (local $l3 i64) (local $l4 i64)
    (global.set $tinykeccak_g0
      (local.tee $l1
        (i32.sub
          (global.get $tinykeccak_g0)
          (i32.const 48))))
    (local.set $l2
      (i64.load offset=8 align=4
        (local.get $p0)))
    (local.set $l3
      (i64.load offset=16 align=4
        (local.get $p0)))
    (local.set $l4
      (i64.load align=4
        (local.get $p0)))
    (i32.store
      (i32.add
        (local.get $l1)
        (i32.const 20))
      (i32.const 0))
    (i32.store offset=16
      (local.get $l1)
      (i32.const 8636))
    (i64.store offset=4 align=4
      (local.get $l1)
      (i64.const 1))
    (i64.store offset=24
      (local.get $l1)
      (local.get $l4))
    (i32.store
      (local.get $l1)
      (i32.add
        (local.get $l1)
        (i32.const 24)))
    (i64.store offset=40
      (local.get $l1)
      (local.get $l3))
    (i64.store offset=32
      (local.get $l1)
      (local.get $l2))
    (call $_ZN4core9panicking9panic_fmt17h581f7a1e5499d350E
      (local.get $l1)
      (i32.add
        (local.get $l1)
        (i32.const 32)))
    (unreachable))
  (func $rust_begin_unwind  (param $p0 i32)
    (call $_ZN3std9panicking18continue_panic_fmt17h5519dc854fac25aeE
      (local.get $p0))
    (unreachable))
  (func $_ZN11tiny_keccak7keccakf17h647c386047eb024aE  (param $p0 i32)
    (local $l1 i64) (local $l2 i64) (local $l3 i64) (local $l4 i64) (local $l5 i64) (local $l6 i64) (local $l7 i64) (local $l8 i64) (local $l9 i64) (local $l10 i64) (local $l11 i64) (local $l12 i64) (local $l13 i64) (local $l14 i64) (local $l15 i64) (local $l16 i64) (local $l17 i64) (local $l18 i64) (local $l19 i64) (local $l20 i64) (local $l21 i64) (local $l22 i64) (local $l23 i64) (local $l24 i64) (local $l25 i64) (local $l26 i32) (local $l27 i32) (local $l28 i64) (local $l29 i64) (local $l30 i64) (local $l31 i64) (local $l32 i64) (local $l33 i64) (local $l34 i64) (local $l35 i64) (local $l36 i64) (local $l37 i64) (local $l38 i64) (local $l39 i64) (local $l40 i64) (local $l41 i64) (local $l42 i64) (local $l43 i64) (local $l44 i64) (local $l45 i64)
    (local.set $l1
      (i64.load offset=192
        (local.get $p0)))
    (local.set $l2
      (i64.load offset=184
        (local.get $p0)))
    (local.set $l3
      (i64.load offset=176
        (local.get $p0)))
    (local.set $l4
      (i64.load offset=168
        (local.get $p0)))
    (local.set $l5
      (i64.load offset=160
        (local.get $p0)))
    (local.set $l6
      (i64.load offset=152
        (local.get $p0)))
    (local.set $l7
      (i64.load offset=144
        (local.get $p0)))
    (local.set $l8
      (i64.load offset=136
        (local.get $p0)))
    (local.set $l9
      (i64.load offset=128
        (local.get $p0)))
    (local.set $l10
      (i64.load offset=120
        (local.get $p0)))
    (local.set $l11
      (i64.load offset=112
        (local.get $p0)))
    (local.set $l12
      (i64.load offset=104
        (local.get $p0)))
    (local.set $l13
      (i64.load offset=96
        (local.get $p0)))
    (local.set $l14
      (i64.load offset=88
        (local.get $p0)))
    (local.set $l15
      (i64.load offset=80
        (local.get $p0)))
    (local.set $l16
      (i64.load offset=72
        (local.get $p0)))
    (local.set $l17
      (i64.load offset=64
        (local.get $p0)))
    (local.set $l18
      (i64.load offset=56
        (local.get $p0)))
    (local.set $l19
      (i64.load offset=48
        (local.get $p0)))
    (local.set $l20
      (i64.load offset=40
        (local.get $p0)))
    (local.set $l21
      (i64.load offset=32
        (local.get $p0)))
    (local.set $l22
      (i64.load offset=24
        (local.get $p0)))
    (local.set $l23
      (i64.load offset=16
        (local.get $p0)))
    (local.set $l24
      (i64.load offset=8
        (local.get $p0)))
    (local.set $l25
      (i64.load
        (local.get $p0)))
    (local.set $l26
      (i32.const 0))
    (local.set $l27
      (i32.const 8280))
    (loop $L0
      (local.set $l21
        (i64.xor
          (i64.and
            (local.tee $l25
              (i64.rotl
                (i64.xor
                  (local.tee $l30
                    (i64.xor
                      (i64.rotl
                        (local.tee $l40
                          (i64.xor
                            (i64.xor
                              (i64.xor
                                (i64.xor
                                  (local.tee $l36
                                    (i64.xor
                                      (i64.and
                                        (local.tee $l31
                                          (i64.rotl
                                            (i64.xor
                                              (local.tee $l30
                                                (i64.xor
                                                  (i64.rotl
                                                    (local.tee $l28
                                                      (i64.xor
                                                        (i64.xor
                                                          (i64.xor
                                                            (i64.xor
                                                              (local.get $l17)
                                                              (local.get $l22))
                                                            (local.get $l12))
                                                          (local.get $l7))
                                                        (local.get $l2)))
                                                    (i64.const 1))
                                                  (local.tee $l29
                                                    (i64.xor
                                                      (i64.xor
                                                        (i64.xor
                                                          (i64.xor
                                                            (local.get $l19)
                                                            (local.get $l24))
                                                          (local.get $l14))
                                                        (local.get $l9))
                                                      (local.get $l4)))))
                                              (local.get $l3))
                                            (i64.const 61)))
                                        (i64.xor
                                          (local.tee $l3
                                            (i64.rotl
                                              (i64.xor
                                                (local.tee $l34
                                                  (i64.xor
                                                    (i64.rotl
                                                      (local.tee $l32
                                                        (i64.xor
                                                          (i64.xor
                                                            (i64.xor
                                                              (i64.xor
                                                                (local.get $l18)
                                                                (local.get $l23))
                                                              (local.get $l13))
                                                            (local.get $l8))
                                                          (local.get $l3)))
                                                      (i64.const 1))
                                                    (local.tee $l33
                                                      (i64.xor
                                                        (i64.xor
                                                          (i64.xor
                                                            (i64.xor
                                                              (local.get $l20)
                                                              (local.get $l25))
                                                            (local.get $l15))
                                                          (local.get $l10))
                                                        (local.get $l5)))))
                                                (local.get $l9))
                                              (i64.const 45)))
                                          (i64.const -1)))
                                      (local.tee $l9
                                        (i64.rotl
                                          (i64.xor
                                            (local.tee $l29
                                              (i64.xor
                                                (local.tee $l35
                                                  (i64.xor
                                                    (i64.xor
                                                      (i64.xor
                                                        (i64.xor
                                                          (local.get $l16)
                                                          (local.get $l21))
                                                        (local.get $l11))
                                                      (local.get $l6))
                                                    (local.get $l1)))
                                                (i64.rotl
                                                  (local.get $l29)
                                                  (i64.const 1))))
                                            (local.get $l15))
                                          (i64.const 3)))))
                                  (local.tee $l37
                                    (i64.xor
                                      (i64.and
                                        (local.tee $l4
                                          (i64.rotl
                                            (i64.xor
                                              (local.get $l34)
                                              (local.get $l4))
                                            (i64.const 2)))
                                        (i64.xor
                                          (local.tee $l10
                                            (i64.rotl
                                              (i64.xor
                                                (local.get $l29)
                                                (local.get $l10))
                                              (i64.const 41)))
                                          (i64.const -1)))
                                      (local.tee $l11
                                        (i64.rotl
                                          (i64.xor
                                            (local.tee $l28
                                              (i64.xor
                                                (local.get $l28)
                                                (i64.rotl
                                                  (local.get $l33)
                                                  (i64.const 1))))
                                            (local.get $l11))
                                          (i64.const 39))))))
                                (local.tee $l35
                                  (i64.xor
                                    (local.tee $l12
                                      (i64.rotl
                                        (i64.xor
                                          (local.tee $l32
                                            (i64.xor
                                              (i64.rotl
                                                (local.get $l35)
                                                (i64.const 1))
                                              (local.get $l32)))
                                          (local.get $l12))
                                        (i64.const 25)))
                                    (i64.and
                                      (local.tee $l5
                                        (i64.rotl
                                          (i64.xor
                                            (local.get $l29)
                                            (local.get $l5))
                                          (i64.const 18)))
                                      (i64.xor
                                        (local.tee $l6
                                          (i64.rotl
                                            (i64.xor
                                              (local.get $l28)
                                              (local.get $l6))
                                            (i64.const 8)))
                                        (i64.const -1))))))
                              (local.tee $l38
                                (i64.xor
                                  (i64.and
                                    (local.tee $l2
                                      (i64.rotl
                                        (i64.xor
                                          (local.get $l32)
                                          (local.get $l2))
                                        (i64.const 56)))
                                    (i64.xor
                                      (local.tee $l8
                                        (i64.rotl
                                          (i64.xor
                                            (local.get $l30)
                                            (local.get $l8))
                                          (i64.const 15)))
                                      (i64.const -1)))
                                  (local.tee $l14
                                    (i64.rotl
                                      (i64.xor
                                        (local.get $l34)
                                        (local.get $l14))
                                      (i64.const 10))))))
                            (local.tee $l39
                              (i64.xor
                                (i64.and
                                  (local.tee $l1
                                    (i64.rotl
                                      (i64.xor
                                        (local.get $l28)
                                        (local.get $l1))
                                      (i64.const 14)))
                                  (i64.xor
                                    (local.tee $l7
                                      (i64.rotl
                                        (i64.xor
                                          (local.get $l32)
                                          (local.get $l7))
                                        (i64.const 21)))
                                    (i64.const -1)))
                                (local.tee $l13
                                  (i64.rotl
                                    (i64.xor
                                      (local.get $l30)
                                      (local.get $l13))
                                    (i64.const 43)))))))
                        (i64.const 1))
                      (local.tee $l23
                        (i64.xor
                          (i64.xor
                            (i64.xor
                              (i64.xor
                                (local.tee $l22
                                  (i64.xor
                                    (local.tee $l15
                                      (i64.rotl
                                        (i64.xor
                                          (local.get $l32)
                                          (local.get $l22))
                                        (i64.const 28)))
                                    (i64.and
                                      (local.get $l9)
                                      (i64.xor
                                        (local.tee $l16
                                          (i64.rotl
                                            (i64.xor
                                              (local.get $l28)
                                              (local.get $l16))
                                            (i64.const 20)))
                                        (i64.const -1)))))
                                (local.tee $l41
                                  (i64.xor
                                    (i64.and
                                      (local.get $l14)
                                      (i64.xor
                                        (local.tee $l20
                                          (i64.rotl
                                            (i64.xor
                                              (local.get $l29)
                                              (local.get $l20))
                                            (i64.const 36)))
                                        (i64.const -1)))
                                    (local.tee $l28
                                      (i64.rotl
                                        (i64.xor
                                          (local.get $l28)
                                          (local.get $l21))
                                        (i64.const 27))))))
                              (local.tee $l24
                                (i64.xor
                                  (i64.and
                                    (local.get $l12)
                                    (i64.xor
                                      (local.tee $l18
                                        (i64.rotl
                                          (i64.xor
                                            (local.get $l30)
                                            (local.get $l18))
                                          (i64.const 6)))
                                      (i64.const -1)))
                                  (local.tee $l21
                                    (i64.rotl
                                      (i64.xor
                                        (local.get $l34)
                                        (local.get $l24))
                                      (i64.const 1))))))
                            (local.tee $l42
                              (i64.xor
                                (i64.and
                                  (local.get $l11)
                                  (i64.xor
                                    (local.tee $l32
                                      (i64.rotl
                                        (i64.xor
                                          (local.get $l32)
                                          (local.get $l17))
                                        (i64.const 55)))
                                    (i64.const -1)))
                                (local.tee $l17
                                  (i64.rotl
                                    (i64.xor
                                      (local.get $l30)
                                      (local.get $l23))
                                    (i64.const 62))))))
                          (local.tee $l19
                            (i64.xor
                              (i64.xor
                                (local.tee $l29
                                  (i64.xor
                                    (local.get $l29)
                                    (local.get $l25)))
                                (i64.load
                                  (local.get $l27)))
                              (i64.and
                                (local.get $l13)
                                (i64.xor
                                  (local.tee $l34
                                    (i64.rotl
                                      (i64.xor
                                        (local.get $l34)
                                        (local.get $l19))
                                      (i64.const 44)))
                                  (i64.const -1)))))))))
                  (local.tee $l9
                    (i64.xor
                      (i64.and
                        (local.get $l3)
                        (i64.xor
                          (local.get $l9)
                          (i64.const -1)))
                      (local.get $l16))))
                (i64.const 44)))
            (i64.xor
              (local.tee $l33
                (i64.xor
                  (local.tee $l34
                    (i64.xor
                      (i64.rotl
                        (local.tee $l11
                          (i64.xor
                            (i64.xor
                              (i64.xor
                                (i64.xor
                                  (local.tee $l43
                                    (i64.xor
                                      (i64.and
                                        (local.get $l8)
                                        (i64.xor
                                          (local.get $l14)
                                          (i64.const -1)))
                                      (local.get $l20)))
                                  (local.get $l9))
                                (local.tee $l9
                                  (i64.xor
                                    (local.get $l32)
                                    (i64.and
                                      (local.get $l10)
                                      (i64.xor
                                        (local.get $l11)
                                        (i64.const -1))))))
                              (local.tee $l13
                                (i64.xor
                                  (i64.and
                                    (local.get $l7)
                                    (i64.xor
                                      (local.get $l13)
                                      (i64.const -1)))
                                  (local.get $l34))))
                            (local.tee $l12
                              (i64.xor
                                (i64.and
                                  (local.get $l6)
                                  (i64.xor
                                    (local.get $l12)
                                    (i64.const -1)))
                                (local.get $l18)))))
                        (i64.const 1))
                      (local.tee $l16
                        (i64.xor
                          (i64.xor
                            (i64.xor
                              (i64.xor
                                (local.tee $l14
                                  (i64.xor
                                    (i64.and
                                      (local.get $l18)
                                      (i64.xor
                                        (local.get $l21)
                                        (i64.const -1)))
                                    (local.get $l5)))
                                (local.tee $l18
                                  (i64.xor
                                    (i64.and
                                      (local.get $l34)
                                      (i64.xor
                                        (local.get $l29)
                                        (i64.const -1)))
                                    (local.get $l1))))
                              (local.tee $l20
                                (i64.xor
                                  (local.get $l2)
                                  (i64.and
                                    (local.get $l20)
                                    (i64.xor
                                      (local.get $l28)
                                      (i64.const -1))))))
                            (local.tee $l32
                              (i64.xor
                                (i64.and
                                  (local.get $l32)
                                  (i64.xor
                                    (local.get $l17)
                                    (i64.const -1)))
                                (local.get $l4))))
                          (local.tee $l44
                            (i64.xor
                              (i64.and
                                (local.get $l16)
                                (i64.xor
                                  (local.get $l15)
                                  (i64.const -1)))
                              (local.get $l31)))))))
                  (local.get $l19)))
              (i64.const -1)))
          (local.tee $l23
            (i64.rotl
              (i64.xor
                (local.tee $l29
                  (i64.xor
                    (i64.rotl
                      (local.get $l23)
                      (i64.const 1))
                    (local.tee $l2
                      (i64.xor
                        (i64.xor
                          (i64.xor
                            (i64.xor
                              (local.tee $l17
                                (i64.xor
                                  (i64.and
                                    (local.get $l17)
                                    (i64.xor
                                      (local.get $l4)
                                      (i64.const -1)))
                                  (local.get $l10)))
                              (local.tee $l19
                                (i64.xor
                                  (i64.and
                                    (local.get $l21)
                                    (i64.xor
                                      (local.get $l5)
                                      (i64.const -1)))
                                  (local.get $l6))))
                            (local.tee $l45
                              (i64.xor
                                (local.get $l7)
                                (i64.and
                                  (local.get $l29)
                                  (i64.xor
                                    (local.get $l1)
                                    (i64.const -1))))))
                          (local.tee $l1
                            (i64.xor
                              (i64.and
                                (local.get $l15)
                                (i64.xor
                                  (local.get $l31)
                                  (i64.const -1)))
                              (local.get $l3))))
                        (local.tee $l31
                          (i64.xor
                            (i64.and
                              (local.get $l28)
                              (i64.xor
                                (local.get $l2)
                                (i64.const -1)))
                            (local.get $l8)))))))
                (local.get $l32))
              (i64.const 14)))))
      (local.set $l1
        (i64.xor
          (i64.and
            (local.tee $l5
              (i64.rotl
                (i64.xor
                  (local.tee $l28
                    (i64.xor
                      (i64.rotl
                        (local.get $l16)
                        (i64.const 1))
                      (local.get $l40)))
                  (local.get $l1))
                (i64.const 55)))
            (i64.xor
              (local.tee $l6
                (i64.rotl
                  (i64.xor
                    (local.tee $l32
                      (i64.xor
                        (i64.rotl
                          (local.get $l2)
                          (i64.const 1))
                        (local.get $l11)))
                    (local.get $l39))
                  (i64.const 62)))
              (i64.const -1)))
          (local.tee $l3
            (i64.rotl
              (i64.xor
                (local.get $l30)
                (local.get $l9))
              (i64.const 2)))))
      (local.set $l2
        (i64.xor
          (i64.and
            (local.get $l6)
            (i64.xor
              (local.get $l3)
              (i64.const -1)))
          (local.tee $l4
            (i64.rotl
              (i64.xor
                (local.get $l34)
                (local.get $l41))
              (i64.const 41)))))
      (local.set $l3
        (i64.xor
          (i64.and
            (local.get $l3)
            (i64.xor
              (local.get $l4)
              (i64.const -1)))
          (local.tee $l7
            (i64.rotl
              (i64.xor
                (local.get $l29)
                (local.get $l14))
              (i64.const 39)))))
      (local.set $l4
        (i64.xor
          (i64.and
            (local.get $l4)
            (i64.xor
              (local.get $l7)
              (i64.const -1)))
          (local.get $l5)))
      (local.set $l5
        (i64.xor
          (i64.and
            (local.get $l7)
            (i64.xor
              (local.get $l5)
              (i64.const -1)))
          (local.get $l6)))
      (local.set $l6
        (i64.xor
          (i64.and
            (local.tee $l10
              (i64.rotl
                (i64.xor
                  (local.get $l34)
                  (local.get $l22))
                (i64.const 36)))
            (i64.xor
              (local.tee $l11
                (i64.rotl
                  (i64.xor
                    (local.get $l29)
                    (local.get $l18))
                  (i64.const 27)))
              (i64.const -1)))
          (local.tee $l8
            (i64.rotl
              (i64.xor
                (local.get $l28)
                (local.get $l17))
              (i64.const 56)))))
      (local.set $l7
        (i64.xor
          (i64.and
            (local.get $l11)
            (i64.xor
              (local.get $l8)
              (i64.const -1)))
          (local.tee $l9
            (i64.rotl
              (i64.xor
                (local.get $l32)
                (local.get $l38))
              (i64.const 15)))))
      (local.set $l8
        (i64.xor
          (i64.and
            (local.get $l8)
            (i64.xor
              (local.get $l9)
              (i64.const -1)))
          (local.tee $l12
            (i64.rotl
              (i64.xor
                (local.get $l30)
                (local.get $l12))
              (i64.const 10)))))
      (local.set $l9
        (i64.xor
          (i64.and
            (local.get $l9)
            (i64.xor
              (local.get $l12)
              (i64.const -1)))
          (local.get $l10)))
      (local.set $l10
        (i64.xor
          (i64.and
            (local.get $l12)
            (i64.xor
              (local.get $l10)
              (i64.const -1)))
          (local.get $l11)))
      (local.set $l11
        (i64.xor
          (i64.and
            (local.tee $l15
              (i64.rotl
                (i64.xor
                  (local.get $l32)
                  (local.get $l36))
                (i64.const 6)))
            (i64.xor
              (local.tee $l16
                (i64.rotl
                  (i64.xor
                    (local.get $l30)
                    (local.get $l13))
                  (i64.const 1)))
              (i64.const -1)))
          (local.tee $l13
            (i64.rotl
              (i64.xor
                (local.get $l34)
                (local.get $l42))
              (i64.const 18)))))
      (local.set $l12
        (i64.xor
          (i64.and
            (local.get $l16)
            (i64.xor
              (local.get $l13)
              (i64.const -1)))
          (local.tee $l14
            (i64.rotl
              (i64.xor
                (local.get $l29)
                (local.get $l20))
              (i64.const 8)))))
      (local.set $l13
        (i64.xor
          (i64.and
            (local.get $l13)
            (i64.xor
              (local.get $l14)
              (i64.const -1)))
          (local.tee $l17
            (i64.rotl
              (i64.xor
                (local.get $l28)
                (local.get $l19))
              (i64.const 25)))))
      (local.set $l14
        (i64.xor
          (i64.and
            (local.get $l14)
            (i64.xor
              (local.get $l17)
              (i64.const -1)))
          (local.get $l15)))
      (local.set $l15
        (i64.xor
          (i64.and
            (local.get $l17)
            (i64.xor
              (local.get $l15)
              (i64.const -1)))
          (local.get $l16)))
      (local.set $l16
        (i64.xor
          (i64.and
            (local.tee $l29
              (i64.rotl
                (i64.xor
                  (local.get $l29)
                  (local.get $l44))
                (i64.const 20)))
            (i64.xor
              (local.tee $l20
                (i64.rotl
                  (i64.xor
                    (local.get $l28)
                    (local.get $l45))
                  (i64.const 28)))
              (i64.const -1)))
          (local.tee $l18
            (i64.rotl
              (i64.xor
                (local.get $l32)
                (local.get $l37))
              (i64.const 61)))))
      (local.set $l17
        (i64.xor
          (i64.and
            (local.get $l20)
            (i64.xor
              (local.get $l18)
              (i64.const -1)))
          (local.tee $l30
            (i64.rotl
              (i64.xor
                (local.get $l30)
                (local.get $l43))
              (i64.const 45)))))
      (local.set $l18
        (i64.xor
          (i64.and
            (local.get $l18)
            (i64.xor
              (local.get $l30)
              (i64.const -1)))
          (local.tee $l34
            (i64.rotl
              (i64.xor
                (local.get $l34)
                (local.get $l24))
              (i64.const 3)))))
      (local.set $l19
        (i64.xor
          (i64.and
            (local.get $l30)
            (i64.xor
              (local.get $l34)
              (i64.const -1)))
          (local.get $l29)))
      (local.set $l20
        (i64.xor
          (i64.and
            (local.get $l34)
            (i64.xor
              (local.get $l29)
              (i64.const -1)))
          (local.get $l20)))
      (local.set $l22
        (i64.xor
          (i64.and
            (local.get $l33)
            (i64.xor
              (local.get $l23)
              (i64.const -1)))
          (local.tee $l30
            (i64.rotl
              (i64.xor
                (local.get $l28)
                (local.get $l31))
              (i64.const 21)))))
      (local.set $l23
        (i64.xor
          (i64.and
            (local.get $l23)
            (i64.xor
              (local.get $l30)
              (i64.const -1)))
          (local.tee $l34
            (i64.rotl
              (i64.xor
                (local.get $l32)
                (local.get $l35))
              (i64.const 43)))))
      (local.set $l24
        (i64.xor
          (i64.and
            (local.get $l30)
            (i64.xor
              (local.get $l34)
              (i64.const -1)))
          (local.get $l25)))
      (local.set $l25
        (i64.xor
          (i64.xor
            (local.get $l33)
            (i64.load
              (i32.add
                (local.get $l27)
                (i32.const 8))))
          (i64.and
            (local.get $l34)
            (i64.xor
              (local.get $l25)
              (i64.const -1)))))
      (local.set $l27
        (i32.add
          (local.get $l27)
          (i32.const 16)))
      (br_if $L0
        (i32.lt_u
          (local.tee $l26
            (i32.add
              (local.get $l26)
              (i32.const 2)))
          (i32.const 24))))
    (i64.store offset=192
      (local.get $p0)
      (local.get $l1))
    (i64.store offset=184
      (local.get $p0)
      (local.get $l2))
    (i64.store offset=176
      (local.get $p0)
      (local.get $l3))
    (i64.store offset=168
      (local.get $p0)
      (local.get $l4))
    (i64.store offset=160
      (local.get $p0)
      (local.get $l5))
    (i64.store offset=152
      (local.get $p0)
      (local.get $l6))
    (i64.store offset=144
      (local.get $p0)
      (local.get $l7))
    (i64.store offset=136
      (local.get $p0)
      (local.get $l8))
    (i64.store offset=128
      (local.get $p0)
      (local.get $l9))
    (i64.store offset=120
      (local.get $p0)
      (local.get $l10))
    (i64.store offset=112
      (local.get $p0)
      (local.get $l11))
    (i64.store offset=104
      (local.get $p0)
      (local.get $l12))
    (i64.store offset=96
      (local.get $p0)
      (local.get $l13))
    (i64.store offset=88
      (local.get $p0)
      (local.get $l14))
    (i64.store offset=80
      (local.get $p0)
      (local.get $l15))
    (i64.store offset=72
      (local.get $p0)
      (local.get $l16))
    (i64.store offset=64
      (local.get $p0)
      (local.get $l17))
    (i64.store offset=56
      (local.get $p0)
      (local.get $l18))
    (i64.store offset=48
      (local.get $p0)
      (local.get $l19))
    (i64.store offset=40
      (local.get $p0)
      (local.get $l20))
    (i64.store offset=32
      (local.get $p0)
      (local.get $l21))
    (i64.store offset=24
      (local.get $p0)
      (local.get $l22))
    (i64.store offset=16
      (local.get $p0)
      (local.get $l23))
    (i64.store offset=8
      (local.get $p0)
      (local.get $l24))
    (i64.store
      (local.get $p0)
      (local.get $l25)))
  (func $_ZN4core9panicking9panic_fmt17h581f7a1e5499d350E  (param $p0 i32) (param $p1 i32)
    (local $l2 i32) (local $l3 i64)
    (global.set $tinykeccak_g0
      (local.tee $l2
        (i32.sub
          (global.get $tinykeccak_g0)
          (i32.const 32))))
    (local.set $l3
      (i64.load align=4
        (local.get $p1)))
    (i64.store align=4
      (i32.add
        (local.get $l2)
        (i32.const 20))
      (i64.load offset=8 align=4
        (local.get $p1)))
    (i64.store offset=12 align=4
      (local.get $l2)
      (local.get $l3))
    (i32.store offset=8
      (local.get $l2)
      (local.get $p0))
    (i32.store offset=4
      (local.get $l2)
      (i32.const 8636))
    (i32.store
      (local.get $l2)
      (i32.const 8636))
    (call $rust_begin_unwind
      (local.get $l2))
    (unreachable))
 
  ;;(func $_ZN4core3ptr18real_drop_in_place17h15423b3a2bb8e13cE  (param $p0 i32))
  ;;(func $_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h8a53baa8d6b62d5aE  (param $p0 i32) (result i64)
  ;;  (i64.const 8534921647364290413))
  (func $tinykeccak_memset  (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32)
    (block $B0
      (br_if $B0
        (i32.eqz
          (local.get $p2)))
      (local.set $l3
        (local.get $p0))
      (loop $L1
        (i32.store8
          (local.get $l3)
          (local.get $p1))
        (local.set $l3
          (i32.add
            (local.get $l3)
            (i32.const 1)))
        (br_if $L1
          (local.tee $p2
            (i32.add
              (local.get $p2)
              (i32.const -1))))))
    (local.get $p0))
  (table $T0 4 4 funcref)
;;  (memory $memory (export "memory") 1)
  (global $tinykeccak_g0 (mut i32) (i32.const 8192))
  (global $__data_end (export "__data_end") i32 (i32.const 8740))
  (global $__heap_base (export "__heap_base") i32 (i32.const 8740))
  ;;(elem $e0 (i32.const 1) $_ZN3std5alloc24default_alloc_error_hook17hb13db55d969cf9ecE $_ZN4core3ptr18real_drop_in_place17h15423b3a2bb8e13cE $_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h8a53baa8d6b62d5aE)
  (data $tinykeccak_d0 (i32.const 8192) "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
  (data $tinykeccak_d1 (i32.const 8216) "0 \00\00\11\00\00\00A \00\00\17\00\00\00\f0\02\00\00\05\00\00\00capacity overflowsrc/liballoc/raw_vec.rs\01\00\00\00\00\00\00\00\82\80\00\00\00\00\00\00\8a\80\00\00\00\00\00\80\00\80\00\80\00\00\00\80\8b\80\00\00\00\00\00\00\01\00\00\80\00\00\00\00\81\80\00\80\00\00\00\80\09\80\00\00\00\00\00\80\8a\00\00\00\00\00\00\00\88\00\00\00\00\00\00\00\09\80\00\80\00\00\00\00\0a\00\00\80\00\00\00\00\8b\80\00\80\00\00\00\00\8b\00\00\00\00\00\00\80\89\80\00\00\00\00\00\80\03\80\00\00\00\00\00\80\02\80\00\00\00\00\00\80\80\00\00\00\00\00\00\80\0a\80\00\00\00\00\00\00\0a\00\00\80\00\00\00\80\81\80\00\80\00\00\00\80\80\80\00\00\00\00\00\80\01\00\00\80\00\00\00\00\08\80\00\80\00\00\00\80\97!\00\00\22\00\00\00j!\00\00-\00\00\00\a6\02\00\00\0d\00\00\00H!\00\00\22\00\00\00j!\00\00-\00\00\00\b4\02\00\00\09\00\00\00assertion failed: ip < input.len()/Users/mbpro/dev_ewasm/tiny-keccak/src/lib.rsassertion failed: input.len() > ip\00\00\00\02\00\00\00\00\00\00\00\01\00\00\00\03\00\00\00\e4!\00\00+\00\00\00\0f\22\00\00\15\00\00\00z\01\00\00\15\00\00\00called `Option::unwrap()` on a `None` valuesrc/libcore/option.rs")

;;)
