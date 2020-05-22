(module
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$viiii (func (param i32 i32 i32 i32)))
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$iiiiii (func (param i32 i32 i32 i32 i32) (result i32)))
 (type $FUNCSIG$v (func))
 (type $FUNCSIG$i (func (result i32)))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (type $FUNCSIG$viii (func (param i32 i32 i32)))
 (import "watimports" "$g1m_toMontgomery" (func $websnark_bls12/bls12_g1m_toMontgomery (param i32 i32)))
 (import "watimports" "$g2m_toMontgomery" (func $websnark_bls12/bls12_g2m_toMontgomery (param i32 i32)))
 (import "watimports" "$g2m_timesScalar" (func $websnark_bls12/bls12_g2m_timesScalar (param i32 i32 i32 i32)))
 (import "watimports" "$g1m_timesScalar" (func $websnark_bls12/bls12_g1m_timesScalar (param i32 i32 i32 i32)))
 (import "watimports" "$g1m_affine" (func $websnark_bls12/bls12_g1m_affine (param i32 i32)))
 (import "watimports" "$g1m_neg" (func $websnark_bls12/bls12_g1m_neg (param i32 i32)))
 (import "watimports" "$ftm_one" (func $websnark_bls12/bls12_ftm_one (param i32)))
 (import "watimports" "$bls12_pairingEq2" (func $websnark_bls12/bls12_pairingEq2 (param i32 i32 i32 i32 i32) (result i32)))
 (import "watimports" "$f6m_toMontgomery" (func $websnark_bls12/bls12_f6m_toMontgomery (param i32 i32)))
 (import "watimports" "$f6m_mul" (func $websnark_bls12/bls12_f6m_mul (param i32 i32 i32)))
 (memory $0 8)
 (data (i32.const 512000) "@\02\00\00\01\00\00\00\00\00\00\00@\02\00\00\139.AJ[\fc\1c\1f\9c\96\f8K\81\fd\fclNV\d9 2N\92\00\15}\f0\85\17\e7d\d5\c9\1c_P\84\b8\d3:\10v\d8\fejw\02AM\cd\a5\a3\9b\d7\\x\06\9bb>nn\08\d3M\e1\1f!^S\d4\c8<\beNL\1df\d8\14\cc\ab\95\b8\84:m\9a[\e9\07\9e&a\05\b6U\cb\cc5\8f\0b\aaQ\82\ee\19p\9d\a3\een\16\be\c7E~J3\e8\dd6\db\a7_\f0d\e7\b7\ebYJ{\bb\87\e0E\cc /\19\91\0b\82\e3g\d6(\1bR\87\f4\d1\7f\9d\dfaTw-\aa\0e\ba\0f\d7sh+[1\0d\ec\0dM\d2\84\02\8cc\c54\0f\nF\9db5\06K\80\04\da\13h\f7\93e_\7fs\fd\c2g\15\c5\ef\88$%\c7\17\812\e5\02\e2\99\f5J\1c\ad\1aQ\0fbt.\01*sm Hw5\06\95V\19\e97\f1\8a\bc5s\ee\b5\bf\b9\94%qb\fc\c1Xl\d45\cf\d2\cd\19\'(\8a\19r\"\c9\93\8endJYi(\bd\a5\a7.U\abb\14\cc\bcA\07b\acg\80\11\a7u\bb\d16\81Y\b5phu\81m\1f4:[\0cwt2n\96\01\b4m\f4\t\91\e7;DR\0d\17\1b\b1\bb\19/@\1f\1f\9f\ecc^\c70>\96\044\ac\9b\11\05\c5\0b\9a\b9\e6\bc\b7D\d8\82:\0d\17\d1\a4p\be\f1)\90B\b0\'r$\04q\173\03\ad\cfo\c0\d7q\cfO\bd\e8W\c3&\8b\d7m\00\7f\13\de%:A\c5\ef\8b$\c9\e9\e7\d3y\8c\c6=<\ef\15\9bx\98_\df\bd\95\d3\9b\04\1b\dc\8a\ba\1f\tuKEb\c2\a4\b1\97\92\19\95z1\ed\f7\9aa\e7\c0\ac\c0\80\bct\82\a0y\c3\10\f1\80@\a8\c8\a6$\9e\8c\a9\0d\ec\0e\99\a9Y\e1v\cc\a0\c4\b4;\f1ej\d2\1f9\df\c6\d9\12\b5u\ce.u\f8`\efaD\e0\b0\b0f>Pn(\d6q\11\a9U\fb\95\ba\aa\t\a2\1d\b5\8dj\ca\ad\9d\e4\fbu\ea\94U\9d\db\87d\8b$E5\99\ed\01\ae-\d1\ea\c2\91\db\87m\a0\07<\9b?\fe\f3\d0a\fd\1f\11@\n")
 (data (i32.const 512592) " \00\00\00\01\00\00\00\00\00\00\00 \00\00\00t\"\9f\c6e\e6\c3\f4@\19\05\c1\a4T\eaW\c8\93\179\d0Z\07O\d6\04\00\f1\96\84\d6\80")
 (global $~lib/rt/stub/startOffset (mut i32) (i32.const 0))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (export "memory" (memory $0))
 (export "main" (func $main/main))
 (start $start)
 (func $~lib/rt/stub/maybeGrowMemory (; 10 ;) (type $FUNCSIG$vi) (param $0 i32)
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
 (func $~lib/rt/stub/__alloc (; 11 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
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
 (func $~lib/memory/memory.fill (; 12 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
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
 (func $~lib/arraybuffer/ArrayBufferView#constructor (; 13 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  i32.const 8
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $1
  i32.const 8
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
  i32.const 8
  i32.store offset=8
  local.get $0
 )
 (func $~lib/memory/memory.copy (; 14 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
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
 (func $~lib/rt/stub/__realloc (; 15 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
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
 (func $~lib/array/ensureSize (; 16 ;) (type $FUNCSIG$vi) (param $0 i32)
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
 (func $~lib/array/Array.create<u8> (; 17 ;) (type $FUNCSIG$i) (result i32)
  (local $0 i32)
  i32.const 16
  i32.const 3
  call $~lib/rt/stub/__alloc
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.tee $0
  i32.const 0
  i32.store offset=12
  local.get $0
  i32.const 8
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
 (func $~lib/rt/__allocArray (; 18 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  i32.const 16
  i32.const 3
  call $~lib/rt/stub/__alloc
  local.tee $2
  local.get $0
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $3
  i32.store
  local.get $2
  local.get $3
  i32.store offset=4
  local.get $2
  local.get $0
  i32.store offset=8
  local.get $2
  local.get $0
  i32.store offset=12
  local.get $1
  if
   local.get $3
   local.get $1
   local.get $0
   call $~lib/memory/memory.copy
  end
  local.get $2
 )
 (func $~lib/arraybuffer/ArrayBuffer#get:byteLength (; 19 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.const 16
  i32.sub
  i32.load offset=12
 )
 (func $~lib/typedarray/Uint8Array.wrap (; 20 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
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
 (func $~lib/arraybuffer/ArrayBuffer#constructor (; 21 ;) (type $FUNCSIG$i) (result i32)
  (local $0 i32)
  i32.const 288
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $0
  i32.const 288
  call $~lib/memory/memory.fill
  local.get $0
 )
 (func $~lib/arraybuffer/ArrayBufferView#get:byteOffset (; 22 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load offset=4
  local.get $0
  i32.load
  i32.sub
 )
 (func $~lib/typedarray/Uint8Array#__get (; 23 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  local.get $0
  i32.load offset=8
  i32.ge_u
  if
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.add
  i32.load8_u
 )
 (func $main/main (; 24 ;) (type $FUNCSIG$i) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  call $~lib/array/Array.create<u8>
  drop
  i32.const 576
  i32.const 512016
  call $~lib/rt/__allocArray
  i32.load
  local.tee $0
  i32.const 0
  i32.const 288
  call $~lib/typedarray/Uint8Array.wrap
  local.set $1
  local.get $0
  i32.const 288
  i32.const 288
  call $~lib/typedarray/Uint8Array.wrap
  local.set $0
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $3
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $6
  call $~lib/arraybuffer/ArrayBuffer#constructor
  drop
  call $~lib/arraybuffer/ArrayBuffer#constructor
  drop
  local.get $1
  i32.load
  local.get $1
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  local.get $3
  call $websnark_bls12/bls12_f6m_toMontgomery
  local.get $0
  i32.load
  local.get $0
  call $~lib/arraybuffer/ArrayBufferView#get:byteOffset
  i32.add
  local.get $6
  call $websnark_bls12/bls12_f6m_toMontgomery
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $2
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $4
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $5
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $1
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $0
  local.get $3
  local.get $6
  local.get $1
  call $websnark_bls12/bls12_f6m_mul
  local.get $3
  local.get $1
  local.get $0
  call $websnark_bls12/bls12_f6m_mul
  i32.const 0
  local.set $3
  loop $loop|0
   local.get $3
   i32.const 135
   i32.lt_s
   if
    local.get $1
    local.get $0
    local.get $2
    call $websnark_bls12/bls12_f6m_mul
    local.get $0
    local.get $2
    local.get $4
    call $websnark_bls12/bls12_f6m_mul
    local.get $2
    local.get $4
    local.get $5
    call $websnark_bls12/bls12_f6m_mul
    local.get $4
    local.get $5
    local.get $1
    call $websnark_bls12/bls12_f6m_mul
    local.get $5
    local.get $1
    local.get $0
    call $websnark_bls12/bls12_f6m_mul
    local.get $1
    local.get $0
    local.get $2
    call $websnark_bls12/bls12_f6m_mul
    local.get $0
    local.get $2
    local.get $4
    call $websnark_bls12/bls12_f6m_mul
    local.get $2
    local.get $4
    local.get $5
    call $websnark_bls12/bls12_f6m_mul
    local.get $4
    local.get $5
    local.get $1
    call $websnark_bls12/bls12_f6m_mul
    local.get $5
    local.get $1
    local.get $0
    call $websnark_bls12/bls12_f6m_mul
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $loop|0
   end
  end
  local.get $0
  i32.const 0
  i32.const 32
  call $~lib/typedarray/Uint8Array.wrap
  local.set $1
  call $~lib/array/Array.create<u8>
  drop
  i32.const 32
  i32.const 512608
  call $~lib/rt/__allocArray
  i32.load
  i32.const 0
  i32.const 32
  call $~lib/typedarray/Uint8Array.wrap
  local.set $0
  local.get $1
  i32.const 0
  call $~lib/typedarray/Uint8Array#__get
  local.get $0
  i32.const 0
  call $~lib/typedarray/Uint8Array#__get
  i32.ne
  if
   unreachable
  end
  local.get $1
  i32.const 1
  call $~lib/typedarray/Uint8Array#__get
  local.get $0
  i32.const 1
  call $~lib/typedarray/Uint8Array#__get
  i32.ne
  if
   unreachable
  end
  local.get $1
  i32.const 2
  call $~lib/typedarray/Uint8Array#__get
  local.get $0
  i32.const 2
  call $~lib/typedarray/Uint8Array#__get
  i32.ne
  if
   unreachable
  end
  i32.const 1
 )
 (func $start (; 25 ;) (type $FUNCSIG$v)
  i32.const 512640
  global.set $~lib/rt/stub/startOffset
  i32.const 512640
  global.set $~lib/rt/stub/offset
 )
 (func $null (; 26 ;) (type $FUNCSIG$v)
  nop
 )
)
