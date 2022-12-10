import { System } from './System'

export default function solution(input: string): number {
  const lines = input.split('\n')
  let relevantValues = 0
  const system = new System()
  for (const line of lines) {
    if (line === 'noop') {
      relevantValues += system.noop()
      continue
    }
    const value = Number(line.split(' ')[1])
    relevantValues += system.add(value)
  }
  return relevantValues
}