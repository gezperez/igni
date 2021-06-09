import React, { FC, useState } from 'react'
import { Dimensions, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Color } from '../constants'
import { BodyTitle } from './texts'

const { width } = Dimensions.get('window')

export type TextCarouselProps = {
  messages: string[]
  style?: StyleProp<ViewStyle>
}

const TextCarousel: FC<TextCarouselProps> = ({ messages, style }) => {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <>
      <Carousel
        data={messages}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.itemContainer}>
            <BodyTitle centered>{item}</BodyTitle>
          </View>
        )}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={setActiveSlide}
        loop
        autoplay
        autoplayDelay={100}
        autoplayInterval={6000}
        style={style}
      />
      <Pagination
        dotsLength={messages.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </>
  )
}

type Styles = {
  itemContainer: ViewStyle
  dot: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  itemContainer: {
    width: 280,
    alignSelf: 'center',
  },
  dot: {
    backgroundColor: Color.WHITE,
  },
})

export default TextCarousel
