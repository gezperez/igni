import React, { FC } from 'react'
import { StyleProp, StyleSheet, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { IconProps, SmallIcon, SmallIconName } from './icons'

export type IconButtonProps = {
  name: string
  iconStyle?: StyleProp<TextStyle>
  onPress?: () => void
  style?: StyleProp<ViewStyle>
} & IconProps<SmallIconName>

const IconButton: FC<IconButtonProps> = ({ iconStyle, name, onPress, style, ...props }) => (
  <View style={style}>
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <SmallIcon name={name} style={iconStyle} {...props} />
      </View>
    </TouchableWithoutFeedback>
  </View>
)

type Styles = {
  container: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
})

export default IconButton
