import { readFileSync } from 'fs'

export function readInput(day: number): string {
  return readFileSync(`./input/${day}.txt`).toString()
}