import * as fs from 'fs'
import * as readline from 'readline'
import * as path from 'path'

const inputPath = (day: string) => path.join(__dirname, '../../src', `day-${day}`, 'input')

const readLines = (path: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(path)
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

export const readLinesAsNumbers = async (day: string): Promise<number[]> => {
  const lines = await readLines(inputPath(day))
  return lines.map(Number)
}
