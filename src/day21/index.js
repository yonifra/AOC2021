const _ = require("lodash")
const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())
let diceValue = 0
let diceRolls = 0

const deterministicRoll = () => {
  const result = [
    (diceValue + 1) % 100,
    (diceValue + 2) % 100,
    (diceValue + 3) % 100,
  ]
  diceValue += 3
  diceRolls += 3

  return result
}

const goA = (input, rollMethod = deterministicRoll) => {
  let player1Position = 7
  let player2Position = 9
  let player1Score = 0
  let player2Score = 0
  let currentPlayer = 1

  while (player1Score <= 1000 && player2Score <= 1000) {
    const rolledValues = rollMethod()
    if (currentPlayer === 1) {
      const currentPosition =
        _.reduce(rolledValues, (a, b) => a + b, player1Position) % 10
      player1Score += currentPosition
      player1Position = currentPosition
      currentPlayer = 2
    } else {
      const currentPosition =
        _.reduce(rolledValues, (a, b) => a + b, player2Position) % 10
      player2Score += currentPosition
      player2Position = currentPosition
      currentPlayer = 1
    }
  }

  return diceRolls * _.min([player1Score, player2Score])
}

function play(currPlayer, prevPlayer, memory = new Map()) {
  if (prevPlayer.score >= 21) return [0, 1]

  const key = JSON.stringify({ player1: currPlayer, player2: prevPlayer })
  const result = memory.get(key)
  if (result) return result

  const wins = [0, 0]
  const odds = { 3: 1, 9: 1, 4: 3, 8: 3, 5: 6, 7: 6, 6: 7 }
  for (const key in odds) {
    let position = currPlayer.position + +key
    if (position > 10) position -= 10

    const next = play(
      prevPlayer,
      { position, score: currPlayer.score + position },
      memory,
    )
    wins[0] += next[1] * odds[key]
    wins[1] += next[0] * odds[key]
  }

  memory.set(key, wins)
  return wins
}

const goB = (input) => {
  const wins = play(...[7, 9].map((p) => ({ position: p, score: 0 })))
  return Math.max(...wins)
}

/* Tests */

// test(result, expected)

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
