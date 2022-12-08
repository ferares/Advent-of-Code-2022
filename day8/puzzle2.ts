function treeScenicScore(rowIndex: number, columnIndex: number, grid: number[][]): number {
  const rowCount = grid.length
  const columnCount = grid[0].length
  const tree = grid[rowIndex][columnIndex]
  // Visible from top edge
  let scenicScoreUp = 0
  for (let index = rowIndex - 1; index >= 0; index--) {
    const otherTree = grid[index][columnIndex];
    scenicScoreUp++
    if (otherTree >= tree) break
  }
  // Visible from bottom edge
  let scenicScoreBottom = 0
  for (let index = rowIndex + 1; index < rowCount; index++) {
    const otherTree = grid[index][columnIndex];
    scenicScoreBottom++
    if (otherTree >= tree) break
  }
  // Visible from left edge
  let scenicScoreLeft = 0
  for (let index = columnIndex - 1; index >= 0; index--) {
    const otherTree = grid[rowIndex][index];
    scenicScoreLeft++
    if (otherTree >= tree) break
  }
  // Visible from right edge
  let scenicScoreRight = 0
  for (let index = columnIndex + 1; index < columnCount; index++) {
    const otherTree = grid[rowIndex][index];
    scenicScoreRight++
    if (otherTree >= tree) break
  }
  return scenicScoreUp * scenicScoreBottom * scenicScoreLeft * scenicScoreRight
}

export default function solution(input: string): number {
  const rows = input.split('\n')
  const grid = rows.map((row) => row.split('').map(Number))
  let bestScenicScore = 0
  // Iterate over inner trees (edge trees have a scenic score of 0)
  for (let rowIndex = 1; rowIndex < grid.length - 1; rowIndex++) {
    const row = grid[rowIndex];
    for (let columnIndex = 1; columnIndex < row.length - 1; columnIndex++) {
      const scenicScore = treeScenicScore(rowIndex, columnIndex, grid)
      if (scenicScore > bestScenicScore) bestScenicScore = scenicScore
    }
  }
  return bestScenicScore
}