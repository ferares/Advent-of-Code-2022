import { d1p1 } from './day1/puzzle1'
import { d1p2 } from './day1/puzzle2'

const args = process.argv.slice(2)

type Solutions = {
  [index: string]: {
    [index: string]: () => any,
  }
}

const solutions: Solutions = {
  '1': {
    '1': d1p1,
    '2': d1p2,
  },}

const day = args[0]
const puzzle = args[1]
if ((day) && (puzzle)) {
  console.log(solutions[day][puzzle]())
}
