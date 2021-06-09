import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'

import { Color, Typography } from '../constants'
import { SmallIcon } from './icons'

export type SelectProps = {
  disabled?: boolean
  onPress?: () => void
  value?: string
  placeholder?: string
  style?: StyleProp<ViewStyle>
  numberOfLines?: number
} & ViewProps

const Select: FC<SelectProps> = ({ disabled, onPress, value, placeholder, style, numberOfLines, ...props }) => (
  <View {...props}>
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <View style={[styles.component, style]}>
        <Text style={styles.value} numberOfLines={numberOfLines}>
          {value || <Text style={styles.placeholder}>{placeholder}</Text>}
          {'\xA0'}
        </Text>
        <SmallIcon name="angle-down" style={styles.icon} />
      </View>
    </TouchableWithoutFeedback>
  </View>
)

type Styles = {
  component: ViewStyle
  value: TextStyle
  placeholder: TextStyle
  icon: TextStyle
}

const styles = StyleSheet.create<Styles>({
  component: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  value: {
    ...Typography.inputText,
  },
  placeholder: {
    color: Color.GRAY_50,
  },
  icon: {
    color: Color.SECONDARY,
  },
})

export default Select
