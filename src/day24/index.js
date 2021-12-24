const { checkServerIdentity } = require("tls")
const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput
const input = prepareInput(readInput())

const solve = (input, digits, values) => {
  let currentDigit = 14
  input.forEach(line => {
    const parts = line.split(' ')
    console.log(`solving for ${digits}, currently on digit with index ${currentDigit} which is ${JSON.stringify(values)}`)

    switch (parts[0]) {
      case 'inp': {
        currentDigit--
        if (currentDigit < 0) {
          return false
        }
        values.w = parseInt(digits[currentDigit])
        break
      }
      case 'mul': {
        values[parts[1]] *= !isNaN(parseInt(parts[2])) ? parseInt(parts[2]) : values[parts[2]]
        break
      }
      case 'div': {
        values[parts[1]] = parseInt(values[parts[1]] / (!isNaN(parseInt(parts[2])) ? parseInt(parts[2]) : values[parts[2]]))
        break
      }
      case 'mod': {
        values[parts[1]] = parseInt(values[parts[1]] % parseInt(parts[2]))
        break
      }
      case 'add': {
        values[parts[1]] += !isNaN(parseInt(parts[2])) ? parseInt(parts[2]) : values[parts[2]]
        break
      }
      case 'eql': {
        values[parts[1]] = values[parts[1]] === (!isNaN(parseInt(parts[2])) ? parseInt(parts[2]) : values[parts[2]]) ? 1 : 0
        break
      }
    }
  })

  return values.z === 0
}

const goA = (input) => {
  let digits = 99999999999999
  let stringDigits = digits.toString().split('')

  while (!solve(input, stringDigits, {x: 0, y: 0, z: 0})) {
    digits--
    stringDigits = digits.toString().split('')

    while (stringDigits.includes('0')) {
      digits--
      stringDigits = digits.toString().split('')
    }
  }

  return digits
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
