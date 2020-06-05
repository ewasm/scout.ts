(module
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$viiii (func (param i32 i32 i32 i32)))
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$iiiiii (func (param i32 i32 i32 i32 i32) (result i32)))
 (type $FUNCSIG$v (func))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (type $FUNCSIG$viii (func (param i32 i32 i32)))
 (type $FUNCSIG$i (func (result i32)))
 (import "watimports" "$g1m_toMontgomery" (func $websnark_bls12/bls12_g1m_toMontgomery (param i32 i32)))
 (import "watimports" "$g2m_toMontgomery" (func $websnark_bls12/bls12_g2m_toMontgomery (param i32 i32)))
 (import "watimports" "$g2m_timesScalar" (func $websnark_bls12/bls12_g2m_timesScalar (param i32 i32 i32 i32)))
 (import "watimports" "$g1m_timesScalar" (func $websnark_bls12/bls12_g1m_timesScalar (param i32 i32 i32 i32)))
 (import "watimports" "$g1m_affine" (func $websnark_bls12/bls12_g1m_affine (param i32 i32)))
 (import "watimports" "$g1m_neg" (func $websnark_bls12/bls12_g1m_neg (param i32 i32)))
 (import "watimports" "$ftm_one" (func $websnark_bls12/bls12_ftm_one (param i32)))
 (import "watimports" "$bls12_pairingEq2" (func $websnark_bls12/bls12_pairingEq2 (param i32 i32 i32 i32 i32) (result i32)))
 (import "env" "eth2_savePostStateRoot" (func $main/eth2_savePostStateRoot (param i32)))
 (memory $0 8)
 (data (i32.const 512000) "`\03\00\00\01\00\00\00\00\00\00\00`\03\00\008\d9\d4]\e0o\ac\e1^v%\f7\c1j)>Oi|\e8\ebB\b6\97?\1d\91\1e}vi\b2\88\e5\15\f2\ff\\.\92+\10\0b\c3H\80\82\00\19\8c\dalox\d7O\a6\c2\07\f5*\b4a\e7\18\a1\cb\da[\bda\aaG\8fPW\b9Hg\931\a9\bfI(\8e\cc\aa\da]:\f7z\f4Q\13\fd\ff\02\00\00\00\tv\02\00\0c\c4\0b\00\f4\eb\baX\c7SW\98H_EWRpSX\cewm\ecV\a2\97\1a\07\\\93\e4\80\fa\c3^\f6\15\c8\cd?\8e+\b4*t=+\17\c40\d8}g\a5\91\82z\c8$\d4\de\b3\80\ba\dd\05#\00,\9a5U\a1\a8Oo\c6q\edY\f0h\c8\e5\0e\aa\c0\94\da\b1\af2&\d6\c3\d2\b4\b0(\c8/\0e\9f\1c\db\a9\1a.\83\f3e=;FO\c3Z\d0:\c3\9b\deTp\d1\18\8a\dc\8f\fe\bd.\0f\aaB7+a\00holcN\f7K|k\afhN\03\9dZ\c1\a2\dd\e2*?\7fQ\82\fd\efH\13\c9\ef\ec\1f\ee\bd\d6\f5\982\94\7f\b5\00\0b*\8b\92\dd\nrGl\d1c\b0\96\ab\a8X\ac\be\af-s\a1\c8\83\d1\b2\a3\fb5\8b\98\dbcq3\\\f5\ff\n\da\d1\1e\n\af\81,\0c\00\fd\ff\02\00\00\00\tv\02\00\0c\c4\0b\00\f4\eb\baX\c7SW\98H_EWRpSX\cewm\ecV\a2\97\1a\07\\\93\e4\80\fa\c3^\f6\15")
 (data (i32.const 512448) "\f5\d8V\8d\f1M\96#\bb)\8a\cf(=\f3\d3p!`\e7\ed\1e\94v@\bb\f0d\11\fah\00\16\0d\161\c4\ff&[&\ceS\1e\ea\88\13\14)\e91\8c\82\e5_X\9ba\n\a0EL8\cc\ff\bd\dc\c3`\00\87\0e\1cH\c6\a29\8a:h\d5\b0Pj3\de\96&\de6,\19\8d\01\03\10\fd\ff\02\00\00\00\tv\02\00\0c\c4\0b\00\f4\eb\baX\c7SW\98H_EWRpSX\cewm\ecV\a2\97\1a\07\\\93\e4\80\fa\c3^\f6\15\10\n\94\02\a2\8f\f2\f5\1a\96\b4\87&\fb\f5\b3\80\e5*>\b5\93\a8\a1\e9\ae<\1a\9d\99\94\98k6c\18c\b7go\d7\bcPC\92\91\81\05\06\f6#\9eu\c0\a9\a5\c3`\cd\bc\9d\c5\a0\aa\06x\86\e2\18~\b1;g\b3A\85\cc\b6\1a\1bG\85\15\f2\0e\ed\b6\c2\f3\ed`s\t*\92\11JLI`\f8\nsLZ\9c6^\1f\fa|YZc\n\aal\85\e6\e7_I\0dn\e9\b5\ef\bb\a2%\ef\f0u\a9\d3\07\e5\da\80~\8e\fd\83\00]\b0d\df\92\fc\c0\ad\dca\14+\n\'\aa\18\a0\eb\e4;j\ac\ad\86:\a3=\c9N\\Iy\ed\ca<\a4PX\17\e7\f2\1b\dec\a1\c2+\0b\fd\ff\02\00\00\00\tv\02\00\0c\c4\0b\00\f4\eb\baX\c7SW\98H_EWRpSX\cewm\ecV\a2\97\1a\07\\\93\e4\80\fa\c3^\f6\15")
 (global $~lib/rt/stub/startOffset (mut i32) (i32.const 0))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (export "memory" (memory $0))
 (export "eth2_savePostStateRoot" (func $main/eth2_savePostStateRoot))
 (export "main" (func $main/main))
 (start $start)
 (func $~lib/rt/stub/maybeGrowMemory (; 9 ;) (type $FUNCSIG$vi) (param $0 i32)
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
 (func $~lib/rt/stub/__alloc (; 10 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
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
 (func $~lib/memory/memory.fill (; 11 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
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
 (func $~lib/arraybuffer/ArrayBufferView#constructor (; 12 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  i32.const 864
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $1
  i32.const 864
  call $~lib/memory/memory.fill
  local.get $0
  i32.eqz
  if
   i32.const 12
   i32.const 2
   call $~lib/rt/stub/__alloc
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.load
  drop
  local.get $0
  local.get $1
  i32.store
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  i32.const 864
  i32.store offset=8
  local.get $0
 )
 (func $~lib/memory/memory.copy (; 13 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
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
 (func $~lib/rt/stub/__realloc (; 14 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.const 15
  i32.and
  i32.eqz
  i32.const 0
  local.get $0
  select
  i32.eqz
  if
   unreachable
  end
  local.get $0
  i32.const 16
  i32.sub
  local.tee $2
  i32.load
  local.set $1
  local.get $2
  i32.load offset=4
  i32.const -1
  i32.ne
  if
   unreachable
  end
  i32.const 0
  local.get $1
  i32.gt_u
  if
   global.get $~lib/rt/stub/offset
   local.get $0
   local.get $1
   i32.add
   i32.eq
   if
    local.get $0
    call $~lib/rt/stub/maybeGrowMemory
    local.get $2
    i32.const 0
    i32.store
   else
    i32.const 0
    local.get $1
    i32.const 1
    i32.shl
    local.tee $1
    i32.const 0
    local.get $1
    i32.gt_u
    select
    local.get $2
    i32.load offset=8
    call $~lib/rt/stub/__alloc
    local.tee $1
    local.get $0
    local.get $2
    i32.load offset=12
    call $~lib/memory/memory.copy
    local.get $1
    local.tee $0
    i32.const 16
    i32.sub
    local.set $2
   end
  else
   global.get $~lib/rt/stub/offset
   local.get $0
   local.get $1
   i32.add
   i32.eq
   if
    local.get $0
    global.set $~lib/rt/stub/offset
    local.get $2
    i32.const 0
    i32.store
   end
  end
  local.get $2
  i32.const 0
  i32.store offset=12
  local.get $0
 )
 (func $~lib/array/ensureSize (; 15 ;) (type $FUNCSIG$vi) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  i32.const 0
  local.get $0
  i32.load offset=8
  local.tee $2
  i32.gt_u
  if
   local.get $2
   local.get $0
   i32.load
   local.tee $3
   call $~lib/rt/stub/__realloc
   local.tee $1
   i32.add
   i32.const 0
   local.get $2
   i32.sub
   call $~lib/memory/memory.fill
   local.get $1
   local.get $3
   i32.ne
   if
    local.get $0
    local.get $1
    i32.store
    local.get $0
    local.get $1
    i32.store offset=4
   end
   local.get $0
   i32.const 0
   i32.store offset=8
  end
 )
 (func $~lib/array/Array.create<u8> (; 16 ;) (type $FUNCSIG$i) (result i32)
  (local $0 i32)
  i32.const 16
  i32.const 3
  call $~lib/rt/stub/__alloc
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.tee $0
  i32.const 0
  i32.store offset=12
  local.get $0
  i32.const 864
  i32.store offset=12
  local.get $0
  i32.load offset=12
  drop
  local.get $0
  call $~lib/array/ensureSize
  local.get $0
  i32.const 0
  i32.store offset=12
  local.get $0
 )
 (func $~lib/rt/__allocArray (; 17 ;) (type $FUNCSIG$i) (result i32)
  (local $0 i32)
  (local $1 i32)
  i32.const 16
  i32.const 3
  call $~lib/rt/stub/__alloc
  local.tee $0
  i32.const 864
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $1
  i32.store
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  i32.const 864
  i32.store offset=8
  local.get $0
  i32.const 864
  i32.store offset=12
  local.get $1
  i32.const 512016
  i32.const 864
  call $~lib/memory/memory.copy
  local.get $0
 )
 (func $~lib/arraybuffer/ArrayBuffer#get:byteLength (; 18 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.const 16
  i32.sub
  i32.load offset=12
 )
 (func $~lib/typedarray/Uint8Array.wrap (; 19 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
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
   i32.const 5
   call $~lib/rt/stub/__alloc
   local.tee $3
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
 (func $~lib/arraybuffer/ArrayBufferView#get:byteOffset (; 20 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load offset=4
  local.get $0
  i32.load
  i32.sub
 )
 (func $main/main (; 21 ;) (type $FUNCSIG$v)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  call $~lib/array/Array.create<u8>
  drop
  call $~lib/rt/__allocArray
  i32.load
  local.tee $0
  i32.const 0
  i32.const 144
  call $~lib/typedarray/Uint8Array.wrap
  local.set $1
  local.get $0
  i32.const 144
  i32.const 288
  call $~lib/typedarray/Uint8Array.wrap
  local.set $2
  local.get $0
  i32.const 432
  i32.const 144
  call $~lib/typedarray/Uint8Array.wrap
  local.set $3
  local.get $0
  i32.const 576
  i32.const 288
  call $~lib/typedarray/Uint8Array.wrap
  local.set $0
  i32.const 576
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $4
  i32.const 576
  call $~lib/memory/memory.fill
  local.get $4
  call $websnark_bls12/bls12_ftm_one
  local.get $1
  i32.load
  local.get $1
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  local.get $2
  i32.load
  local.get $2
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  local.get $3
  i32.load
  local.get $3
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  local.get $0
  i32.load
  local.get $0
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  local.get $4
  call $websnark_bls12/bls12_pairingEq2
  i32.const 1
  i32.ne
  if
   unreachable
  end
 )
 (func $start (; 22 ;) (type $FUNCSIG$v)
  i32.const 512880
  global.set $~lib/rt/stub/startOffset
  i32.const 512880
  global.set $~lib/rt/stub/offset
 )
 (func $null (; 23 ;) (type $FUNCSIG$v)
  nop
 )
)
