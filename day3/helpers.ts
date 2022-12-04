export function getItemPriority(item: string): number {
  const charCode = item.charCodeAt(0)
  const value = charCode - 96
  if (value > 0) return value
  return charCode - 38
}