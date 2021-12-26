const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())

const moveRight = (input) => {
  const maxX = input[0].length
  let moves = 0

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      const newX = (x+1) % maxX

      if (input[y][x] === '>' && input[y][newX] === '.') {
        input[y][x] = '.'
        input[y][newX] = '>'
        moves++
      }
    }
  }

  return moves
}

const moveDown = input => {
  const maxY = input.length
  let moves = 0

  for (let x = input[0].length - 1; x >= 0; x--) {
    for (let y = input.length - 1; y >= 0; y--) {
      const newY = (y+1) % maxY

      if (input[y][x] === 'v' && input[newY][x] === '.') {
        input[y][x] = '.'
        input[newY][x] = 'v'
        moves++
      }
    }
  }

  return moves
}

const goA = (input) => {
  input = input.map(line => line.split(''))
  let done = false
  let iterations = 0

  while (!done) {
    iterations++
    let moves = 0
    moves += moveRight(input)
    moves += moveDown(input)

    done = moves === 0
  }

  return iterations
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
