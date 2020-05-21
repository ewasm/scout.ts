(module
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$viiii (func (param i32 i32 i32 i32)))
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$iiiiii (func (param i32 i32 i32 i32 i32) (result i32)))
 (type $FUNCSIG$v (func))
 (type $FUNCSIG$i (func (result i32)))
 (type $FUNCSIG$viii (func (param i32 i32 i32)))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (import "watimports" "$g1m_toMontgomery" (func $websnark_bls12/bls12_g1m_toMontgomery (param i32 i32)))
 (import "watimports" "$g2m_toMontgomery" (func $websnark_bls12/bls12_g2m_toMontgomery (param i32 i32)))
 (import "watimports" "$g2m_timesScalar" (func $websnark_bls12/bls12_g2m_timesScalar (param i32 i32 i32 i32)))
 (import "watimports" "$g1m_timesScalar" (func $websnark_bls12/bls12_g1m_timesScalar (param i32 i32 i32 i32)))
 (import "watimports" "$g1m_affine" (func $websnark_bls12/bls12_g1m_affine (param i32 i32)))
 (import "watimports" "$g1m_neg" (func $websnark_bls12/bls12_g1m_neg (param i32 i32)))
 (import "watimports" "$ftm_one" (func $websnark_bls12/bls12_ftm_one (param i32)))
 (import "watimports" "$bls12_pairingEq2" (func $websnark_bls12/bls12_pairingEq2 (param i32 i32 i32 i32 i32) (result i32)))
 (import "env" "debug_print_f2" (func $main/debug_print_f2 (param i32)))
 (import "env" "debug_print_f6" (func $main/debug_print_f6 (param i32)))
 (import "env" "debug_print32" (func $main/debug_print32 (param i32)))
 (import "env" "eth2_blockDataSize" (func $main/eth2_blockDataSize (result i32)))
 (import "env" "eth2_blockDataCopy" (func $main/eth2_blockDataCopy (param i32 i32 i32)))
 (import "env" "eth2_loadPreStateRoot" (func $main/eth2_loadPreStateRoot (param i32)))
 (import "env" "eth2_savePostStateRoot" (func $main/eth2_savePostStateRoot (param i32)))
 (import "watimports" "$f6m_toMontgomery" (func $websnark_bls12/bls12_f6m_toMontgomery (param i32 i32)))
 (import "watimports" "$f6m_mul" (func $websnark_bls12/bls12_f6m_mul (param i32 i32 i32)))
 (memory $0 8)
 (global $~lib/rt/stub/startOffset (mut i32) (i32.const 0))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (export "memory" (memory $0))
 (export "debug_print_f2" (func $main/debug_print_f2))
 (export "debug_print_f6" (func $main/debug_print_f6))
 (export "debug_print32" (func $main/debug_print32))
 (export "eth2_blockDataSize" (func $main/eth2_blockDataSize))
 (export "eth2_blockDataCopy" (func $main/eth2_blockDataCopy))
 (export "eth2_loadPreStateRoot" (func $main/eth2_loadPreStateRoot))
 (export "eth2_savePostStateRoot" (func $main/eth2_savePostStateRoot))
 (export "main" (func $main/main))
 (start $start)
 (func $~lib/rt/stub/maybeGrowMemory (; 17 ;) (type $FUNCSIG$vi) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  memory.size
  local.tee $2
  i32.const 16
  i32.shl
  local.tee $1
  i32.gt_u
  if
   local.get $2
   local.get $0
   local.get $1
   i32.sub
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $1
   local.get $2
   local.get $1
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $1
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  local.get $0
  global.set $~lib/rt/stub/offset
 )
 (func $~lib/rt/stub/__alloc (; 18 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $0
  i32.const 1073741808
  i32.gt_u
  if
   unreachable
  end
  global.get $~lib/rt/stub/offset
  i32.const 16
  i32.add
  local.tee $3
  local.get $0
  i32.const 15
  i32.add
  i32.const -16
  i32.and
  local.tee $2
  i32.const 16
  local.get $2
  i32.const 16
  i32.gt_u
  select
  local.tee $4
  i32.add
  call $~lib/rt/stub/maybeGrowMemory
  local.get $3
  i32.const 16
  i32.sub
  local.tee $2
  local.get $4
  i32.store
  local.get $2
  i32.const -1
  i32.store offset=4
  local.get $2
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $0
  i32.store offset=12
  local.get $3
 )
 (func $~lib/memory/memory.fill (; 19 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  (local $2 i32)
  block $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.eqz
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store8
   local.get $0
   local.get $1
   i32.add
   i32.const 1
   i32.sub
   i32.const 0
   i32.store8
   local.get $1
   i32.const 2
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 1
   i32.add
   i32.const 0
   i32.store8
   local.get $0
   i32.const 2
   i32.add
   i32.const 0
   i32.store8
   local.get $0
   local.get $1
   i32.add
   local.tee $2
   i32.const 2
   i32.sub
   i32.const 0
   i32.store8
   local.get $2
   i32.const 3
   i32.sub
   i32.const 0
   i32.store8
   local.get $1
   i32.const 6
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 3
   i32.add
   i32.const 0
   i32.store8
   local.get $0
   local.get $1
   i32.add
   i32.const 4
   i32.sub
   i32.const 0
   i32.store8
   local.get $1
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   local.get $0
   i32.sub
   i32.const 3
   i32.and
   local.tee $1
   i32.sub
   local.get $0
   local.get $1
   i32.add
   local.tee $0
   i32.const 0
   i32.store
   i32.const -4
   i32.and
   local.tee $1
   local.get $0
   i32.add
   i32.const 4
   i32.sub
   i32.const 0
   i32.store
   local.get $1
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 4
   i32.add
   i32.const 0
   i32.store
   local.get $0
   i32.const 8
   i32.add
   i32.const 0
   i32.store
   local.get $0
   local.get $1
   i32.add
   local.tee $2
   i32.const 12
   i32.sub
   i32.const 0
   i32.store
   local.get $2
   i32.const 8
   i32.sub
   i32.const 0
   i32.store
   local.get $1
   i32.const 24
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 12
   i32.add
   i32.const 0
   i32.store
   local.get $0
   i32.const 16
   i32.add
   i32.const 0
   i32.store
   local.get $0
   i32.const 20
   i32.add
   i32.const 0
   i32.store
   local.get $0
   i32.const 24
   i32.add
   i32.const 0
   i32.store
   local.get $0
   local.get $1
   i32.add
   local.tee $2
   i32.const 28
   i32.sub
   i32.const 0
   i32.store
   local.get $2
   i32.const 24
   i32.sub
   i32.const 0
   i32.store
   local.get $2
   i32.const 20
   i32.sub
   i32.const 0
   i32.store
   local.get $2
   i32.const 16
   i32.sub
   i32.const 0
   i32.store
   local.get $0
   i32.const 4
   i32.and
   i32.const 24
   i32.add
   local.tee $2
   local.get $0
   i32.add
   local.set $0
   local.get $1
   local.get $2
   i32.sub
   local.set $1
   loop $continue|0
    local.get $1
    i32.const 32
    i32.ge_u
    if
     local.get $0
     i64.const 0
     i64.store
     local.get $0
     i32.const 8
     i32.add
     i64.const 0
     i64.store
     local.get $0
     i32.const 16
     i32.add
     i64.const 0
     i64.store
     local.get $0
     i32.const 24
     i32.add
     i64.const 0
     i64.store
     local.get $1
     i32.const 32
     i32.sub
     local.set $1
     local.get $0
     i32.const 32
     i32.add
     local.set $0
     br $continue|0
    end
   end
  end
 )
 (func $~lib/arraybuffer/ArrayBuffer#constructor (; 20 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  i32.const 1073741808
  i32.gt_u
  if
   unreachable
  end
  local.get $0
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $1
  local.get $0
  call $~lib/memory/memory.fill
  local.get $1
 )
 (func $~lib/arraybuffer/ArrayBuffer#get:byteLength (; 21 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.const 16
  i32.sub
  i32.load offset=12
 )
 (func $~lib/typedarray/Uint8Array.wrap (; 22 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  block $folding-inner0
   local.get $1
   local.get $0
   call $~lib/arraybuffer/ArrayBuffer#get:byteLength
   i32.ge_u
   br_if $folding-inner0
   local.get $1
   i32.const 288
   i32.add
   local.get $0
   call $~lib/arraybuffer/ArrayBuffer#get:byteLength
   i32.gt_s
   br_if $folding-inner0
   i32.const 12
   i32.const 3
   call $~lib/rt/stub/__alloc
   local.tee $2
   local.get $0
   i32.store
   local.get $2
   i32.const 288
   i32.store offset=8
   local.get $2
   local.get $0
   local.get $1
   i32.add
   i32.store offset=4
   local.get $2
   return
  end
  unreachable
 )
 (func $~lib/arraybuffer/ArrayBufferView#get:byteOffset (; 23 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load offset=4
  local.get $0
  i32.load
  i32.sub
 )
 (func $main/main (; 24 ;) (type $FUNCSIG$i) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  call $main/eth2_blockDataSize
  local.tee $1
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $0
  i32.const 0
  local.get $1
  call $main/eth2_blockDataCopy
  local.get $0
  i32.const 0
  call $~lib/typedarray/Uint8Array.wrap
  local.set $1
  local.get $0
  i32.const 288
  call $~lib/typedarray/Uint8Array.wrap
  local.set $0
  i32.const 288
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $5
  i32.const 288
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $6
  i32.const 288
  call $~lib/arraybuffer/ArrayBuffer#constructor
  drop
  i32.const 288
  call $~lib/arraybuffer/ArrayBuffer#constructor
  drop
  local.get $1
  i32.load
  local.get $1
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  local.get $5
  call $websnark_bls12/bls12_f6m_toMontgomery
  local.get $0
  i32.load
  local.get $0
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  local.get $6
  call $websnark_bls12/bls12_f6m_toMontgomery
  i32.const 288
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $2
  i32.const 288
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $3
  i32.const 288
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $4
  i32.const 288
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $0
  i32.const 288
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $1
  local.get $5
  local.get $6
  local.get $0
  call $websnark_bls12/bls12_f6m_mul
  local.get $5
  local.get $0
  local.get $1
  call $websnark_bls12/bls12_f6m_mul
  loop $loop|0
   local.get $7
   i32.const 135
   i32.lt_s
   if
    local.get $0
    local.get $1
    local.get $2
    call $websnark_bls12/bls12_f6m_mul
    local.get $1
    local.get $2
    local.get $3
    call $websnark_bls12/bls12_f6m_mul
    local.get $2
    local.get $3
    local.get $4
    call $websnark_bls12/bls12_f6m_mul
    local.get $3
    local.get $4
    local.get $0
    call $websnark_bls12/bls12_f6m_mul
    local.get $4
    local.get $0
    local.get $1
    call $websnark_bls12/bls12_f6m_mul
    local.get $0
    local.get $1
    local.get $2
    call $websnark_bls12/bls12_f6m_mul
    local.get $1
    local.get $2
    local.get $3
    call $websnark_bls12/bls12_f6m_mul
    local.get $2
    local.get $3
    local.get $4
    call $websnark_bls12/bls12_f6m_mul
    local.get $3
    local.get $4
    local.get $0
    call $websnark_bls12/bls12_f6m_mul
    local.get $4
    local.get $0
    local.get $1
    call $websnark_bls12/bls12_f6m_mul
    local.get $7
    i32.const 1
    i32.add
    local.set $7
    br $loop|0
   end
  end
  local.get $1
  call $main/eth2_savePostStateRoot
  i32.const 1
 )
 (func $start (; 25 ;) (type $FUNCSIG$v)
  i32.const 512000
  global.set $~lib/rt/stub/startOffset
  i32.const 512000
  global.set $~lib/rt/stub/offset
 )
 (func $null (; 26 ;) (type $FUNCSIG$v)
  nop
 )
)
