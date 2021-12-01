const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
  let counter = 0

  for (let i = 1; i < input.length - 1; i++) {
    if (parseInt(input[i]) < parseInt(input[i+1])) {
      counter++
    }
  }

  return counter
}

const goB = (input) => {
  let counter = 0

  for (let i = 1; i < input.length - 3; i++) {
    const windowA = parseInt(input[i]) + parseInt(input[i+1]) + parseInt(input[i+2])
    const windowB = parseInt(input[i+1]) + parseInt(input[i+2]) + parseInt(input[i+3])

    if (windowA < windowB) {
      counter++
    }
  }

  return counter
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
