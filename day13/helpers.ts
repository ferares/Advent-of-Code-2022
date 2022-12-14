export declare type Packet = number | Packet[]

function getCloseParensIndex(input: string): number {
  let depth = 0
  let index = 0
  for (index = 0; index < input.length; index++) {
    const char = input[index]
    if (char === '[') depth++
    else if (char === ']') {
      depth--
      if (depth === 0) break
    }
  }
  return index
}

function getFirstCommaIndex(input: string): number {
  let depth = 0
  let index = 0
  for (index = 0; index < input.length; index++) {
    const char = input[index]
    if (char === '[') depth++
    else if (char === ']')
      depth--
    else if ((char === ',') && (depth === 0)) break
  }
  return index === input.length ? -1 : index
}

function parsePacket(input: string, packet: Packet[]): void {
  if (input === '') return
  if (input[0] === '[') {
    const parensIndex = getCloseParensIndex(input)
    const packetLeft = parseArray(input.substring(0, parensIndex + 1))
    packet.push(packetLeft)
    if (parensIndex + 1 >= input.length) return
    return parsePacket(input.substring(parensIndex + 2), packet)
  }
  const commaIndex = getFirstCommaIndex(input)
  packet.push(commaIndex > -1 ? Number(input.substring(0, commaIndex)) : Number(input))
  if (commaIndex === -1) return
  const inputRight = input.substring(commaIndex + 2)
  if (inputRight[0] === '[') {
    const parensIndex = getCloseParensIndex(inputRight)
    const packetRightLeft = parseArray(inputRight.substring(0, parensIndex + 1))
    packet.push(packetRightLeft)
    if (parensIndex + 1 >= inputRight.length) return
    parsePacket(inputRight.substring(parensIndex + 1), packet)
    return
  }
  parsePacket(input.substring(commaIndex + 1), packet)
}

export function parseArray(input: string): Packet {
  input = input.slice(1, -1)
  let packet: Packet = []
  if (input === '') return packet
  parsePacket(input, packet)
  return packet
}

export function checkOrder(packet1: Packet, packet2: Packet): -1 | 0 | 1 {
  if (typeof packet1 === 'object') {
    if (typeof packet2 === 'object') {
      for (let index = 0; index < packet1.length; index++) {
        if (packet2.length <= index) return 1
        const element1 = packet1[index]
        const element2 = packet2[index]
        const order = checkOrder(element1, element2)
        if (order === -1) return -1
        else if (order === 0) continue
        return 1
      }
      if (packet1.length < packet2.length) return -1
      else if (packet1.length === packet2.length) return 0
      return -1
    }
    return checkOrder(packet1, [packet2])
  }
  if (typeof packet2 === 'object') return checkOrder([packet1], packet2)
  return packet1 < packet2 ? -1 : packet1 === packet2 ? 0 : 1
}