import { useCallback, useRef } from 'react'
import { Animated } from 'react-native'

export type Interpolate = (from: number | string, to: number | string) => Animated.AnimatedInterpolation

type UseAnimate = [Interpolate, () => Promise<Animated.EndResult>, () => Promise<Animated.EndResult>]

const useAnimate = (duration: number, useNativeDriver = false, initialValue = false): UseAnimate => {
  const { current: value } = useRef(new Animated.Value(initialValue ? 1 : 0))

  const enter = useCallback(
    () =>
      new Promise<Animated.EndResult>(resolve =>
        Animated.timing(value, {
          toValue: 1,
          duration,
          useNativeDriver,
        }).start(resolve)
      ),
    [value, duration, useNativeDriver]
  )

  const exit = useCallback(
    () =>
      new Promise<Animated.EndResult>(resolve =>
        Animated.timing(value, {
          toValue: 0,
          duration,
          useNativeDriver,
        }).start(resolve)
      ),
    [value, duration, useNativeDriver]
  )

  const interpolate = useCallback(
    (from, to) => {
      return value.interpolate({
        inputRange: [0, 1],
        outputRange: [from, to],
      })
    },
    [value]
  )

  return [interpolate, enter, exit]
}

export default useAnimate
