import React, { FC } from 'react'
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient'

import { Color } from '../constants'
import { BackgroundStyleProvider } from '../contexts/BackgroundStyleContext'

export type GradientProps = {
  colors?: Color[]
} & Omit<LinearGradientProps, 'colors'>

const DEFAULT_COLORS = [Color.PRIMARY_GRADIENT_START, Color.PRIMARY_GRADIENT_END]

const Gradient: FC<GradientProps> = ({ colors = DEFAULT_COLORS, children, ...props }) => (
  <LinearGradient locations={[0.12, 0.88]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={colors} {...props}>
    <BackgroundStyleProvider value="dark">{children}</BackgroundStyleProvider>
  </LinearGradient>
)

export default Gradient
