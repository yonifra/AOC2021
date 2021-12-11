const { listeners } = require("process")
const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput
const input = prepareInput(readInput())

function increment(board, x, y) {
  if (board[x] !== undefined && board[x][y] !== undefined) {
    board[x][y]++
    if (board[x][y] === 10) {
      increment(board, x - 1, y - 1)
      increment(board, x - 1, y + 0)
      increment(board, x - 1, y + 1)
      increment(board, x + 0, y - 1)
      increment(board, x + 0, y + 1)
      increment(board, x + 1, y - 1)
      increment(board, x + 1, y + 0)
      increment(board, x + 1, y + 1)
    }
  }
}

function run(input, steps) {
  const board = input.map((line) => line.split("").map((x) => +x))
  let flashes = 0
  for (let step = 0; step < steps; step++) {
    if (board.every((line) => line.every((octopus) => octopus === 0))) {
      return step
    }

    board.forEach((line, x) =>
      line.forEach((octopus, y) => increment(board, x, y)),
    )

    board.forEach((line, x) =>
      line.forEach(
        (octopus, y) => octopus > 9 && ++flashes && (board[x][y] = 0),
      ),
    )
  }
  return flashes
}

const goA = (input) => {
  return run(input, 100)
}

const goB = (input) => {
  return run(input, Infinity)
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
