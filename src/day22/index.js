const { create } = require("domain")
const { test, readInput } = require("../utils")
const _ = require('lodash')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())
const createKey = (x,y,z)=> `${x}_${y}_${z}`

const parseLine = (line, ops, bottomLimit = -50, upperLimit = 50) => {
  const [op, coord] = line.split(' ')
  const coords = coord.split(',')

  const normalizedMinX = bottomLimit === 0 ? parseInt(coords[0].split('=')[1].split('..')[0]) : _.max([parseInt(coords[0].split('=')[1].split('..')[0]), bottomLimit])
  const normalizedMaxX = upperLimit === 0 ? parseInt(coords[0].split('=')[1].split('..')[1]) : _.min([parseInt(coords[0].split('=')[1].split('..')[1]), upperLimit])
  const normalizedMinY = bottomLimit === 0 ? parseInt(coords[1].split('=')[1].split('..')[0]) : _.max([parseInt(coords[1].split('=')[1].split('..')[0]), bottomLimit])
  const normalizedMaxY = upperLimit === 0 ? parseInt(coords[1].split('=')[1].split('..')[1]) : _.min([parseInt(coords[1].split('=')[1].split('..')[1]), upperLimit])
  const normalizedMinZ = bottomLimit === 0 ? parseInt(coords[2].split('=')[1].split('..')[0]) : _.max([parseInt(coords[2].split('=')[1].split('..')[0]), bottomLimit])
  const normalizedMaxZ = upperLimit === 0 ? parseInt(coords[2].split('=')[1].split('..')[1]) : _.min([parseInt(coords[2].split('=')[1].split('..')[1]), upperLimit])

  for(let x = normalizedMinX; x <= normalizedMaxX; x++) {
    for(let y = normalizedMinY; y <= normalizedMaxY; y++) {
      for(let z = normalizedMinZ; z <= normalizedMaxZ; z++) {
        if (op === 'on') {
          ops[createKey(x,y,z)] = true
        } else {
          delete ops[createKey(x,y,z)]
        }
      }
    }
  }
}

const goA = (input) => {
  const ops = {}
  input.forEach(line => parseLine(line, ops))

  return Object.keys(ops).length
}

const goB = (input) => {
  const ops = {}
  input.forEach(line => parseLine(line, ops, 0, 0))

  return Object.keys(ops).length
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
