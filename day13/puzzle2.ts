import { checkOrder, parseArray, Packet } from './helpers'

export default function solution(input: string): number {
  const pairs = input.split('\n\n')
  const marker1 = [[2]]
  const marker2 = [[6]]
  let packets: Packet[] = []
  for (let index = 0; index < pairs.length; index++) {
    const pair = pairs[index]
    const [packet1, packet2] = pair.split('\n').map(parseArray)
    packets.push(packet1, packet2)
  }
  packets.push(marker1, marker2)
  packets.sort(checkOrder)
  return (packets.indexOf(marker1) + 1) * (packets.indexOf(marker2) + 1)
}