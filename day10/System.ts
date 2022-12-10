export class System {
  cycle = 0
  value = 1
  screen = ''

  incrementCycle(): number {
    this.cycle++
    if (this.cycle % 40 === 1) this.screen += '\n'
    this.drawPixel()
    // Return value for part 1
    if ((this.cycle - 20) % 40 === 0) return this.cycle * this.value
    return 0
  }

  drawPixel() {
    if (this.isSpriteInView()) this.screen += '#'
    else this.screen += '.'
  }
  
  isSpriteInView(): boolean {
    const xPosition = (this.cycle - 1) % 40
    const sprite = [this.value - 1, this.value, this.value + 1]
    return sprite.includes(xPosition)
  }

  noop(): number {
    // Return value for part 1
    return this.incrementCycle()
  }

  add(value: number): number {
    let currentValue = this.incrementCycle()
    currentValue += this.incrementCycle()
    this.value += value
    // Return value for part 1
    return currentValue
  }
}