import {readLines} from '../util/input'

interface IOrbits {
  [key: string]: (orbits: IOrbits) => string[]
}

const orbitPath = (object: string): (orbits: IOrbits) => string[] => {
  return (orbits: IOrbits) => {
    const orbitPath: string[] = orbits[object] ? orbits[object](orbits).slice() : []
    orbitPath.push(object)
    return orbitPath
  }
}

const removeDuplicates = (arr1: string[], arr2: string[]) => {
  return arr1.filter(element1 => !arr2.includes(element1))
}

(async () => {
  const input = await readLines('06')
  const orbits = input.map(data => data.split(')'))
  const orbitPaths = orbits.reduce((result, [object, orbiter]) => {
    result[orbiter] = orbitPath(object)
    return result
  }, {} as IOrbits)

  const santasPath = orbitPaths['SAN'](orbitPaths)
  const myPath = orbitPaths['YOU'](orbitPaths)

  const santasPathParsed = removeDuplicates(santasPath, myPath)
  const myPathParsed = removeDuplicates(myPath, santasPath)

  console.log('Result', santasPathParsed.length + myPathParsed.length)
})()
