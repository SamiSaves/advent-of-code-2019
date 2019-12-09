import * as fs from 'fs'
import * as readline from 'readline'
import * as path from 'path'

const inputPath = (day: string) => path.join(__dirname, '../../src', `day-${day}`, 'input')

export const readLines = (day: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(inputPath(day))
    const lines = []
    const lineStream = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    lineStream.on('line', line => lines.push(line))

    lineStream.on('close', () => resolve(lines))
    lineStream.on('error', reject)
  })
}

const readFile = (path: string): string => {
  return fs.readFileSync(path, 'utf8')
}

export const readLinesAsNumbers = async (day: string): Promise<number[]> => {
  const lines = await readLines(day)
  return lines.map(Number)
}

export const readAndSplitAsNumbers = async (day: string, splitter: string): Promise<number[]> => {
  const file = readFile(inputPath(day))
  const splitFile = file.split(splitter)
  return splitFile.map(Number)
}
