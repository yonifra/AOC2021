const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
  const ans = {horizontal: 0, vertical: 0}
  input.forEach(line => {
    const [command, amount] = line.split(' ')
    const intAmount = parseInt(amount)

    switch(command) {
      case 'forward':
        ans.horizontal += intAmount
        break
        case 'down':
        ans.vertical += intAmount
        break
        case 'up':
        ans.vertical -= intAmount
        break
    }
  })

  return ans.horizontal * ans.vertical
}

const goB = (input) => {
  const ans = {horizontal: 0, vertical: 0, aim: 0}
  input.forEach(line => {
    const [command, amount] = line.split(' ')
    const intAmount = parseInt(amount)

    switch(command) {
      case 'forward':
        ans.horizontal += intAmount
        ans.vertical += ans.aim * intAmount
        break
        case 'down':
        ans.aim += intAmount
        break
        case 'up':
        ans.aim -= intAmount
        break
    }
  })

  return ans.horizontal * ans.vertical
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
