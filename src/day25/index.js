const _ = require('lodash')
const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput
const input = prepareInput(readInput())

const moveRight = () => {
  const clonedInput = _.cloneDeep(splittedInput)
  const maxX = splittedInput[0].length
  let moves = 0

  for (let y = 0; y < splittedInput.length; y++) {
    for (let x = 0; x < splittedInput[0].length; x++) {
      const newX = (x + 1) % maxX

      if (splittedInput[y][x] === ">" && splittedInput[y][newX] === ".") {
        clonedInput[y][x] = "."
        clonedInput[y][newX] = ">"
        moves++
      }
    }
  }

  splittedInput = clonedInput
  return moves
}

const moveDown = () => {
  const clonedInput = _.cloneDeep(splittedInput)
  const maxY = splittedInput.length
  let moves = 0

  for (let y = 0; y < splittedInput.length; y++) {
    for (let x = 0; x < splittedInput[0].length; x++) {
      const newY = (y + 1) % maxY

      if (splittedInput[y][x] === "v" && splittedInput[newY][x] === ".") {
        clonedInput[y][x] = "."
        clonedInput[newY][x] = "v"
        moves++
      }
    }
  }

  splittedInput = clonedInput
  return moves
}

let splittedInput = input.map(line => line.split(''))

const goA = (input) => {
  let counter = 0
  while (moveRight() + moveDown() > 0) {
      counter++
  }
  return counter
}

const goB = (input) => {
  return 'AOC Done!'
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
