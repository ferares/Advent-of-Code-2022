import { getMarkerPosition } from './helpers'

export default function solution(input: string): number {
  return getMarkerPosition(input, 4)
}