const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const isSmallCave = word => word[0] === word[0].toLowerCase()
const input = prepareInput(readInput())

const createDictionary = input => {
  const dictionary = {}
  input.forEach(line => {
    const parts = line.split('-')
    const val = dictionary[parts[0]]
    if (val) {
      dictionary[parts[0]].push(parts[1])
    }
    else {
        dictionary[parts[0]] = [parts[1]]
    }
  })

  return dictionary
}

const checkRoutes = (dictionary, nextLocation = 'start', isFirstTime = false) => {
  if (!isFirstTime && nextLocation === 'start') {
    return 0
  }

  if (isFirstTime) {
    let counter = 1
    return dictionary[nextLocation].forEach(location => counter + checkRoutes(''))
  }
}

const goA = (input) => {
  const dictionary = createDictionary(input)
  return checkRoutes(dictionary, 'start', true)
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
