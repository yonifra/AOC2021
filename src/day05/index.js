'use strict'

import _ from 'lodash'
const { parse } = require("path")
const { test, readInput } = require("../utils")

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

  return counter
}

const goB = (input) => {
  const coordsList = parseCoords(input)
  const map = new Map();

  coordsList.forEach(([c1, c2]) => {
      let [x1, y1] = c1
      let [x2, y2] = c2

      const xSlope = x2 - x1
      const ySlope = y2 - y1
      const length = Math.abs(xSlope) || Math.abs(ySlope)
      const xFactor = xSlope && xSlope / Math.abs(xSlope)
      const yFactor = ySlope && ySlope / Math.abs(ySlope)

      for (let i = 0; i <= length; i++) {
        const x = x1 + i * xFactor
        const y = y1 + i * yFactor
        const val = map.get(`${x},${y}`) || 0;
			  map.set(`${x},${y}`, val + 1);
      }
  })

  return [...map.values()].filter(x => x > 1).length
}

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
