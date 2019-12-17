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
  const layers = getLayers(data).reverse()
  const canvas = [ ...new Array(LAYER_HEIGHT * LAYER_WIDTH) ]

  const finalImage = canvas.reduce((image, _, index) => {
    const pixel = layers.reduce((finalPixel, layer) => {
      const pixel = layer[index]
      if (pixel === 2) return finalPixel
      return pixel
    }, 2)

    image[index] = pixel
    console.log(pixel)
    return image
  }, [])

  for (let i = 0; i < LAYER_HEIGHT; i++) {
    let row = ''
    for (let j = 0; j < LAYER_WIDTH; j++) {
      const index = i * LAYER_WIDTH + j
      row += finalImage[index] === 0 ? '▯' : '▮'
    }
    console.log(row)
  }
})()
