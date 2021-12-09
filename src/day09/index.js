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

const getArrayMap = input => input.map(line => line.split('').map(num => parseInt(num)))
const findLowPoints = input => {
  const arrayMap = getArrayMap(input)
  const allMinPoints = []

  for(let i = 0; i < arrayMap.length; i++) {
    for(let j = 0; j < arrayMap[0].length; j++) {
      const min = getMinPoint({x: j, y: i}, arrayMap)

      if (min > -1) {
        allMinPoints.push({x: j, y: i, min})
      }
    }
  }

  return allMinPoints
}

const goA = (input) => {
  const allMinPoints = findLowPoints(input)
  return allMinPoints.map(i => i.min+1).reduce((a,b) => a+b, 0)
}

const calculateBasinAtPoint = (x,y, grid, lowPoint, visitedMap) => {
  if (!isInBounds(x,y,grid) || grid[x][y] === 9 || grid[x][y] < lowPoint || visitedMap.get(`${x}_${y}`)) {
    return 0
  }

  visitedMap.set(`${x}_${y}`, true)

  return 1 + calculateBasinAtPoint(x + 1, y, grid, grid[x][y], visitedMap) + calculateBasinAtPoint(x, y + 1, grid, grid[x][y], visitedMap) + calculateBasinAtPoint(x, y - 1, grid, grid[x][y], visitedMap) + calculateBasinAtPoint(x - 1, y, grid, grid[x][y], visitedMap)
}

const goB = (input) => {
  const seedPoints = findLowPoints(input)
  const map = getArrayMap(input)
  const visitedMap = new Map()

  const all = seedPoints.map(pt => calculateBasinAtPoint(pt.x, pt.y, map, pt.min, visitedMap))
  return all.sort((a, b) => b - a).slice(0,3).reduce((a,b) => a*b, 1);
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
