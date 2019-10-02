(module
 (type $FUNCSIG$i (func (result i32)))
 (type $FUNCSIG$viii (func (param i32 i32 i32)))
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$viiii (func (param i32 i32 i32 i32)))
 (type $FUNCSIG$v (func))
 (import "env" "eth2_blockDataSize" (func $main/eth2_blockDataSize (result i32)))
 (import "env" "eth2_blockDataCopy" (func $main/eth2_blockDataCopy (param i32 i32 i32)))
 (import "env" "eth2_loadPreStateRoot" (func $main/eth2_loadPreStateRoot (param i32)))
 (import "env" "eth2_savePostStateRoot" (func $main/eth2_savePostStateRoot (param i32)))
 (import "watimports" "$g1m_toMontgomery" (func $websnark_secp256k1/secp_g1m_toMontgomery (param i32 i32)))
 (import "watimports" "$g1m_timesScalar" (func $websnark_secp256k1/secp_g1m_timesScalar (param i32 i32 i32 i32)))
 (import "watimports" "$tinykeccak_keccak256" (func $keccak/keccakMain (param i32 i32 i32)))
 (import "watimports" "$frm_neg" (func $websnark_secp256k1/secp_frm_neg (param i32 i32)))
 (import "watimports" "$g1m_add" (func $websnark_secp256k1/secp_g1m_add (param i32 i32 i32)))
 (import "watimports" "$fr_inverse" (func $websnark_secp256k1/secp_fr_inverse (param i32 i32)))
 (import "watimports" "$g1m_affine" (func $websnark_secp256k1/secp_g1m_affine (param i32 i32)))
 (import "watimports" "$g1m_fromMontgomery" (func $websnark_secp256k1/secp_g1m_fromMontgomery (param i32 i32)))
 (memory $0 1)
 (data (i32.const 32768) "`\00\00\00\01\00\00\00\00\00\00\00`")
 (data (i32.const 32816) "1\cbc\ce1\a2\15@\c8\9b\e8\1b\12\f5!\1f\cd\11&\1b\8bO\f2\d4\d5\1f\10\f6tfv\t\01")
 (data (i32.const 32880) "`\00\00\00\01\00\00\00\00\00\00\00`\00\00\00\98\17\f8\16[\81\f2Y\d9(\ce-\db\fc\9b\02\07\0b\87\ce\95b\a0U\ac\bb\dc\f9~f\bey\b8\d4\10\fb\8f\d0G\9c\19T\85\a6H\b4\17\fd\a8\08\11\0e\fc\fb\a4]e\c4\a3&w\da:H\01")
 (global $~lib/rt/stub/startOffset (mut i32) (i32.const 0))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (export "memory" (memory $0))
 (export "eth2_blockDataSize" (func $main/eth2_blockDataSize))
 (export "eth2_blockDataCopy" (func $main/eth2_blockDataCopy))
 (export "eth2_loadPreStateRoot" (func $main/eth2_loadPreStateRoot))
 (export "eth2_savePostStateRoot" (func $main/eth2_savePostStateRoot))
 (export "main" (func $main/main))
 (start $start)
 (func $~lib/rt/stub/__alloc (; 12 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
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
  i32.const 1
  local.get $0
  i32.const 1
  i32.gt_u
  select
  i32.add
  i32.const 15
  i32.add
  i32.const -16
  i32.and
  local.tee $2
  memory.size
  local.tee $4
  i32.const 16
  i32.shl
  i32.gt_u
  if
   local.get $4
   local.get $2
   local.get $3
   i32.sub
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $5
   local.get $4
   local.get $5
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $5
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  local.get $2
  global.set $~lib/rt/stub/offset
  local.get $3
  i32.const 16
  i32.sub
  local.tee $2
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $0
  i32.store offset=12
  local.get $3
 )
 (func $~lib/memory/memory.fill (; 13 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
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
 (func $~lib/arraybuffer/ArrayBuffer#constructor (; 14 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
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
 (func $~lib/arraybuffer/ArrayBuffer#get:byteLength (; 15 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.const 16
  i32.sub
  i32.load offset=12
 )
 (func $~lib/typedarray/Uint8Array.wrap (; 16 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  block $folding-inner0
   local.get $1
   local.get $0
   call $~lib/arraybuffer/ArrayBuffer#get:byteLength
   i32.ge_u
   br_if $folding-inner0
   local.get $2
   i32.const 0
   i32.lt_s
   if
    local.get $2
    i32.const -1
    i32.ne
    br_if $folding-inner0
    local.get $0
    call $~lib/arraybuffer/ArrayBuffer#get:byteLength
    i32.const -2147483648
    i32.and
    br_if $folding-inner0
    local.get $0
    call $~lib/arraybuffer/ArrayBuffer#get:byteLength
    local.set $2
   end
   local.get $1
   local.get $2
   i32.add
   local.get $0
   call $~lib/arraybuffer/ArrayBuffer#get:byteLength
   i32.gt_s
   br_if $folding-inner0
   i32.const 12
   i32.const 3
   call $~lib/rt/stub/__alloc
   local.tee $3
   local.get $3
   i32.load
   drop
   local.get $0
   i32.store
   local.get $3
   local.get $2
   i32.store offset=8
   local.get $3
   local.get $0
   local.get $1
   i32.add
   i32.store offset=4
   local.get $3
   return
  end
  unreachable
 )
 (func $~lib/typedarray/Uint8Array#reverse (; 17 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $0
  local.tee $3
  i32.load offset=4
  local.set $4
  i32.const 0
  local.set $0
  local.get $3
  i32.load offset=8
  i32.const 1
  i32.sub
  local.set $1
  loop $loop|0
   local.get $0
   local.get $1
   i32.lt_u
   if
    local.get $0
    local.get $4
    i32.add
    local.tee $2
    i32.load8_u
    local.set $5
    local.get $2
    local.get $1
    local.get $4
    i32.add
    local.tee $2
    i32.load8_u
    i32.store8
    local.get $2
    local.get $5
    i32.store8
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    local.get $1
    i32.const 1
    i32.sub
    local.set $1
    br $loop|0
   end
  end
  local.get $3
 )
 (func $~lib/memory/memory.copy (; 18 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  block $~lib/util/memory/memmove|inlined.0
   local.get $2
   local.set $3
   local.get $0
   local.get $1
   i32.eq
   br_if $~lib/util/memory/memmove|inlined.0
   local.get $0
   local.get $1
   i32.lt_u
   if
    local.get $1
    i32.const 7
    i32.and
    local.get $0
    i32.const 7
    i32.and
    i32.eq
    if
     loop $continue|0
      local.get $0
      i32.const 7
      i32.and
      if
       local.get $3
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $3
       i32.const 1
       i32.sub
       local.set $3
       local.get $0
       local.tee $2
       i32.const 1
       i32.add
       local.set $0
       local.get $1
       local.tee $4
       i32.const 1
       i32.add
       local.set $1
       local.get $2
       local.get $4
       i32.load8_u
       i32.store8
       br $continue|0
      end
     end
     loop $continue|1
      local.get $3
      i32.const 8
      i32.lt_u
      i32.eqz
      if
       local.get $0
       local.get $1
       i64.load
       i64.store
       local.get $3
       i32.const 8
       i32.sub
       local.set $3
       local.get $0
       i32.const 8
       i32.add
       local.set $0
       local.get $1
       i32.const 8
       i32.add
       local.set $1
       br $continue|1
      end
     end
    end
    loop $continue|2
     local.get $3
     if
      local.get $0
      local.tee $2
      i32.const 1
      i32.add
      local.set $0
      local.get $1
      local.tee $4
      i32.const 1
      i32.add
      local.set $1
      local.get $2
      local.get $4
      i32.load8_u
      i32.store8
      local.get $3
      i32.const 1
      i32.sub
      local.set $3
      br $continue|2
     end
    end
   else    
    local.get $1
    i32.const 7
    i32.and
    local.get $0
    i32.const 7
    i32.and
    i32.eq
    if
     loop $continue|3
      local.get $0
      local.get $3
      i32.add
      i32.const 7
      i32.and
      if
       local.get $3
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $0
       local.get $3
       i32.const 1
       i32.sub
       local.tee $3
       i32.add
       local.get $1
       local.get $3
       i32.add
       i32.load8_u
       i32.store8
       br $continue|3
      end
     end
     loop $continue|4
      local.get $3
      i32.const 8
      i32.lt_u
      i32.eqz
      if
       local.get $0
       local.get $3
       i32.const 8
       i32.sub
       local.tee $3
       i32.add
       local.get $1
       local.get $3
       i32.add
       i64.load
       i64.store
       br $continue|4
      end
     end
    end
    loop $continue|5
     local.get $3
     if
      local.get $0
      local.get $3
      i32.const 1
      i32.sub
      local.tee $3
      i32.add
      local.get $1
      local.get $3
      i32.add
      i32.load8_u
      i32.store8
      br $continue|5
     end
    end
   end
  end
 )
 (func $~lib/rt/__allocArray (; 19 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  i32.const 16
  i32.const 4
  call $~lib/rt/stub/__alloc
  local.tee $1
  i32.const 96
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $2
  i32.store
  local.get $1
  local.get $2
  i32.store offset=4
  local.get $1
  i32.const 96
  i32.store offset=8
  local.get $1
  i32.const 96
  i32.store offset=12
  local.get $0
  if
   local.get $2
   local.get $0
   i32.const 96
   call $~lib/memory/memory.copy
  end
  local.get $1
 )
 (func $~lib/array/Array.create<u8> (; 20 ;) (type $FUNCSIG$i) (result i32)
  (local $0 i32)
  i32.const 0
  call $~lib/rt/__allocArray
  local.tee $0
  i32.const 0
  i32.store offset=12
  local.get $0
  i32.load offset=4
  local.get $0
  i32.load offset=8
  call $~lib/memory/memory.fill
  local.get $0
 )
 (func $~lib/arraybuffer/ArrayBufferView#get:byteOffset (; 21 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load offset=4
  local.get $0
  i32.load
  i32.sub
 )
 (func $~lib/arraybuffer/ArrayBuffer#slice (; 22 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  local.get $0
  call $~lib/arraybuffer/ArrayBuffer#get:byteLength
  local.set $3
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $1
   local.get $3
   i32.add
   local.tee $1
   i32.const 0
   local.get $1
   i32.const 0
   i32.gt_s
   select
  else   
   local.get $1
   local.get $3
   local.get $1
   local.get $3
   i32.lt_s
   select
  end
  local.set $1
  local.get $2
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $2
   local.get $3
   i32.add
   local.tee $2
   i32.const 0
   local.get $2
   i32.const 0
   i32.gt_s
   select
  else   
   local.get $2
   local.get $3
   local.get $2
   local.get $3
   i32.lt_s
   select
  end
  local.get $1
  i32.sub
  local.tee $2
  i32.const 0
  local.get $2
  i32.const 0
  i32.gt_s
  select
  local.tee $2
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $3
  local.get $0
  local.get $1
  i32.add
  local.get $2
  call $~lib/memory/memory.copy
  local.get $3
 )
 (func $~lib/typedarray/Uint8Array#fill (; 23 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.load offset=4
  local.set $3
  i32.const 0
  local.get $0
  i32.load offset=8
  local.tee $1
  i32.const 0
  local.get $1
  i32.lt_s
  select
  local.tee $2
  i32.const 12
  local.get $1
  i32.const 12
  local.get $1
  i32.lt_s
  select
  local.tee $1
  i32.lt_s
  if
   local.get $2
   local.get $3
   i32.add
   local.get $1
   local.get $2
   i32.sub
   call $~lib/memory/memory.fill
  end
  local.get $0
 )
 (func $main/main (; 24 ;) (type $FUNCSIG$i) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  call $main/eth2_blockDataSize
  local.tee $0
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $1
  i32.const 0
  local.get $0
  call $main/eth2_blockDataCopy
  local.get $1
  i32.const 25
  i32.const 32
  call $~lib/typedarray/Uint8Array.wrap
  call $~lib/typedarray/Uint8Array#reverse
  local.set $0
  call $~lib/array/Array.create<u8>
  drop
  i32.const 32784
  call $~lib/rt/__allocArray
  local.tee $3
  i32.load
  i32.const 0
  i32.const 32
  call $~lib/typedarray/Uint8Array.wrap
  local.tee $2
  i32.load
  local.get $2
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  local.get $0
  i32.load
  local.get $0
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  i32.const 32
  call $~lib/memory/memory.copy
  i32.const 96
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $2
  local.get $3
  i32.load
  local.get $2
  call $websnark_secp256k1/secp_g1m_toMontgomery
  local.get $1
  i32.const 57
  i32.const 32
  call $~lib/typedarray/Uint8Array.wrap
  call $~lib/typedarray/Uint8Array#reverse
  local.set $3
  i32.const 96
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $4
  local.get $2
  local.get $3
  i32.load
  local.get $3
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  i32.const 32
  local.get $4
  call $websnark_secp256k1/secp_g1m_timesScalar
  call $~lib/array/Array.create<u8>
  drop
  i32.const 32896
  call $~lib/rt/__allocArray
  local.tee $2
  i32.load
  local.get $2
  i32.load
  call $websnark_secp256k1/secp_g1m_toMontgomery
  local.get $1
  i32.const 0
  i32.const 25
  call $~lib/typedarray/Uint8Array.wrap
  local.set $3
  i32.const 32
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $1
  local.get $3
  i32.load
  local.get $3
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  i32.const 25
  local.get $1
  call $keccak/keccakMain
  local.get $1
  i32.const 0
  i32.const 32
  call $~lib/typedarray/Uint8Array.wrap
  call $~lib/typedarray/Uint8Array#reverse
  drop
  local.get $1
  i32.const 32
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $3
  call $websnark_secp256k1/secp_frm_neg
  i32.const 96
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $1
  local.get $2
  i32.load
  local.get $3
  i32.const 32
  local.get $1
  call $websnark_secp256k1/secp_g1m_timesScalar
  local.get $4
  local.get $1
  i32.const 96
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $2
  call $websnark_secp256k1/secp_g1m_add
  i32.const 32
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $1
  local.get $0
  i32.load
  local.get $0
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  local.get $1
  call $websnark_secp256k1/secp_fr_inverse
  local.get $2
  local.get $1
  i32.const 32
  i32.const 96
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $0
  call $websnark_secp256k1/secp_g1m_timesScalar
  local.get $0
  i32.const 96
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $0
  call $websnark_secp256k1/secp_g1m_affine
  local.get $0
  local.get $0
  call $websnark_secp256k1/secp_g1m_fromMontgomery
  local.get $0
  i32.const 0
  i32.const 32
  call $~lib/arraybuffer/ArrayBuffer#slice
  i32.const 0
  i32.const 32
  call $~lib/typedarray/Uint8Array.wrap
  call $~lib/typedarray/Uint8Array#reverse
  local.set $1
  local.get $0
  i32.const 32
  i32.const 64
  call $~lib/arraybuffer/ArrayBuffer#slice
  i32.const 0
  i32.const 32
  call $~lib/typedarray/Uint8Array.wrap
  call $~lib/typedarray/Uint8Array#reverse
  local.set $2
  i32.const 64
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $0
  local.get $1
  i32.load
  i32.const 32
  call $~lib/memory/memory.copy
  local.get $0
  i32.const 32
  i32.add
  local.get $2
  i32.load
  i32.const 32
  call $~lib/memory/memory.copy
  local.get $0
  i32.const 64
  i32.const 32
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $0
  call $keccak/keccakMain
  local.get $0
  i32.const 0
  i32.const 32
  call $~lib/typedarray/Uint8Array.wrap
  local.tee $0
  call $~lib/typedarray/Uint8Array#fill
  drop
  local.get $0
  i32.load
  local.get $0
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  call $main/eth2_savePostStateRoot
  i32.const 1
 )
 (func $start (; 25 ;) (type $FUNCSIG$v)
  i32.const 32992
  global.set $~lib/rt/stub/startOffset
  global.get $~lib/rt/stub/startOffset
  global.set $~lib/rt/stub/offset
 )
 (func $null (; 26 ;) (type $FUNCSIG$v)
  nop
 )
)
