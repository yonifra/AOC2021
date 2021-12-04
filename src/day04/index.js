import _ from 'lodash'
const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput
const input = prepareInput(readInput())

const isWinnerBoard = board => {
  let areWinnerRows = false
  let areWinnerCols = false

  for(let p = 0; p < board.length; p++) {
    areWinnerRows = areWinnerRows || _.every(board[p], num => num === 'x')
  }

  for(let i = 0; i < board[0].length; i++) {
    let weHaveAWinner = true
    for (let j = 0; j < board.length; j++) {
      if (board[j][i] !== 'x') {
        weHaveAWinner = false
      }
    }

    areWinnerCols |= weHaveAWinner
  }

  return areWinnerCols || areWinnerRows
}

const calculateBoardSum = board => {
  let sum = 0

  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[0].length; j++) {
      if (board[i][j] !== 'x') {
        sum += parseInt(board[i][j])
      }
    }
  }

  return sum
}

const checkBoardsForWinner = (boards, number) => {
  for(let i = 0; i < boards.length; i++) {
    if (isWinnerBoard(boards[i])) {
      return calculateBoardSum(boards[i]) * parseInt(number)
    }
  }

  return -1
}

/**
 * Marks all the boards with the number that was drawn
 *
 * @param {Array} boards
 * @param {String} number
 */
const markBoardsAndCheck = (boards, number) => {
  for (let k = 0; k < boards.length; k++) {
    const board = boards[k]
    for (let i = 0; i < board.length; i++) {
      const line = board[i]
      for (let j = 0; j < line.length; j++) {
        if (line[j] === number) {
          boards[k][i][j] = 'x'
        }
      }
    }
  }

  return checkBoardsForWinner(boards, number)
}

const parseBoards = input => {
  const boards = []
  let currentBoard = []

  for (let i = 3; i < input.length; i++) {
    if (input[i] === '') {
      boards.push(currentBoard)
      currentBoard = []
    } else {
      const line = []
      input[i].split(' ').forEach(item => {
        if (item !== '') {
          line.push(item)
        }
      })
      currentBoard.push(line)
    }
  }

  return boards
}

const goA = (input) => {
  const draw = input[0].split(',')
  const boards = parseBoards(input)

  for (let i = 0; i < draw.length; i++) {
    const check = markBoardsAndCheck(boards, draw[i])
    if (check !== -1) {
      return check
    }
  }
}

const goB = (input) => {
  const draw = input[0].split(',')
  const boards = parseBoards(input)
  let lastIndex = -1
  for (let i = 0; i < draw.length; i++) {
    markBoardsAndCheck(boards, draw[i])
    const filterMap = boards.map(board => isWinnerBoard(board))
    const index = filterMap.indexOf(false)

    if (index != -1) {
      lastIndex = index
    } else {
      return (calculateBoardSum(boards[lastIndex])) * parseInt(draw[i])
    }
  }
}

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
