const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())

// function findMostCommonBit(numbers, digit) {
//   const counter = { 0: 0, 1: 0 };
//   numbers.forEach(number => counter[number[digit]]++);
//   return counter['1'] >= counter['0'] ? '1' : '0';
// }

// function part1(input) {
//   const numbers = input;
//   let mostCommon = '';
//   let leastCommon = '';
//   for (let digit = 0; digit < numbers[0].length; digit++) {
//     const bit = findMostCommonBit(numbers, digit);
//     mostCommon += bit;
//     leastCommon += bit === '1' ? '0' : '1';
//   }
//   return parseInt(mostCommon, 2) * parseInt(leastCommon, 2);
// }

// function part2(input) {
//   let numbers = input;
//   let numbers2 = input;
//   for (let digit = 0; numbers.length > 1; digit++) {
//     numbers = numbers.filter(
//       number => number[digit] === findMostCommonBit(numbers, digit),
//     );
//   }
//   for (let digit = 0; numbers2.length > 1; digit++) {
//     numbers2 = numbers2.filter(
//       number => number[digit] !== findMostCommonBit(numbers2, digit),
//     );
//   }
//   return parseInt(numbers[0], 2) * parseInt(numbers2[0], 2);
// }


const parseInput = (input, isGamma = true) => {
  let ans = []
  let ones = ''
  let zeros = ''


  return ans
}

const getMostCommonBits = (input) => {
  const ans = {gamma: '', epsilon: ''}
  let zeros = 0

  for (let j = 0; j < input[0].length; j++) {
    for (let i = 0; i < input.length; i++) {
      if (input[i].charAt(j) === '0') {
        zeros++
      }
    }

    if (zeros > input.length / 2) {
      ans.gamma += '0'
      ans.epsilon += '1'
    } else {
      ans.gamma += '1'
      ans.epsilon += '0'
    }

    zeros = 0
  }

  ans.gamma = parseInt(ans.gamma, 2)
  ans.epsilon = parseInt(ans.epsilon, 2)
  return ans
}

const goA = (input) => {
  const mlcb = getMostCommonBits(input)
  return mlcb.gamma * mlcb.epsilon
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
