export function getMarkerPosition(input: string, length: number): number {
  for (let i = 0; i < input.length; i++) {
    const chars = [input[i]]
    for (let j = i + 1; j < input.length; j++) {
      const char = input[j]
      if (chars.includes(char)) break
      chars.push(char)      
      if (chars.length >= length) return j + 1
    }
  }
  return 0
}