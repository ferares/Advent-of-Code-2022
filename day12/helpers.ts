export declare type Position = {
  row: number
  column: number
  height: number
  visited: boolean
  touched: boolean
  start: boolean
  end: boolean
  distance: number
}

export class Grid {
  positions: Position[][] = []
  start!: Position
  end!: Position

  constructor(input:string) {
    const rawPositions = input.split('\n').map(line => line.split(''))
    for (let rowIndex = 0; rowIndex < rawPositions.length; rowIndex++) {
      const row = rawPositions[rowIndex]
      this.positions[rowIndex] = []
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const column = row[columnIndex]
        let start = false
        let end = false
        let height = column.charCodeAt(0)
        if (column === 'S') {
          start = true
          height = 'a'.charCodeAt(0)
        } else if (column === 'E') {
          end = true
          height = 'z'.charCodeAt(0)
        }
        const position = {
          row: rowIndex,
          column: columnIndex,
           height,
          visited: start,
          touched: start,
          start,
          end,
          distance: start ? 0 : Number.POSITIVE_INFINITY,
        }
        this.positions[rowIndex].push(position)
        if (start) this.start = position
        else if (end) this.end = position
      }
    }
  }

  getPosition(coordinates: [number, number]): Position {
    return this.positions[coordinates[0]][coordinates[1]]
  }

  validPosition(coordinates: [number, number]): boolean {
    const maxRow = this.positions.length
    const maxColumn = this.positions[0].length
    const [row, column] = coordinates
    return (row >= 0) && (row < maxRow) && (column >= 0) && (column < maxColumn)
  }

  canMoveToPosition(start: Position, position: Position): boolean {
    return (start.height - position.height >= -1)
  }

  getAdjacents(position: Position): Position[] {
    const { row, column } = position
    const adjacents: [number, number][] = [[row, column + 1], [row - 1, column], [row + 1, column], [row, column - 1]]
    const validAdjacents: Position[] = []
    for (const adjacent of adjacents) {
      if (this.validPosition(adjacent)) {
        validAdjacents.push(this.getPosition(adjacent))
      }
    }
    return validAdjacents
  }

  getCandidates(position: Position): Position[] {
    const adjacents: Position[] = this.getAdjacents(position)
    const candidates: Position[] = []
    for (const adjacent of adjacents) {
      if ((!adjacent.visited) && (this.canMoveToPosition(position, adjacent))) {
        candidates.push(adjacent)
      }
    }
    return candidates
  }

  setPositionDistance(position: Position, distance: number) {
    position.distance = distance
    position.touched = false
  }

  setPositionVisited(position: Position, visited: boolean) {
    position.visited = visited
    position.touched = true
  }

  getOptimizedCandidates(position: Position): Position[] {
    const candidates = this.getCandidates(position)
    const optimizedCandidates: Position[] = []
    for (const candidate of candidates) {
      let betterPath = false
      if (candidate.distance < position.distance + 1) continue
      if ((candidate.distance === position.distance + 1) && (candidate.touched)) continue
      this.setPositionDistance(candidate, position.distance + 1)
      const adjacents = this.getAdjacents(candidate)
      for (const adjacent of adjacents) {
        if (
          (adjacent !== position) &&
          (this.canMoveToPosition(adjacent, candidate)) &&
          (candidate.distance > adjacent.distance + 1)
        ) {
          this.setPositionDistance(candidate, adjacent.distance + 1)
          betterPath = true
        }
      }
      if (!betterPath) optimizedCandidates.push(candidate)
    }
    return optimizedCandidates
  }

  findPath(current: Position): number {
    if (current.end) return current.distance
    if (current.distance >= this.end.distance) return current.distance
    const candidates = this.getOptimizedCandidates(current)
    for (const candidate of candidates) {
      this.setPositionVisited(candidate, true)
      this.findPath(candidate)
      this.setPositionVisited(candidate, false)
    }
    return this.end.distance
  }

  reset() {
    for (const row of this.positions) {
      for (const position of row) {
        position.visited = position.start
        position.touched = position.start
        position.distance = position.start ? 0 : Number.POSITIVE_INFINITY
      }
    }
  }
}