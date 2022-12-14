import { Cave } from './helpers'

export default function solution(input: string): number {
  const cave = new Cave(input)
  let sand = 0
  while (!cave.sandBlocked) {
    if (cave.moveSand()) sand++
  }
  return sand
}