import { d1p1 } from './day1/puzzle1'
import { d1p2 } from './day1/puzzle2'
import { d2p1 } from './day2/puzzle1'
import { d2p2 } from './day2/puzzle2'
import { d3p1 } from './day3/puzzle1'
import { d3p2 } from './day3/puzzle2'

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
  },
  '2': {
    '1': d2p1,
    '2': d2p2,
  },
  '3': {
    '1': d3p1,
    '2': d3p2,
  },}

const day = args[0]
const puzzle = args[1]
if ((day) && (puzzle)) {
  console.log(solutions[day][puzzle]())
}
