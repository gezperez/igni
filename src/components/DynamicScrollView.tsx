import React, { FC, useState } from 'react'
import { NativeScrollEvent, ScrollView, ScrollViewProps, StyleProp, ViewStyle } from 'react-native'

import useDynamicScrollView from '../hooks/useDynamicScrollView'

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - 16
}

export type DynamicScrollViewProps = {
  contentBelowStyle?: StyleProp<ViewStyle>
} & ScrollViewProps

const DynamicScrollView: FC<DynamicScrollViewProps> = ({ contentBelowStyle, style, ...props }) => {
  const { scrollEnabled, ...scrollViewProps } = useDynamicScrollView()

  const [bottomReached, setBottomReached] = useState(false)

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      onScroll={({ nativeEvent }) => {
        const reached = isCloseToBottom(nativeEvent)
        setBottomReached(reached)
      }}
      scrollEnabled={scrollEnabled}
      style={[scrollEnabled && !bottomReached && contentBelowStyle, style]}
      {...scrollViewProps}
      {...props}
    />
  )
}

export default DynamicScrollView
