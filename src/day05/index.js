'use strict'

const { parse } = require("path")
const { test, readInput } = require("../utils")
import _ from 'lodash'

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())

const parseCoords = input => input.map(item => item.split(' -> ')).map(i => i.map(c => c.split(','))).map(item => item.map(number => number.map(i => parseInt(i))))

const goA = (input) => {
  const coordsList = parseCoords(input)
  const hash = {}

  coordsList.forEach(coords => {
    const [x1,y1] = coords[0]
    const [x2,y2] = coords[1]
    const isHorizontal = y1 === y2
    const isVertical = x1 === x2

    if (isVertical) {
      const min = y1 > y2 ? y2 : y1
      const max = y1 > y2 ? y1 : y2
      for (let y = min; y <= max; y++) {
        hash[`${x1}__${y}`] = (hash[`${x1}__${y}`] || 0) + 1
      }
    }

    if (isHorizontal) {
      const min = x1 > x2 ? x2 : x1
      const max = x1 > x2 ? x1 : x2
      for (let x = min; x <= max; x++) {
        hash[`${x}__${y1}`] = (hash[`${x}__${y1}`] || 0) + 1
      }
    }
  })

  let counter = 0
  for (const [key, value] of Object.entries(hash)) {
    if (value > 1) {
      counter++
    }
  }

  return counter //?
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
