import { System } from './System'

export default function solution(input: string): string {
  const lines = input.split('\n')
  const system = new System()
  for (const line of lines) {
    if (line === 'noop') {
      system.noop()
      continue
    }
    const value = Number(line.split(' ')[1])
    system.add(value)
  }
  return system.screen
}