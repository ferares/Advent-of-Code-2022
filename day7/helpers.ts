const prefixes = {
  cd: '$ cd ',
  ls: '$ ls',
  dir: 'dir ',
}

export function getDirSizes(input: string): Map<string, number> {
  const lines = input.split(`\n`)
  const directories: Map<string, number> = new Map()
  const currentDirectories: Array<string> = []
  for (const line of lines) {
    if (line.includes(prefixes.cd)) {
      const dirName = line.replace(prefixes.cd, '').replace('/', '')
      if (dirName === '..') currentDirectories.pop()
      else {
        const currentPath = currentDirectories.length ? currentDirectories[currentDirectories.length - 1] : ''
        currentDirectories.push(`${currentPath}${dirName}/`)
      }
    } else if ((!line.includes(prefixes.dir) && (!line.includes(prefixes.ls)))) {
      const size = Number(line.split(' ')[0])
      for (const directory of currentDirectories) {
        const currentSize = directories.get(directory) || 0
        directories.set(directory, currentSize + size)
      }
    }
  }
  return directories
}