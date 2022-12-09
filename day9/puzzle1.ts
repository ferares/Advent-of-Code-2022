import { moveHead, moveTail } from './helpers'

export default function solution(input: string): number {
  const instructions = input.split('\n')
  const visitedPositions = ['0,0']
  const headPosition = [0, 0]
  const tailPosition = [0, 0]
  for (const instruction of instructions) {
    const [direction, steps] = instruction.split(' ')
    for (let index = 0; index < Number(steps); index++) {
      moveHead(headPosition, direction)
      moveTail(tailPosition, headPosition)
      if (!visitedPositions.includes(tailPosition.join(','))) visitedPositions.push(tailPosition.join(','))
    }
  }

  return visitedPositions.length
}