import { readAndSplitAsNumbers } from "../util/input"

const containsPair = (input: number): boolean => {
  const splitInput = String(input).split('').map(Number)
  const results = splitInput.reduce((status, number, index) => {
    if (number === status.lastNumber) {
      status.combo++
      if (index === splitInput.length - 1 && status.combo === 2) {
        status.containsPair = true
      }
    } else {
      if (status.combo === 2) {
        status.containsPair = true
      }
      status.combo = 1
    }

    status.lastNumber = number
    return status
  }, { lastNumber: -1, combo: 0, containsPair: false })

  return results.containsPair 
}
const sortDesc = (arr: number[]): number[] => arr.slice().sort()
const neverDecreases = (input: number): boolean => {
  const splitInput = String(input).split('').map(Number)
  const orderedInput = Number(sortDesc(splitInput).join(''))
  return orderedInput === input
}

(async () => {
  const input = await readAndSplitAsNumbers('04', '-')
  const [min, max] = input

  let matches = 0
  for(let i = min; i <= max; i++) {
    if(containsPair(i) && neverDecreases(i)) {
      matches++
    }
  }
  
  console.log('The total of different possibilities:', matches)
})()
