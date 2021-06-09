import React, { forwardRef } from 'react'
import { StyleSheet, TextInput as RNTextInput, TextInputProps as RNTextInputProps, TextStyle } from 'react-native'

import { Color, Typography } from '../constants'

export type TextInputProps = {
  centered?: boolean
} & RNTextInputProps

const TextInput = forwardRef<RNTextInput, TextInputProps>(({ style, centered, ...props }, ref) => (
  <RNTextInput
    ref={ref}
    placeholderTextColor={Color.GRAY_50}
    style={[styles.input, centered && styles.centered, style]}
    {...props}
  />
))

type Styles = {
  input: TextStyle
  centered: TextStyle
}

const styles = StyleSheet.create<Styles>({
  input: {
    ...Typography.inputText,
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  centered: {
    textAlign: 'center',
  },
})

export default TextInput
