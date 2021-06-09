import React, { FC, PropsWithChildren } from 'react'
import { StyleSheet, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native'
import { Color, Typography } from '../constants'
import { useBackgroundStyle } from '../hooks'

export type TextProps = PropsWithChildren<{
  centered?: boolean
  link?: boolean
  uppercase?: boolean
}> &
  RNTextProps

const createText = (typographyStyle: TextStyle): FC<TextProps> => ({
  children,
  centered,
  link,
  style,
  uppercase,
  ...props
}) => {
  const darkBackground = useBackgroundStyle() === 'dark'

  return (
    <RNText
      style={[
        typographyStyle,
        !!centered && styles.centered,
        !!uppercase && styles.uppercase,
        !!link && styles.linkColor,
        !!darkBackground && styles.darkBackgroundTextColor,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  )
}

type Styles = {
  centered: TextStyle
  uppercase: TextStyle
  linkColor: TextStyle
  darkBackgroundTextColor: TextStyle
}

const styles = StyleSheet.create<Styles>({
  centered: {
    textAlign: 'center',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  linkColor: {
    color: Color.SECONDARY,
  },
  darkBackgroundTextColor: {
    color: Color.WHITE,
  },
})

export const Hero = createText(Typography.hero)

export const Highlight = createText(Typography.highlight)

export const BodyTitle = createText(Typography.bodyTitle)

export const BodyText = createText(Typography.bodyText)

export const Label = createText(Typography.label)

export const ListItemTitle = createText(Typography.listItemTitle)

export const ListItemText = createText(Typography.listItemText)

export const Legal = createText(Typography.legal)

export const LinkText = createText(Typography.linkText)

export const InitialsText = createText(Typography.initialsText)

export const ErrorText = createText(Typography.errorText)

export const WarningText = createText(Typography.warningText)
