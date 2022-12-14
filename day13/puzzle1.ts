import { checkOrder, parseArray } from './helpers'

export default function solution(input: string): number {
  const pairs = input.split('\n\n')
  let result = 0
  for (let index = 0; index < pairs.length; index++) {
    const pair = pairs[index]
    const [packet1, packet2] = pair.split('\n').map(parseArray)
    if (checkOrder(packet1, packet2) === -1) result += index + 1
  }
  return result
}