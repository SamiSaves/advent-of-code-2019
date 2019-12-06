import {readLinesAsNumbers} from '../util/input'

const divide = (input: number): number => input / 3
const round = (input: number): number => Math.floor(input)
// For some reason the last one of these functions requires a semicolon at the end to work
const subtract = (input: number): number => input - 2;

(async () => {
  const masses = await readLinesAsNumbers('01')
  const fuelRequirements = masses.map(mass => subtract(round(divide(mass))))
  const result = fuelRequirements.reduce((result, fuelRequirement) => result + fuelRequirement, 0)
  console.log(`Total fuel requirements for all spacecraft modules: ${result}`)
})()
