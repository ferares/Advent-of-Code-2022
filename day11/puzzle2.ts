import { getModule, loadMonkeys, Monkey } from './helpers'

export default function solution(input: string): number {
  const monkeys = loadMonkeys(input)
  const module = getModule(monkeys)
  for (let index = 0; index < 10000; index++) {
    for (const monkey of monkeys) {
      const items = [...monkey.items]
      for (const item of items) {
        const worryLevel = monkey.operation(item) % module
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