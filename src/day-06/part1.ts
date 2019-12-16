import {readLines} from '../util/input'

interface IOrbits {
  [key: string]: (orbits: IOrbits) => number
}

const orbitChecksum = (object: string): (orbits: IOrbits) => number => {
  return orbits => orbits[object] ? orbits[object](orbits) + 1 : 1
};

(async () => {
  const input = await readLines('06')
  const orbits = input.map(data => data.split(')'))
  const orbitChecksums = orbits.reduce((result, [object, orbiter]) => {
    result[orbiter] = orbitChecksum(object)
    return result
  }, {} as IOrbits)


  const result = Object.values(orbitChecksums).reduce((checksum, orbiterChecksum) => {
    return orbiterChecksum(orbitChecksums) + checksum
  }, 0)

  console.log('Result', result)
})()
