declare type Range = [number, number]

declare type Coordinates = { x: number, y: number }

class Sensor {
  coordinates: Coordinates
  beacon: Coordinates

  constructor(coordinates: Coordinates, beacon: Coordinates) {
    this.coordinates = coordinates
    this.beacon = beacon
  }

  rangeOnRow(row: number): Range | null {
    const { x: xs, y: ys } = this.coordinates
    const { x: xb, y: yb } = this.beacon
    const diff = Math.abs(xs - xb) + Math.abs(ys - yb)
    if ((row >= ys - diff) && (row <= ys + diff)) {
      const offset = row <= ys ? row - (ys - diff) : (ys + diff) - row
      let start = xs - offset
      let end = xs + offset
      return [start, end]
    }
    return null
  }
}

export class Grid {
  sensors: Sensor[]

  constructor(input: string) {
    const lines = input.split('\n')
    this.sensors = []
    for (const line of lines) {
      const regex = /.*x=(-?\d+).*y=(-?\d+).*x=(-?\d+).*y=(-?\d+)/gm
      const data = regex.exec(line)
      if (!data) continue
      const [_, xs, ys, xb, yb] = data.map(Number)
      this.sensors.push(new Sensor({ x: xs, y: ys }, { x: xb, y: yb }))
    }
  }

  rangesOnRow(row: number): Range[] {
    const ranges: Range[] = []
    for (const sensor of this.sensors) {
      const range = sensor.rangeOnRow(row)
      if (range) ranges.push(range)
    }
    return this.mergeRanges(ranges)
  }

  mergeRanges(ranges: Range[]): Range[] {
    const merged: Range[] = []
    ranges.sort((rangeA: Range, rangeB: Range) => rangeA[0] - rangeB[0])
    let previousRange = ranges[0]
    for (let index = 1; index < ranges.length; index++) {
      const range = ranges[index];
      if (previousRange[1] >= range[0]) {
        previousRange = [previousRange[0], Math.max(range[1], previousRange[1])]
        continue
      }
      merged.push(previousRange)
      previousRange = range
    }
    merged.push(previousRange)
    return merged
  }

  scannedPositions(row: number): number {
    let total = 0
    const ranges = this.rangesOnRow(row)
    for (const range of ranges) {
      let start = range[0]
      let end = range[1]
      total += end - start
    }
    return total
  }

  possiblePositionFrequency(limits: Range): number {
    const [start, end] = limits
    let coordinates: Coordinates | undefined
    for (let row = start; row <= end; row++) {
      const ranges = this.rangesOnRow(row)
      for (const range of ranges) {
        if (range[0] <= start) {
          if (range[1] >= end) {
            continue
          }
          coordinates = { x: range[1] + 1, y: row }
        }
        coordinates = { x: range[0] - 1, y: row }
      }
    }
    if (coordinates) return coordinates.x * 4000000 + coordinates.y
    return -1
  }
}