import { readInput } from './input'

const args = process.argv.slice(2)

async function runSolution(day: string, puzzle: string) {
  const solution = await import(`./day${day}/puzzle${puzzle}`)
  const input = readInput(day)
  console.log(solution.default(input))
}

const day = args[0]
const puzzle = args[1]
if ((day) && (puzzle)) {
  runSolution(day, puzzle)
}
