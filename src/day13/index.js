const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())
const parsePoints = (input) => {
  const board = {}
  input.forEach((line) => {
    const parts = line.split(" ")
    if (line !== "" && parts[0] !== "fold") {
      const [x, y] = line.split(",")
      board[`${x}__${y}`] = "dot"
    }
  })

  return board
}

const fold = (board, coord, pos) => {
  const coords = Object.keys(board).map((key) => key.split("__"))

  coords.forEach((point) => {
    if (point[coord === 'x' ? 0 : 1] > pos) {
      const newValue = pos - (point[coord === 'x' ? 0 : 1] - pos)
      delete board[`${point[0]}__${point[1]}`]

      if (coord === 'x') {
        board[`${newValue}__${point[1]}`] = "dot"
      } else {
        board[`${point[0]}__${newValue}`] = "dot"
      }
    }
  })

  return board
}

const goA = (input) => {
  const board = parsePoints(input)
  return Object.keys(fold(board, "x", 655)).length
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
