import {readLinesAsNumbers} from '../util/input'

const divide = (input: number): number => input / 3
const round = (input: number): number => Math.floor(input)
const subtract = (input: number): number => input - 2
const calculateFuel = (mass: number): number => subtract(round(divide(mass)))
const getTotalFuelForMass = (mass: number): number => {
  const fuelNeeded = calculateFuel(mass)

  if (fuelNeeded <= 0) {
    return 0
  } else {
    return fuelNeeded + getTotalFuelForMass(fuelNeeded)
  }
}

(async () => {
  const masses = await readLinesAsNumbers('01')
  const fuelRequirements = masses.map(mass => getTotalFuelForMass(mass))
  const result = fuelRequirements.reduce((result, fuelRequirement) => result + fuelRequirement, 0)
  console.log(`Total fuel requirements for all spacecraft modules: ${result}`)
})()
