import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const vwRatio = width / 100

const vhRatio = height / 100

const vMinRatio = Math.min(vwRatio, vhRatio)

const vMaxRatio = Math.max(vwRatio, vhRatio)

type Limit = {
  max?: number
  min?: number
}

const createViewportGetter = (ratio: number) => (unit: number, { min, max }: Limit = {}) => {
  const value = unit * ratio

  if (max && min && max < min) {
    throw Error('Min cannot be greater than Max')
  }

  if (min && value < min) {
    return min
  }

  if (max && value > max) {
    return max
  }

  return value
}

export const vw = createViewportGetter(vwRatio)

export const vh = createViewportGetter(vhRatio)

export const vMin = createViewportGetter(vMinRatio)

export const vMax = createViewportGetter(vMaxRatio)

export const hl = createViewportGetter(StyleSheet.hairlineWidth)

export const minWidth = (unit: number) => width >= unit

export const maxWidth = (unit: number) => width <= unit
