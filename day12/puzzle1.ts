import { Grid } from './helpers'

export default function solution(input: string): any {
  const grid = new Grid(input)
  return grid.findPath(grid.start)
}