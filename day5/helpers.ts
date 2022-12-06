export type Pile = Array<string>
export type Instruction = { quantity: number, from: number, to: number }
export type Input = {
  piles: Array<Pile>,
  instructions: Array<Instruction>,
}

export function parseInput(input: string): Input {
  // Separate input in initial state and instructions
  const [stateInput, instructionsInput] = input.split('\n\n')

  // Split the initial state in levels
  const levels = stateInput.split('\n')

  // Remove last lines from levels (pile numbers)
  levels.splice(levels.length - 1, 1)

  const piles: Array<Pile> = []
  for (const level of levels) {
    // Parse each level to get the box for each pile at that level
    const pileRegex = /\[([A-Z])\]|(\s{3})[\s\n]/gm;
    let boxes = pileRegex.exec(level)
    // Pile index
    let index = 0
    while (boxes) {
      // Select the current pile (init it if it's not yet defined)
      if (!piles[index]) piles[index] = []
      const pile = piles[index]
      // If there's a box for this pile add it
      if (boxes[1]) pile.push(boxes[1])
      // Get the next box
      boxes = pileRegex.exec(level)
      // Move to the next pile
      index++
    }
  }

  const instructionLines = instructionsInput.split('\n')

  const instructions: Array<Instruction> = []
  for (const instructionLine of instructionLines) {
    const instructionRegex = /move (\d+) from (\d+) to (\d+)/gm;
    let parameters = instructionRegex.exec(instructionLine)
    if (parameters) {
      instructions.push({
        quantity: Number(parameters[1]),
        from: Number(parameters[2]) - 1,
        to: Number(parameters[3]) - 1,
      })
    }
  }
  return { piles, instructions }
}

export function processInstruction(piles: Array<Pile>, instruction: Instruction, crateModel: string = '9000'): void {
  const { quantity, from, to } = instruction
  const taken = piles[from].splice(0, quantity)
  if (crateModel === '9000') taken.reverse()
  piles[to].unshift(...taken)
}

export function processInstructions(piles: Array<Pile>, instructions: Array<Instruction>, crateModel: string = '9000'): void {
  for (const instruction of instructions) {
    processInstruction(piles, instruction, crateModel)
  }
}

export function getTopBoxes(piles: Array<Pile>): string {
  let topBoxes = ''
  for (const pile of piles) {
    const topBox = pile[0]
    if (topBox) topBoxes += topBox
  }
  return topBoxes
}