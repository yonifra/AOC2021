const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())

/**
 *  Calculates the rate of which the fish spread
 *
 * @param {Array<number>} counter
 * @param {number} days
 * @returns {number} the amount of fish after the days have passed
 */
const calculateAfterDays = (counter, days) => {
  while (days > 0) {
    const fishReady = counter.shift()
    counter.push(fishReady)
    counter[6] += fishReady
    days--
  }

  return counter.reduce((a,b) => a+b, 0)
}

const prepareCounter = fishes => {
  const counter = [0,0,0,0,0,0,0,0,0]
  fishes.forEach(fish => {
    counter[parseInt(fish)]++
  })

  return counter
}

const goA = (input) => {
  const counter = prepareCounter(input[0].split(','))
  return calculateAfterDays(counter, 80)
}

const goB = (input) => {
  const counter = prepareCounter(input[0].split(','))
  return calculateAfterDays(counter, 256)
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
