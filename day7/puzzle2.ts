import { getDirSizes } from './helpers'

export default function solution(input: string): number {
  const diskSize = 70000000
  const requiredFree = 30000000
  const directories = getDirSizes(input)
  const usedSpace = directories.get('/') || 0
  const freeSpace = diskSize - usedSpace
  if (freeSpace >= requiredFree) return 0
  let sizeToDelete = diskSize
  for (const directory of directories) {
    const size = directory[1]
    if ((freeSpace + size >= requiredFree) && (size < sizeToDelete)) sizeToDelete = size
  }
  return sizeToDelete
}