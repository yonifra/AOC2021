const _ = require('lodash')
const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())

const isInBounds = (x,y,map) => (x >= 0) && (y >= 0) && (map.length > y) && (map[0].length > x)

const getMinPoint = ({x,y}, arrayMap) => {
  let left, right, up, down

  left = isInBounds(x, y-1, arrayMap) ? arrayMap[x][y-1] : Number.MAX_VALUE
  right = isInBounds(x, y+1, arrayMap) ? arrayMap[x][y+1] : Number.MAX_VALUE
  up = isInBounds(x-1, y, arrayMap) ? arrayMap[x-1][y] : Number.MAX_VALUE
  down = isInBounds(x+1, y, arrayMap) ? arrayMap[x+1][y] : Number.MAX_VALUE

  const currentValue = arrayMap[x][y]
  const surroundingMins = _.min([left, right, up, down])

  if (currentValue < surroundingMins) {
    return currentValue
  }

  return -1
}

const findLowPoints = input => {
  const arrayMap = input.map(line => line.split('').map(num => parseInt(num)))
  const allMinPoints = []

  for(let i = 0; i < arrayMap.length; i++) {
    for(let j = 0; j < arrayMap[0].length; j++) {
      const min = getMinPoint({x: j, y: i}, arrayMap)

      if (min > -1) {
        allMinPoints.push(min)
      }
    }
  }

  return allMinPoints
}

const goA = (input) => {
  const allMinPoints = findLowPoints(input)
  return allMinPoints.map(i => i+1).reduce((a,b) => a+b, 0)
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
