export default function solution(input: string): number {  
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