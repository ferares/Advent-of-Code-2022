export default function solution(input: string): number {
  const pairs = input.split('\n')

  let totalOverlaps = 0
  
  for (const pair of pairs) {
    const [range1, range2] = pair.split(',')
    const [first1, last1] = range1.split('-').map((item) => Number(item))
    const [first2, last2] = range2.split('-').map((item) => Number(item))
    if (
      ((first1 <= first2) && (last1 >= first2)) ||
      ((first2 <= first1) && (last2 >= first1)) ||
      ((first1 <= first2) && (last1 >= last2)) ||
      ((first2 <= first1) && (last2 >= last1))
    ) totalOverlaps++
  }
  
  return totalOverlaps
}

