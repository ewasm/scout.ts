import json
import binascii

public_input = None
vk = None
proof = None

def count_to_8_bytes(count):
  return binascii.hexlify(count.to_bytes(8, 'little')).decode()

def num_to_hex(g1):
  result = bytearray.fromhex(hex(int(g1))[2:].zfill(64))
  result.reverse()
  return binascii.hexlify(result).decode()

def serialize_f2(x):
  return serialize_f1(x[0]) + serialize_f1(x[1]) + num_to_hex(x[2][0]) + num_to_hex(x[2][1])

def serialize_f1(x):
  if len(x) == 3:
    return num_to_hex(x[0]) + num_to_hex(x[1]) + num_to_hex(x[2])
  else:
    return num_to_hex(x[0]) + num_to_hex(x[1])

with open("public.json") as f:
  public_input = json.load(f)

with open("verification_key.json") as f:
  vk = json.load(f)

with open("proof.json") as f:
  proof = json.load(f)

proof_a = serialize_f1(proof['pi_a'])
proof_b = serialize_f2(proof['pi_b'])
proof_c = serialize_f1(proof['pi_c'])

vk_a = serialize_f1(vk['vk_alfa_1'])
vk_b = serialize_f2(vk['vk_beta_2'])
vk_g = serialize_f2(vk['vk_gamma_2'])
vk_d = serialize_f2(vk['vk_delta_2'])

ics = ''

num_ics = count_to_8_bytes(len(vk['IC']))
ics += num_ics

for ic in vk['IC']:
  ics += serialize_f1(ic)

num_public = count_to_8_bytes(len(public_input['input']))
public_inputs = num_public

for p in public_input['input']:
  public_inputs += num_to_hex(p)

print("serialized proof:")
print(vk_a + vk_b + vk_g + vk_d + proof_a + proof_b + proof_c + ics + public_inputs)
