import React, { FC, ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import Animation, { AnimationName } from './Animation'
import Illustration, { IllustrationName, IllustrationSize, IllustrationSource } from './Illustration'
import Spacer, { SpacerProps } from './Spacer'
import TextCarousel from './TextCarousel'
import { BodyText, BodyTitle, Hero } from './texts'

type RenderArtProps = {
  animation?: AnimationName
  illustration?: IllustrationName | IllustrationSource
  illustrationSize?: IllustrationSize
}

const renderArt = ({ animation, illustration, illustrationSize }: RenderArtProps): ReactNode => {
  if (animation) {
    if (illustration) {
      // eslint-disable-next-line no-console
      console.warn(
        'The "animation" prop is overriding the "illustration" prop, please check the props passed to the component.'
      )
    }

    return <Animation animation={animation} autoPlay style={styles.animation} />
  }
  if (illustration) {
    return <Illustration illustration={illustration} size={illustrationSize} />
  }

  return null
}

const renderText = (text?: string | string[]) => {
  if (typeof text === 'string') {
    return <BodyText centered>{text}</BodyText>
  }
  if (Array.isArray(text)) {
    return <TextCarousel messages={text} />
  }

  return null
}

export type HeaderProps = {
  text?: string | string[]
  title?: string
  summary?: string
  titleHero?: boolean
  style?: StyleProp<ViewStyle>
} & RenderArtProps &
  Pick<SpacerProps, 'gutter'>

const Header: FC<HeaderProps> = ({
  gutter = 'md',
  titleHero,
  illustration,
  illustrationSize = 'md',
  animation,
  text,
  title,
  summary,
  style,
}) => {
  const HeaderTitle = titleHero ? Hero : BodyTitle

  return (
    <Spacer gutter={gutter} style={[styles.container, style]}>
      {(animation || illustration) && (
        <View style={styles.art}>{renderArt({ animation, illustration, illustrationSize })}</View>
      )}
      {summary && (
        <BodyText centered uppercase>
          {summary}
        </BodyText>
      )}
      {title && <HeaderTitle centered>{title}</HeaderTitle>}
      {renderText(text)}
    </Spacer>
  )
}

type Styles = {
  container: ViewStyle
  art: ViewStyle
  animation: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    width: 264,
  },
  art: {
    marginBottom: 12,
  },
  animation: {
    width: 120,
    height: 120,
  },
})

export default Header
