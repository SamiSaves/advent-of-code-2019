import { readAndSplitAsNumbers } from '../util/input'

const LAYER_WIDTH = 25
const LAYER_HEIGHT = 6

const getLayers = (data: number[]): number[][] => {
  return data.reduce((result, n) => {
    const lastIndex = result.length - 1
    const currentLayer = result[lastIndex]

    if (!currentLayer || currentLayer.length === LAYER_HEIGHT * LAYER_WIDTH) {
      result.push([n])
      return result
    }

    currentLayer.push(n)
    return result
  }, [] as number[][])
}

(async () => {
  const data = await readAndSplitAsNumbers('08', '')
  const layers = getLayers(data)
  
  const layerWithFewestZero = layers.reduce((bestLayer, layer) => {
    if (!bestLayer) return layer

    const bestZeroCount = bestLayer.filter(n => n === 0).length
    const zeroCount = layer.filter(n => n === 0).length
    if (zeroCount < bestZeroCount) {
      return layer
    } else if (zeroCount === bestZeroCount) {
      console.log('Duplicate zero count found, there is a chance for error')
    }
    return bestLayer
  }, undefined as number[])

  const result = layerWithFewestZero.filter(n => n === 1).length * layerWithFewestZero.filter(n => n === 2).length

  console.log('Result', result)
})()
