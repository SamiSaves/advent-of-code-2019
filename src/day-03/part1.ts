import {readLines} from '../util/input'

interface Instruction {
  direction: string
  amount: number
}

interface Point {
  x: number
  y: number
}

interface Line {
  start: Point
  end: Point
}

const getLineEnd = (start: Point, instruction: Instruction) => {
  switch(instruction.direction) {
    case 'L':
      return { x: start.x - instruction.amount, y: start.y }
    case 'R':
      return { x: start.x + instruction.amount, y: start.y }
    case 'U':
      return { x: start.x, y: start.y + instruction.amount }
    case 'D':
      return { x: start.x, y: start.y - instruction.amount }
  }
}

const getCurrentPosition = (lines: Line[]): Point => {
  if (lines.length === 0) return { x: 0, y: 0}
  return {...lines[lines.length - 1].end}
}

const getLines = (instructions: Instruction[]): Line[] => {
  return instructions.reduce((lines, instruction) => {
    const start = getCurrentPosition(lines)
    const end = getLineEnd(start, instruction)
    lines.push({ start, end })
    return lines
  }, [])
}

const isHorizontal = (line: Line): boolean => line.start.y === line.end.y
const isVertical = (line: Line): boolean => line.start.x === line.end.x

const canLinesCross = (line1: Line, line2: Line): boolean => {
  if (isHorizontal(line1) && isHorizontal(line2)) return false
  if (isVertical(line1) && isVertical(line2)) return false
  return true
}

const doesLineReachPoint = (line: Line, point: Point): boolean => {
  if (isHorizontal(line)) {
    if (line.start.x >= point.x && line.end.x <= point.x) return true
    if (line.start.x <= point.x && line.end.x >= point.x) return true
  } else {
    if (line.start.y >= point.y && line.end.y <= point.y) return true
    if (line.start.y <= point.y && line.end.y >= point.y) return true
  }

  return false
}

const getIntersection = (line1: Line, line2: Line): Point => {
  if (!canLinesCross(line1, line2)) return
  if (isHorizontal(line1) && isVertical(line2)) {
    const intersection = { x: line2.start.x, y: line1.start.y }
    if (doesLineReachPoint(line1, intersection) && doesLineReachPoint(line2, intersection)) {
      return intersection
    }
  }
  if (isVertical(line1) && isHorizontal(line2)) {
    const intersection = { x: line1.start.x, y: line2.start.y }
    if (doesLineReachPoint(line1, intersection) && doesLineReachPoint(line2, intersection)) {
      return intersection
    }
  }
}

const getIntersections = (path1: Line[], path2: Line[]): Point[] => {
  return path1.reduce((result, line1) => {
    const intersectingPaths = path2.reduce((result, line2) => {
      const intersection = getIntersection(line1, line2)
      if (intersection) {
        result.push(intersection)
      }
      return result
    }, [])
    return [...result, ...intersectingPaths]
  }, [])
}

(async () => {
  const input = await readLines('03')
  const wirePaths = input.map(path => {
    return path
      .split(',')
      .map(instruction => ({
        direction: instruction.replace(/[0-9]*/g, ''),
        amount: Number(instruction.replace(/[A-Z]/, ''))
      }))
  })
  const [wire1, wire2] = wirePaths

  const wire1Lines = getLines(wire1)
  const wire2Lines = getLines(wire2)

  const intersections = getIntersections(wire1Lines, wire2Lines)
  const intersectionsAsManhattan = intersections.map(point => Math.abs(point.x) + Math.abs(point.y))
  const closestIntersection = intersectionsAsManhattan.reduce((closest, current) => {
    if (current < closest) {
      return current
    }
    return closest
  }, Infinity)

  console.log('Result', closestIntersection)
})()
