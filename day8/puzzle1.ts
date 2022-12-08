function isVisible(rowIndex: number, columnIndex: number, grid: number[][]): boolean {
  const rowCount = grid.length
  const columnCount = grid[0].length
  const tree = grid[rowIndex][columnIndex]
  let visible = true
  // Visible from top edge
  for (let index = 0; index < rowIndex; index++) {
    const otherTree = grid[index][columnIndex];
    if (otherTree >= tree) {
      visible = false
      break
    }
  }
  if (visible) return visible
  visible = true
  // Visible from bottom edge
  for (let index = rowCount - 1; index > rowIndex; index--) {
    const otherTree = grid[index][columnIndex];
    if (otherTree >= tree) {
      visible = false
      break
    }
  }
  if (visible) return visible
  visible = true
  // Visible from left edge
  for (let index = 0; index < columnIndex; index++) {
    const otherTree = grid[rowIndex][index];
    if (otherTree >= tree) {
      visible = false
      break
    }
  }
  if (visible) return visible
  visible = true
  // Visible from right edge
  for (let index = columnCount - 1; index > columnIndex; index--) {
    const otherTree = grid[rowIndex][index];
    if (otherTree >= tree) {
      visible = false
      break
    }
  }
  return visible
}

export default function solution(input: string): number {
  const rows = input.split('\n')
  const grid = rows.map((row) => row.split('').map(Number))
  const rowCount = grid.length
  const columnCount = grid[0].length
  // Start the count of visible trees with the edge trees
  let visibleTrees = 2 * (rowCount + columnCount) - 4
  // Iterate over inner trees
  for (let rowIndex = 1; rowIndex < grid.length - 1; rowIndex++) {
    const row = grid[rowIndex];
    for (let columnIndex = 1; columnIndex < row.length - 1; columnIndex++) {
      if (isVisible(rowIndex, columnIndex, grid)) visibleTrees++
    }
  }
  return visibleTrees
}