import { moveHead, moveTail } from './helpers'

export default function solution(input: string): number {
  const instructions = input.split('\n')
  const visitedPositions = ['0,0']
  const headPosition = [0, 0]
  const tailsPositions = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]
  for (const instruction of instructions) {
    const [direction, steps] = instruction.split(' ')
    for (let index = 0; index < Number(steps); index++) {
      moveHead(headPosition, direction)
      let previousSectionPosition = headPosition
      for (let tailIndex = 0; tailIndex < 9; tailIndex++) {
        moveTail(tailsPositions[tailIndex], previousSectionPosition)
        previousSectionPosition = tailsPositions[tailIndex]
      }
      const lastTailPosition = tailsPositions[8].join(',')
      if (!visitedPositions.includes(lastTailPosition)) visitedPositions.push(lastTailPosition)
    }
  }

  return visitedPositions.length
}