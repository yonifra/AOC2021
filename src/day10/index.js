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

const getAutocompleteText = line => {
  const stack = []
  const lineAsArr = line.split('')
  for(let i = 0; i < line.length; i++) {
    if (Object.keys(pairs).includes(lineAsArr[i])) {
      stack.push(lineAsArr[i])
    } else {
      if (pairs[stack.pop()] !== lineAsArr[i]) {
        return ''
      }
    }
  }

  return stack.reverse().map(i => pairs[i]).join('')
}

const getMissingLines = input => {
  return input.map(line => {
    const suffix = getAutocompleteText(line)
    if(suffix && suffix != '' && suffix.length > 0) {
      return getAutocompleteScore(suffix)
    }

    return []
  }).filter(arr => arr !== [])
}

const getAutocompleteScore = line => {
  let score = 0
  const lineArr = line.split('')
  const scoreMap = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  }

  for(let i = 0; i < lineArr.length; i++) {
    score += scoreMap[lineArr[i]] + score * 5
  }

  return score
}

const goA = (input) => {
  return input.map(line => getIllegalChar(line)).reduce((a,b) => a+b, 0)
}

const goB = (input) => {
  const missingLines = getMissingLines(input)
  const scores = []

  missingLines.forEach(score => {
    if (score.length !== 0) {
      scores.push(score)
    }
  })

  return scores.sort((a,b) => a-b)[(scores.length - 1)/ 2]
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
