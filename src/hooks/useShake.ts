import { useCallback, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { Interpolate } from './useAnimate'

export type Shake = () => Promise<Animated.EndResult>

type UseShake = [Interpolate, Shake]

const useShake = (duration: number = 30, useNativeDriver: boolean = true): UseShake => {
  const { current: value } = useRef(new Animated.Value(0))

  const shake = useCallback(() => {
    return new Promise<Animated.EndResult>(resolve => {
      Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          easing: Easing.linear,
          duration,
          useNativeDriver,
        }),
        Animated.timing(value, {
          toValue: -1,
          easing: Easing.linear,
          duration,
          useNativeDriver,
        }),
        Animated.timing(value, {
          toValue: 1,
          easing: Easing.linear,
          duration,
          useNativeDriver,
        }),
        Animated.timing(value, {
          toValue: 0,
          easing: Easing.linear,
          duration,
          useNativeDriver,
        }),
      ]).start(resolve)
    })
  }, [value, duration, useNativeDriver])

  const interpolate = useCallback(
    (from, to) => {
      return value.interpolate({
        inputRange: [0, 1],
        outputRange: [from, to],
      })
    },
    [value]
  )

  return [interpolate, shake]
}

export default useShake
