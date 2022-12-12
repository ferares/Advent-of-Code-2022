import { loadMonkeys, Monkey } from './helpers'

export default function solution(input: string): number {
  const monkeys = loadMonkeys(input)
  for (let index = 0; index < 20; index++) {
    for (const monkey of monkeys) {
      const items = [...monkey.items]
      for (const item of items) {
        const worryLevel = Math.floor(monkey.operation(item) / 3)
        const nextMonkey = monkey.test(worryLevel)
        monkey.items.shift()
        monkeys[nextMonkey].items.push(worryLevel)
        monkey.inspections++
      }
    }
  }
  monkeys.sort((monkeyA: Monkey, monkeyB: Monkey) =>  monkeyB.inspections - monkeyA.inspections)
  return monkeys[0].inspections * monkeys[1].inspections
}