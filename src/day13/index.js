const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())
const getBoard = (input) => {
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

const foldX = (board, pos) => {
  const coords = Object.keys(board).map((key) => key.split("__").map(str => parseInt(str)))
  coords.forEach((coord) => {
    if (coord[0] > pos) {
      const newX = pos - (coord[0] - pos)
      delete board[`${coord[0]}__${coord[1]}`]
      board[`${newX}__${coord[1]}`] = "dot"
    }
  })

  return board
}

const foldY = (board, pos) => {
  const coords = Object.keys(board).map((key) => key.split("__"))
  coords.forEach((coord) => {
    if (coord[1] > pos) {
      const newY = pos - (coord[1] - pos)
      delete board[`${coord[0]}__${coord[1]}`]
      board[`${coord[0]}__${newY}`] = "dot"
    }
  })

  return board
}

const fold = (board, coord, pos) => {
  switch (coord) {
    case "x": {
      foldX(board, pos)
      break
    }
    case "y": {
      foldY(board, pos)
      break
    }
  }

  return board
}

const goA = (input) => {
  const board = getBoard(input)
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
