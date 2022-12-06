import { getTopBoxes, parseInput, processInstructions } from './helpers'

export default function solution(input: string): string {
  let { piles, instructions } = parseInput(input)
  processInstructions(piles, instructions)
  return getTopBoxes(piles)
}