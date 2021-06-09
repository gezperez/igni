import React, { FC } from 'react'
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native'
import getSymbolFromCurrency from 'currency-symbol-map'
import { padEnd } from 'lodash'
import { Typography } from '../constants'
import { formatNumber } from '../helpers'

export type MoneyProps = {
  amount: number
  centered?: boolean
  centsScale?: number
  centsStyle?: TextStyle
  centsDimmed?: boolean
  currency?: string
  size?: number
  truncateCentsIfZero?: boolean
} & TextProps

const Money: FC<MoneyProps> = ({
  amount,
  centered = false,
  centsScale = 1,
  centsStyle,
  centsDimmed,
  currency = 'ARS',
  size = 30,
  style,
  truncateCentsIfZero = false,
  ...props
}) => {
  const [integer, decimal] = formatNumber(amount, 2).split(',')

  const showCents = parseInt(decimal, 10) > 0 || !truncateCentsIfZero

  return (
    <Text style={[styles.container, centered && styles.center, { fontSize: size }, style]} numberOfLines={1} {...props}>
      {getSymbolFromCurrency(currency)} {integer}
      {showCents && (
        <Text style={[styles.cents, centsDimmed && styles.centsDimmed, { fontSize: size * centsScale }, centsStyle]}>
          {`,${padEnd(decimal, 2, '0')}`}
        </Text>
      )}
    </Text>
  )
}

type Style = {
  container: TextStyle
  cents: TextStyle
  centsDimmed: TextStyle
  center: TextStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    ...Typography.money,
  },
  cents: {
    fontWeight: '400',
  },
  centsDimmed: {
    opacity: 0.6,
  },
  center: {
    textAlign: 'center',
  },
})

export default Money
