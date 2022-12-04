export default function solution(input: string): number {
  const plays = input.split('\n')
  
  let totalScore = 0
  
  for (const play of plays) {
    let playScore = 0
    const [player1, player2] = play.split(' ')
    if (player2 === 'X') {
      playScore += 0
      if (player1 === 'A') playScore += 3
      else if (player1 === 'B') playScore += 1
      else if (player1 === 'C') playScore += 2
    } else if (player2 === 'Y') {
      playScore += 3
      if (player1 === 'A') playScore += 1
      else if (player1 === 'B') playScore += 2
      else if (player1 === 'C') playScore += 3
    } else if (player2 === 'Z') {
      playScore += 6
      if (player1 === 'A') playScore += 2
      else if (player1 === 'B') playScore += 3
      else if (player1 === 'C') playScore += 1
    }
    totalScore += playScore
  }
  
  return totalScore
}