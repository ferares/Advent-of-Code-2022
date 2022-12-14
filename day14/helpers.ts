export class Cave {
  blocks: Map<string, boolean>
  sandOrigin: [number, number] = [500, 0]
  currentSand: [number, number]
  bottomBlock: number
  sandBlocked: boolean = false
  reachVoid: boolean = false
  floorLevel: number
  
  constructor(input: string) {
    this.blocks = new Map()
    this.currentSand = [...this.sandOrigin]
    this.bottomBlock = 0
    const lines = input.split('\n')
    for (const line of lines) {
      const paths = line.split(' -> ')
      for (let index = 0; index < paths.length - 1; index++) {
        const start = paths[index].split(',').map(Number)
        const end = paths[index + 1].split(',').map(Number)
        const startX = start[0] < end[0] ? start[0] : end[0]
        const startY = start[1] < end[1] ? start[1] : end[1]
        const endX = start[0] < end[0] ? end[0] : start[0]
        const endY = start[1] < end[1] ? end[1] : start[1]
        for (let x = startX; x < endX + 1; x++) {
          for (let y = startY; y < endY + 1; y++) {
            this.blocks.set(this.coordinateToKey(x, y), true)
            if (y > this.bottomBlock) this.bottomBlock = y
          }
        }
      }
    }
    this.floorLevel = this.bottomBlock + 2
  }

  coordinateToKey(x: number, y: number): string {
    return `${x},${y}`
  }

  moveSandTo(x: number, y: number): boolean {
    const key = this.coordinateToKey(x, y)
    if ((!this.blocks.has(key)) && (this.floorLevel > y)) {
      const [currentX, currentY] = this.currentSand
      const currentKey = this.coordinateToKey(currentX, currentY)
      this.blocks.delete(currentKey)
      this.blocks.set(key, true)
      this.currentSand = [x, y]
      this.reachVoid = y >= this.bottomBlock
      return true
    }
    return false
  }

  moveSand(): boolean {
    const [x, y] = this.currentSand
    if (this.moveSandTo(x, y + 1)) return false
    if (this.moveSandTo(x - 1, y + 1)) return false
    if (this.moveSandTo(x + 1, y + 1)) return false
    const [xo, yo] = this.sandOrigin
    if ((x === xo) && (y === yo)) this.sandBlocked = true
    this.currentSand = [xo, yo]
    return true
  }
}