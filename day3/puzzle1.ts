import { readInput } from '../input'

import { getItemPriority } from './helpers'

export function d3p1(): number {
  const input = readInput(3)

  const rucksacks = input.split('\n')

  let priorities = 0

  for (const rucksack of rucksacks) {
    const length = rucksack.length
    const compartment1 = rucksack.slice(0, length / 2)
    const compartment2 = rucksack.slice(length / 2, length)
    const itemTypes = []
    for (let index = 0; index < compartment1.length; index++) {
      const item = compartment1[index];
      if (itemTypes.indexOf(item) > -1) continue
      if (compartment2.includes(item)) priorities += getItemPriority(item) 
      itemTypes.push(item)
    }
  }

  return priorities
}