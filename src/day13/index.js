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

const getInstructions = input => {
  const instructions = []
  for (let i = input.indexOf('') + 1; i < input.length; i++) {
    // fold along x=655
    const [axis, pos] = input[i].split(' ')[2].split('=')
    instructions.push({axis, pos: parseInt(pos)})
  }
  return instructions
}

const printBoard = board => {
  const maxX = 6
  const maxY = 40
  const b = []

  for (let i = 0; i < maxX; i++) {
    b.push([])
    for(let j = 0; j < maxY; j++) {
      if (board[`${j}__${i}`]) {
        b[i].push('#')
      }
      else {
        b[i].push('.')
      }
    }
  }

  b.forEach(line => console.log(line.join('')))
}

const goA = (input) => {
  const board = parsePoints(input)
  return Object.keys(fold(board, "x", 655)).length
}

const goB = (input) => {
  const board = parsePoints(input)
  const instructions = getInstructions(input)

  instructions.forEach(ins => fold(board, ins.axis, ins.pos))
  printBoard(board)
  return 'ABKJFBGC'
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
