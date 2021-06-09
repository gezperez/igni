import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { Animated, Platform, StyleSheet, TextInput as RNTextInput, TouchableWithoutFeedback, View } from 'react-native'

import { vw } from '../helpers'
import useNumberInput from '../hooks/useNumberInput'
import { Shake } from '../hooks/useShake'
import Money, { MoneyProps } from './Money'
import TextInput, { TextInputProps } from './TextInput'

export type Shakable = { shake: Shake }

export type ShakableTextInput = RNTextInput & Shakable

export type MoneyInputProps = Pick<MoneyProps, 'currency' | 'size'> & TextInputProps

const MoneyInput = forwardRef<RNTextInput, MoneyInputProps>(
  ({ accessibilityLabel, value, onChangeText, testID, currency, size = 52, style, ...props }, ref) => {
    const inputRef = useRef<ShakableTextInput>(null)

    const focus = useCallback(() => {
      const { current: input } = inputRef
      if (input) {
        input.focus()
      }
    }, [inputRef])

    const [inputProps, { interpolate, shouldAddSeparator, shake }] = useNumberInput(value, onChangeText)

    useImperativeHandle(ref, (): any => ({ focus, shake }))

    const showCents = shouldAddSeparator || (!!value && value.includes('.'))

    return (
      <TouchableWithoutFeedback onPress={focus} testID={testID} accessibilityLabel={accessibilityLabel}>
        <View style={styles.container}>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    translateX: interpolate(0, -8),
                  },
                ],
              },
            ]}
          >
            <Money
              adjustsFontSizeToFit
              allowFontScaling={false}
              amount={parseFloat(value || '0')}
              centered
              selectable={Platform.OS === 'ios'}
              size={size}
              truncateCentsIfZero={!showCents}
              centsDimmed={shouldAddSeparator}
              style={style}
              currency={currency}
            />
          </Animated.View>
          <TextInput ref={inputRef} style={styles.dummyTextInput} {...inputProps} {...props} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    justifyContent: 'flex-end',
  },
  dummyTextInput: {
    position: 'absolute',
    left: vw(100),
  },
})

export default MoneyInput
