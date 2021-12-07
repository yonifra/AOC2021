const _ = require('lodash')
const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput
const input = prepareInput(readInput())
const parseInput = input => input[0].split(',').map(i => parseInt(i))

const goA = (input, costFn = (a,b) => Math.abs(a - b)) => {
  const arr = parseInput(input)
  const maxDistance = _.max(arr)
  const minDistance = _.min(arr)
  let minFuel = Number.MAX_VALUE

  for (let i = minDistance; i < maxDistance; i++) {
    const clonedArray = _.clone(arr)
    const cost = arr.map(distance => clonedArray[i] = costFn(distance, i)).reduce((a,b) => a+b, 0)

    if (cost < minFuel) {
      minFuel = cost
    }
  }

  return minFuel
}

const goB = (input) => {
  return goA(input, (a,b) => (Math.abs(a-b)*(Math.abs(a-b)+1)) / 2)
}

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
