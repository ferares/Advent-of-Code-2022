import { getDirSizes } from './helpers'

export default function solution(input: string): number {
  const directories = getDirSizes(input)
  let totalSize = 0
  for (const directory of directories) {
    const size = directory[1]
    if (size <= 100000) totalSize += size
  }
  return totalSize
}