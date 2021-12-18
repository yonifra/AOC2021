const { monitorEventLoopDelay } = require("perf_hooks")
const { test, readInput } = require("../utils")
const _ = require('lodash')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())
const allPaths = []

// gets all the possible paths from a 2d array of numbers recursively
const getAllPaths = (input, x = 0, y = 0, currentPath = []) => {
  if (x === 99 && y === 99) { // our stopping condition
    return allPaths.push(currentPath.push(input[x][y]))
  }
  if (x === 99) {
    getAllPaths(input, x, y+1, currentPath)
  }
  if (y === 99) {
    getAllPaths(input, x+1, y, currentPath)
  }
}

const goA = (input) => {
  const allPathsSums = getAllPaths(input).map(path => path.reduce((sum, element) => sum + element, 0))
  return _.min(allPathsSums)
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
