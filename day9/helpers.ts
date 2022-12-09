function getTailMovement(tailCoordinate: number, headCoordinate: number): number {
  if (tailCoordinate > headCoordinate) return tailCoordinate - 1
  return tailCoordinate + 1
}

export function moveHead(headPosition: number[], direction: string) {
  if (direction === 'U') headPosition[1] -= 1
  if (direction === 'D') headPosition[1] += 1
  if (direction === 'R') headPosition[0] += 1
  if (direction === 'L') headPosition[0] -= 1
}

export function moveTail(tailPosition: number[], headPosition: number[]) {
  if (Math.abs(tailPosition[0] - headPosition[0]) > 1) {
    tailPosition[0] = getTailMovement(tailPosition[0], headPosition[0])
    if (Math.abs(tailPosition[1] - headPosition[1]) > 0) {
      tailPosition[1] = getTailMovement(tailPosition[1], headPosition[1])
    }
  } else if (Math.abs(tailPosition[1] - headPosition[1]) > 1) {
    tailPosition[1] = getTailMovement(tailPosition[1], headPosition[1])
    if (Math.abs(tailPosition[0] - headPosition[0]) > 0) {
      tailPosition[0] = getTailMovement(tailPosition[0], headPosition[0])
    }
  }
}