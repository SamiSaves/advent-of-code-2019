import {readAndSplitAsNumbers} from '../util/input'

interface IProgramInput {
  noun: number
  verb: number
}

const initializeProgram = (programInput: IProgramInput, program: number[]): number[] => {
  const programClone = program.slice()
  programClone[1] = programInput.noun
  programClone[2] = programInput.verb
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

const findInputForGravity = (program: number[]): IProgramInput => {
  for (let verb = 0; verb < 100; verb++) {
    for (let noun = 0; noun < 100; noun++) {
      const programInput = { verb, noun }
      const programResult = executeProgram(0, initializeProgram(programInput, program))
      if (programResult[0] === 19690720) {
        return programInput
      }
    }
  }
}

(async () => {
  const program = await readAndSplitAsNumbers('02', ',')
  
  const inputForGravity = findInputForGravity(program)
  console.log('The input for gravity is: ', JSON.stringify(inputForGravity))
  const result = 100 * inputForGravity.noun + inputForGravity.verb
  console.log('Result is: ', result)
})()
