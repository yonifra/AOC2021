const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())
const getPolymer = input => input[0]
const getRules = input => {
  const rules = {}
  input.slice(2).forEach(rule => {
    const [a, b] = rule.split(' -> ')
    rules[a] = b
  })
  return rules
}

const commonElements = polymer => {
  const counts = {}
  polymer.forEach(element => {
    counts[element] = counts[element] ? counts[element] + 1 : 1
  })

  let max = 0, min = Number.MAX_VALUE
  Object.keys(counts).forEach(key => {
    if (counts[key] > max) {
      max = counts[key]
    }

    if (counts[key] < min) {
      min = counts[key]
    }
  })
  return {most: max, least: min}
}

const goA = (input, steps = 10) => {
  const initialPolymer = getPolymer(input)
  const rules = getRules(input)
  let polymer = initialPolymer.split('')
  let j = 0
  let newPolymer = []
  for(let i = 0; i < steps; i++) {
    newPolymer.push(polymer[0])
    while(j < polymer.length - 1) {
      const a = polymer[j]
      const b = polymer[j + 1]

      if (a && b && rules[a + b]) {
        // newPolymer.push(a)
        newPolymer.push(rules[a+b])
        newPolymer.push(b)
      } else {
        if (a && b) {
          // newPolymer.push(a)
          newPolymer.push(b)
        }
      }

      j+=1
    }

    j=0
    polymer = newPolymer
    newPolymer = []
  }

  const {most, least} = commonElements(polymer)
  return most - least
}

const goB = (input) => {
  return goA(input, 40)
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
