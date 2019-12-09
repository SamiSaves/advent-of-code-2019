import { readAndSplitAsNumbers } from "../util/input"

const containsPair = (input: number): boolean => /(.)\1+/.test(String(input))
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
