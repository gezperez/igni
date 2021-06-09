import React, { forwardRef, ReactElement, ReactNode, Ref, useCallback, useState } from 'react'
import { Animated, StyleProp, StyleSheet, TextInput as RNTextInput, TextStyle, View, ViewStyle } from 'react-native'
import { isFunction } from 'lodash'

import { Color, Typography } from '../constants'
import { hl } from '../helpers/viewport'
import { Interpolate, useTween } from '../hooks'
import IconButton from './IconButton'
import { TextInputProps } from './TextInput'
import { BodyText } from './texts'

type RenderLeft = () => ReactNode

type RenderRight = () => ReactNode

type RenderHelperLineProps = {
  centered?: boolean
  error?: string
  hint?: string
  value?: string
  charCounter?: number
  style?: StyleProp<ViewStyle>
}

type RenderHelperLine = (props: RenderHelperLineProps) => ReactNode

const defaultRenderHelperLine: RenderHelperLine = ({ centered, error, hint, value, charCounter, style }) => (
  <View style={[styles.helperLine, centered && styles.helperLineCentered, style]}>
    <View>
      {/* eslint-disable-next-line no-nested-ternary */}
      {error ? (
        <BodyText centered={centered} style={[styles.errorText]}>
          {error}
        </BodyText>
      ) : hint ? (
        <BodyText centered={centered}>{hint}</BodyText>
      ) : null}
    </View>
    {!!charCounter && (
      <View>
        <BodyText centered={centered}>
          {value?.length || 0} /{charCounter}
        </BodyText>
      </View>
    )}
  </View>
)

export type InputProps = {
  value?: string
  onChangeText?: (text: string) => void
  onBlur?: (e: any) => void
  onFocus?: (e: any) => void
  centered?: boolean
  placeholder?: string
  onPress?: () => void
}

type PropsWithRef<P, T> = {
  ref?: Ref<T>
} & P

export type RenderInput = (props: PropsWithRef<InputProps, RNTextInput>) => ReactElement

type StyleWithAnimatedValueProp<T> = Animated.WithAnimatedValue<StyleProp<T>>

export type FieldProps = {
  charCounter?: number
  hint?: string
  error?: string
  label?: string
  fixedLabel?: boolean
  onClearPress?: () => void
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: ((interpolate: Interpolate) => StyleWithAnimatedValueProp<TextStyle>) | StyleProp<TextStyle>
  labelStyle?: ((interpolate: Interpolate) => StyleWithAnimatedValueProp<TextStyle>) | StyleProp<TextStyle>
  inputContainerStyle?: StyleProp<ViewStyle>
  transitionDuration?: number
  renderHelperLine?: RenderHelperLine
  renderInput: RenderInput
  renderLeft?: RenderLeft
  renderRight?: RenderRight
} & TextInputProps

const Field = forwardRef<RNTextInput, FieldProps>(
  (
    {
      centered,
      charCounter,
      error,
      hint,
      label,
      onClearPress,
      onBlur,
      onFocus,
      style,
      contentContainerStyle,
      labelStyle,
      inputContainerStyle,
      transitionDuration,
      value,
      fixedLabel = false,
      placeholder,
      renderHelperLine = defaultRenderHelperLine,
      renderInput,
      renderLeft,
      renderRight,
      ...props
    },
    ref
  ) => {
    const [hasFocus, setHasFocus] = useState(false)

    const [interpolate] = useTween(hasFocus, transitionDuration)

    const animateLabel = !value && !fixedLabel

    const clearable = isFunction(onClearPress) && !!value

    const handleBlur = useCallback(
      e => {
        if (typeof onBlur === 'function') {
          onBlur(e)
        }
        setHasFocus(false)
      },
      [onBlur]
    )

    const handleFocus = useCallback(
      e => {
        if (typeof onFocus === 'function') {
          onFocus(e)
        }
        setHasFocus(true)
      },
      [onFocus]
    )

    return (
      <View style={style}>
        <Animated.View
          style={[
            styles.field,
            {
              borderBottomColor: interpolate(Color.GRAY_30, Color.SECONDARY),
            },
            error ? styles.underlineError : {},
            typeof contentContainerStyle === 'function' ? contentContainerStyle(interpolate) : contentContainerStyle,
          ]}
        >
          {label && (
            <Animated.Text
              numberOfLines={1}
              style={[
                styles.label,
                centered && styles.labelCenter,
                animateLabel && {
                  top: interpolate(28, 0),
                  fontSize: interpolate(18, 12),
                  lineHeight: interpolate(24, 14),
                },
                typeof labelStyle === 'function' ? labelStyle(interpolate) : labelStyle,
              ]}
            >
              {label}
            </Animated.Text>
          )}
          <View
            style={[
              styles.inputContainer,
              inputContainerStyle,
              clearable && styles.withClear,
              clearable && centered && styles.centeredWithClear,
            ]}
          >
            {typeof renderLeft === 'function' && renderLeft()}
            {renderInput({
              ref,
              value,
              centered,
              onBlur: handleBlur,
              onFocus: handleFocus,
              placeholder: fixedLabel || !label || hasFocus ? placeholder : undefined,
              ...props,
            })}
            {clearable && <IconButton name="cross" style={styles.clearIconButton} onPress={onClearPress} />}
          </View>
          {typeof renderRight === 'function' && renderRight()}
        </Animated.View>
        {renderHelperLine({ centered, error, hint, value, charCounter })}
      </View>
    )
  }
)

type Styles = {
  field: ViewStyle
  label: TextStyle
  labelCenter: ViewStyle
  inputContainer: ViewStyle
  withClear: ViewStyle
  centeredWithClear: ViewStyle
  underlineError: ViewStyle
  errorText: TextStyle
  clearIconButton: ViewStyle
  helperLine: ViewStyle
  helperLineCentered: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  field: {
    paddingTop: 18,
    borderBottomWidth: hl(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    ...Typography.label,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  labelCenter: {
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
  },
  withClear: {
    paddingRight: 24,
  },
  centeredWithClear: {
    paddingLeft: 24,
  },
  underlineError: {
    borderBottomColor: Color.DANGER,
  },
  errorText: {
    color: Color.DANGER,
  },
  clearIconButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  helperLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  helperLineCentered: {
    flexDirection: 'column',
  },
})

export default Field
