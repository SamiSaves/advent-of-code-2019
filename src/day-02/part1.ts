import {readAndSplitAsNumbers} from '../util/input'

const initializeProgram = (value1: number, value2: number, program: number[]): number[] => {
  const programClone = program.slice()
  programClone[1] = value1
  programClone[2] = value2
  return programClone
}
const setValue = (value: number, pointer: number, program: number[]): number[] => {
  const resultPosition = program[pointer + 3]
  const programClone = program.slice()
  programClone[resultPosition] = value
  return programClone
}
const op1 = (pointer: number, program: number[]): number => {
  const inputpointer1 = program[pointer + 1]
  const inputpointer2 = program[pointer + 2]
  return program[inputpointer1] + program[inputpointer2]
}
const op2 = (pointer: number, program: number[]): number => {
  const inputpointer1 = program[pointer + 1]
  const inputpointer2 = program[pointer + 2]
  return program[inputpointer1] * program[inputpointer2]
}
const executeOperation = (pointer: number, program: number[]): number => {
  switch(program[pointer]) {
    case 1:
      return op1(pointer, program)
    case 2:
      return op2(pointer, program)
    default:
      throw Error('Operation not supported')
  }
}
const executeProgram = (pointer: number, program: number[]): number[] => {
  if (program[pointer] === 99) {
    return program
  }

  const operationResult = executeOperation(pointer, program)
  const programResult = setValue(operationResult, pointer, program)
  return executeProgram(pointer + 4, programResult)
}

(async () => {
  const program = await readAndSplitAsNumbers('02', ',')
  const initializedProgram = initializeProgram(12, 2, program)
  
  const programResult = executeProgram(0, initializedProgram)
  console.log('Program result: ', programResult[0])
})()
