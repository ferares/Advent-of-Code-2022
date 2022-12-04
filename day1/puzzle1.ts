import { readInput } from '../input'

export function d1p1(): number {
  const input = readInput(1)
  
  const elfs = input.split('\n\n')
  
  let max = 0
  for (const elf of elfs) {
    const items = elf.split('\n')
    let elfTotal = 0
    for (const item of items) {
      elfTotal += Number(item)
    }
    if (max < elfTotal) max = elfTotal
  }
  
  return max
}