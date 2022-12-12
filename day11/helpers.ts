export declare type Monkey = {
  items: Array<number>
  operation: (worryLevel: number) => number
  test: (worryLevel: number) => number
  inspections: number,
  testParam: number,
}

export function getModule(monkeys: Array<Monkey>): number {
  let modulo = 1
  for (const monkey of monkeys) {
    modulo *= monkey.testParam
  }
  return modulo
}

export function loadMonkeys(input: string): Array<Monkey> {
  const monkeyInputs = input.split('\n\n')
  const monkeys: Array<Monkey> = []
  for (const monkeyInput of monkeyInputs) {
    const monkeyData = monkeyInput.split('\n')
    const operationParams = monkeyData[2].split(': new = ')[1].split(' ')
    const testParam = Number(monkeyData[3].split(': divisible by ')[1])
    const testTrue = Number(monkeyData[4].split(': throw to monkey ')[1])
    const testFalse = Number(monkeyData[5].split(': throw to monkey ')[1])
    const monkey: Monkey = {
      items: monkeyData[1].split(': ')[1].split(', ').map(item => Number(item)),
      operation: (worryLevel: number): number => {
        let param1 = worryLevel
        let param2 = worryLevel
        if (operationParams[0] !== 'old') {
          param1 = Number(operationParams[0])
        }
        if (operationParams[2] !== 'old') {
          param2 = Number(operationParams[2])
        }
        if (operationParams[1] === '*') {
          return param1 * param2
        }
        return param1 + param2
      },
      test: (worryLevel: number): number => {
        const divisible = worryLevel % testParam === 0
        if (divisible) return testTrue
        return testFalse
      },
      inspections: 0,
      testParam,
    }
    monkeys.push(monkey)
  }
  return monkeys
}