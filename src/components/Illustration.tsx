import React, { FC } from 'react'
import { Image, ImageProps, ImageRequireSource, ImageSourcePropType } from 'react-native'

import { BackgroundStyle } from '../contexts/BackgroundStyleContext'
import withBackgroundStyle, { WithBackgroundStyleProps } from '../hocs/withBackgroundStyle'

export type IllustrationSource = ImageRequireSource

export type MediumIllustrationName = 'arrow-up' | 'arrow-down'

export type LargeIllustrationName = 'hourglass' | 'mobile-phone-check'

export type IllustrationName = MediumIllustrationName | LargeIllustrationName

export type IllustrationSize = 'md' | 'lg'

const illustrations: Record<string, ImageSourcePropType> = {
  'lg-hourglass': require('../assets/illustrations/lg-hourglass.png'),
  'lg-mobile-phone-check': require('../assets/illustrations/lg-mobile-phone-check.png'),
}

const getImageSource = (
  illustration: IllustrationName | ImageRequireSource,
  size: IllustrationSize,
  backgroundStyle?: BackgroundStyle
) => {
  if (typeof illustration === 'string') {
    let key = `${size}-${illustration}`

    if (backgroundStyle === 'dark') {
      key += '-negative'
    }

    if (!(key in illustrations)) {
      // eslint-disable-next-line no-console
      console.warn(
        `The illustration "${illustration}" is not available for "${size}" size or background style context.`
      )
    }

    return illustrations[key]
  }

  return illustration
}

export type IllustrationProps = {
  illustration: IllustrationName | IllustrationSource
  size?: IllustrationSize
} & Omit<ImageProps, 'source'>

const Illustration: FC<IllustrationProps & WithBackgroundStyleProps> = ({
  backgroundStyle,
  illustration,
  size = 'md',
  ...props
}) => {
  const source = getImageSource(illustration, size, backgroundStyle)

  if (!source) {
    return null
  }

  return <Image source={source} {...props} />
}

export default withBackgroundStyle(Illustration)
