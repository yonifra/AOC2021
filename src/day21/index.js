const _ = require('lodash')
const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())
let diceValue = 0
let diceRolls = 0

const deterministicRoll = () => {
  const result = [(diceValue + 1) % 100, (diceValue + 2) % 100, (diceValue + 3) % 100]
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
      const currentPosition = _.reduce(rolledValues, (a,b) => a+b, player1Position) % 10
      player1Score += currentPosition
      player1Position = currentPosition
      currentPlayer = 2
    } else {
      const currentPosition = _.reduce(rolledValues, (a,b) => a+b, player2Position) % 10
      player2Score += currentPosition
      player2Position = currentPosition
      currentPlayer = 1
    }
  }

  return diceRolls * _.min([player1Score, player2Score])
}

const goB = (input) => {
  return
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
