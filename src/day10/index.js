const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())

const getScore = ch => {
  switch(ch) {
    case ')':
      return 3
    case ']':
      return 57
    case '}':
      return 1197
    case '>':
      return 25137
  }
}

const pairs = {
  '[': ']',
  '(': ')',
  '<': '>',
  '{': '}'
}

const getIllegalChar = line => {
  const stack = []
  let counter = 0

  const checkLines = line.split('').map(ch => {
    if (Object.keys(pairs).includes(ch)) {
      stack.push(ch)
    } else {
      if (stack.length === 0 || pairs[stack.pop()] !== ch) {
        return ch
      }
    }
    return 'V'
  })

    checkLines.filter(ch => ch !== 'V').flat().forEach(arr => {
      if (arr !== []) {
        counter += getScore(arr[0])
      }
    })

  return counter
}

const getMissingLines = input => {

}

const getAutocompoleteScore = line => {

}

const goA = (input) => {
  return input.map(line => getIllegalChar(line)).reduce((a,b) => a+b, 0)
}

const goB = (input) => {
  // const missingLines = getMissingLines(input)
  // const missingScores = missingLines.map(line => getAutocompleteScore(line))
  // return missingScores.sort()[missingScores.length / 2]
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
