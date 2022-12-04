export default function solution(input: string): number {  
  const plays = input.split('\n')
  
  let totalScore = 0
  
  for (const play of plays) {
    let playScore = 0
    const [player1, player2] = play.split(' ')
    if (player2 === 'X') {
      playScore += 1
      if (player1 === 'A') playScore += 3
      else if (player1 === 'B') playScore += 0
      else if (player1 === 'C') playScore += 6
    } else if (player2 === 'Y') {
      playScore += 2
      if (player1 === 'A') playScore += 6
      else if (player1 === 'B') playScore += 3
      else if (player1 === 'C') playScore += 0
    } else if (player2 === 'Z') {
      playScore += 3
      if (player1 === 'A') playScore += 0
      else if (player1 === 'B') playScore += 6
      else if (player1 === 'C') playScore += 3
    }
    totalScore += playScore
  }
  
  return totalScore
}