import React, { ElementType, FC } from 'react'
import { Platform, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

import { Color, Typography } from '../constants'
import { useBackgroundStyle } from '../hooks'
import Animation from './Animation'
import Gradient from './Gradient'
import { SmallIcon, SmallIconName } from './icons'
import Spacer from './Spacer'
import TouchableScale, { TouchableScaleProps } from './TouchableScale'

const isSolid = (variant: ButtonVariant) => variant === 'solid'

const isOutline = (variant: ButtonVariant) => variant === 'outline'

const getBackgroundColor = (variant: ButtonVariant, isDarkBackground: boolean) => {
  if (isSolid(variant)) {
    return isDarkBackground ? Color.WHITE : Color.GRAY_30
  }

  return Color.TRANSPARENT
}

const getBorderColor = (variant: ButtonVariant, isDarkBackground: boolean, disabled: boolean) => {
  if (isOutline(variant)) {
    if (isDarkBackground) {
      return Color.WHITE
    }

    return disabled ? Color.GRAY_50 : Color.SECONDARY
  }

  return Color.TRANSPARENT
}

const getContainerStyle = (variant: ButtonVariant, isDarkBackground: boolean, disabled: boolean) => {
  return StyleSheet.flatten({
    backgroundColor: getBackgroundColor(variant, isDarkBackground),
    borderWidth: isOutline(variant) ? 1.2 : 0,
    borderColor: getBorderColor(variant, isDarkBackground, disabled),
    opacity: disabled && !isSolid(variant) ? 0.5 : 1,
  })
}

const getTextColor = (variant: ButtonVariant, isDarkBackground: boolean, disabled: boolean) => {
  if (isSolid(variant)) {
    if (isDarkBackground) {
      return disabled ? Color.GRAY_50 : Color.PRIMARY_GRADIENT_END
    }

    return Color.WHITE
  }

  if (isDarkBackground) {
    return Color.WHITE
  }

  return disabled ? Color.GRAY_50 : Color.SECONDARY
}

const getTextStyle = (variant: ButtonVariant, isDarkBackground: boolean, disabled: boolean) => {
  return StyleSheet.flatten({
    color: getTextColor(variant, isDarkBackground, disabled),
  })
}

export type ButtonProps = {
  title: string
  variant?: ButtonVariant
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  fullWidth?: boolean
  rect?: boolean
  icon?: SmallIconName
  iconOnRight?: boolean
  loading?: boolean
} & TouchableScaleProps

const Button: FC<ButtonProps> = ({
  title,
  variant = 'solid',
  containerStyle,
  titleStyle,
  style,
  fullWidth = false,
  rect,
  icon,
  iconOnRight = false,
  disabled = false,
  loading = false,
  ...props
}) => {
  const isDarkBackground = useBackgroundStyle() === 'dark'
  const Container = (isSolid(variant) && !isDarkBackground && !disabled ? Gradient : View) as ElementType

  const buttonIcon = icon && (
    <View style={styles.icon}>
      <SmallIcon name={icon} style={getTextStyle(variant, isDarkBackground, disabled)} />
    </View>
  )

  return (
    <View style={[!fullWidth && styles.regular, isSolid(variant) && !disabled && styles.shadow, style]}>
      <TouchableScale disabled={disabled || loading} {...props}>
        <Container
          style={[
            styles.component,
            !rect && styles.rounded,
            getContainerStyle(variant, isDarkBackground, disabled),
            containerStyle,
          ]}
        >
          {loading ? (
            <Animation animation="button-loading" loop autoPlay style={styles.loading} />
          ) : (
            <Spacer gutter="xs" horizontal>
              {!iconOnRight && buttonIcon}
              <Text style={[styles.title, getTextStyle(variant, isDarkBackground, disabled), titleStyle]}>{title}</Text>
              {iconOnRight && buttonIcon}
            </Spacer>
          )}
        </Container>
      </TouchableScale>
    </View>
  )
}

type Styles = {
  component: ViewStyle
  regular: ViewStyle
  rounded: ViewStyle
  shadow: ViewStyle
  loading: ViewStyle
  icon: ViewStyle
  title: TextStyle
}

const styles = StyleSheet.create<Styles>({
  component: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 24,
  },
  regular: {
    alignSelf: 'center',
  },
  icon: {
    justifyContent: 'center',
  },
  rounded: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: Color.BLACK,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        borderRadius: 24,
        overflow: 'hidden',
        elevation: 5,
      },
    }),
  },
  loading: {
    width: 100,
  },
  title: {
    ...Typography.buttonText,
    textAlign: 'center',
  },
})

export type ButtonColor = 'primary' | 'secondary'

export type ButtonVariant = 'solid' | 'outline' | 'text'

export default Button
