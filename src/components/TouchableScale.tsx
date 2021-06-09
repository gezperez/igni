import React, { FC, PropsWithChildren } from 'react'
import { Animated, StyleProp, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, ViewStyle } from 'react-native'

import { useAnimate } from '../hooks'

export type TouchableScaleProps = PropsWithChildren<{
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}> &
  TouchableWithoutFeedbackProps

const TouchableScale: FC<TouchableScaleProps> = ({ children, disabled = false, style, ...props }) => {
  const [interpolate, enter, exit] = useAnimate(80)

  return (
    <TouchableWithoutFeedback style={style} disabled={disabled} onPressIn={enter} onPressOut={exit} {...props}>
      <Animated.View
        style={{
          transform: [
            {
              scale: interpolate(1, 0.98),
            },
          ],
        }}
      >
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default TouchableScale
