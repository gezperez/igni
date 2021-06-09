import React, { forwardRef } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import LottieView from 'lottie-react-native'

import { BackgroundStyle } from '../contexts/BackgroundStyleContext'
import withBackgroundStyle, { WithBackgroundStyleProps } from '../hocs/withBackgroundStyle'

export interface AnimationObject {
  v: string
  fr: number
  ip: number
  op: number
  w: number
  h: number
  nm: string
  ddd: number
  assets: any[]
  layers: any[]
}

export type AnimationSource = string | AnimationObject | { uri: string }

export type AnimationName =
  | 'splash'
  | 'button-loading'
  | 'loading-face'
  | 'loading-file'
  | 'check'
  | 'cross'
  | 'exclamation-mark'
  | 'loading'

const animations: Record<string, AnimationSource> = {
  splash: require('../assets/animations/splash.json'),
  'button-loading': require('../assets/animations/button-loading.json'),
  'button-loading-negative': require('../assets/animations/button-loading-negative.json'),
  'loading-face': require('../assets/animations/loading-face.json'),
  'loading-file': require('../assets/animations/loading-file.json'),
  check: require('../assets/animations/check.json'),
  'check-negative': require('../assets/animations/check-negative.json'),
  cross: require('../assets/animations/cross.json'),
  'exclamation-mark': require('../assets/animations/exclamation-mark.json'),
  loading: require('../assets/animations/loading-negative.json'),
  'loading-negative': require('../assets/animations/loading-negative.json'),
}

const getAnimationSource = (animation: AnimationName, backgroundStyle?: BackgroundStyle): AnimationSource => {
  if (typeof animation === 'string') {
    let key = animation

    if (backgroundStyle === 'dark') {
      key += '-negative'
    }

    if (animations[key]) {
      return animations[key]
    }
  }

  return animation
}

export type AnimationProps = {
  animation: AnimationName
  loop?: boolean
  autoPlay?: boolean
  style?: StyleProp<ViewStyle>
  onAnimationFinish?: (isCancelled: boolean) => void
}

const Animation = forwardRef<LottieView, AnimationProps & WithBackgroundStyleProps>(
  ({ animation, loop = false, backgroundStyle, ...props }, ref) => {
    const source = getAnimationSource(animation, backgroundStyle)

    if (!source) {
      return null
    }

    return <LottieView ref={ref} source={source} loop={loop} {...props} />
  }
)

export default withBackgroundStyle(Animation)
