import { Grid } from './helpers'

export default function solution(input: string): any {
  const grid = new Grid(input)
  let bestResult = Number.POSITIVE_INFINITY
  for (const row of grid.positions) {
    for (const position of row) {
      if (position.height === 'a'.charCodeAt(0)) {
        position.distance = 0
        const result = grid.findPath(position)
        if (result < bestResult) bestResult = result
      }
      grid.reset()
    }
  }
  return bestResult
}