const args = process.argv.slice(2)

type Solutions = {
  [index: string]: {
    [index: string]: () => any,
  }
}

const solutions: Solutions = {}

const day = args[0]
const puzzle = args[1]
if ((day) && (puzzle)) {
  console.log(solutions[day][puzzle]())
}
