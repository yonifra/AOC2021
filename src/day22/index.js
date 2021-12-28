const { create } = require("domain")
const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())
const createKey = (x,y,z)=> `${x}_${y}_${z}`

const parseLine = (line, ops, bottomLimit = -50, upperLimit = 50) => {
  let parts = line.split(' ')
  const op = parts[0]
  parts = parts[1].split(',')
  const minX = parseInt(parts[0].split('=')[1].split('..')[0])
  const maxX = parseInt(parts[0].split('=')[1].split('..')[1])
  const minY = parseInt(parts[1].split('=')[1].split('..')[0])
  const maxY = parseInt(parts[1].split('=')[1].split('..')[1])
  const minZ = parseInt(parts[2].split('=')[1].split('..')[0])
  const maxZ = parseInt(parts[2].split('=')[1].split('..')[1])

  const normalizedMinX = minX < bottomLimit ? bottomLimit : minX
  const normalizedMaxX = maxX > upperLimit ? upperLimit : maxX
  const normalizedMinY = minY < bottomLimit ? bottomLimit : minY
  const normalizedMaxY = maxY > upperLimit ? upperLimit : maxY
  const normalizedMinZ = minZ < bottomLimit ? bottomLimit : minZ
  const normalizedMaxZ = maxZ > upperLimit ? upperLimit : maxZ

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
  input.forEach(line => parseLine(line, ops, Number.MIN_VALUE, Number.MAX_VALUE))

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
