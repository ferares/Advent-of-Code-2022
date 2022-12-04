import { getItemPriority } from './helpers'

export default function solution(input: string): number {
  const rucksacks = input.split('\n')

  let priorities = 0

  for (let groupIndex = 0; groupIndex < rucksacks.length; groupIndex += 3) {
    const rucksack1 = rucksacks[groupIndex];
    const rucksack2 = rucksacks[groupIndex + 1];
    const rucksack3 = rucksacks[groupIndex + 2];
    for (let index = 0; index < rucksack1.length; index++) {
      const item = rucksack1[index];
      if ((rucksack2.includes(item)) && (rucksack3.includes(item))) {
        priorities += getItemPriority(item) 
        break
      } 
    }
  }

  return priorities
}