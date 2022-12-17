import { Grid } from './helpers'

export default function solution(input: string): number {
  const grid = new Grid(input)
  return grid.scannedPositions(2000000)
}
