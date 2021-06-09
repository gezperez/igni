import React, { FC } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { BackgroundStyle, BackgroundStyleConsumer } from '../contexts/BackgroundStyleContext'
import setCompositionDisplayName from '../helpers/setCompositionDisplayName'

export type WithBackgroundStyleProps = {
  backgroundStyle?: BackgroundStyle
}

const withBackgroundStyle = <OriginalProps extends {}>(WrappedComponent: FC<OriginalProps>) => {
  const WithBackgroundStyleContainer: FC<OriginalProps & WithBackgroundStyleProps> = props => (
    <BackgroundStyleConsumer>
      {backgroundStyle => <WrappedComponent backgroundStyle={backgroundStyle} {...(props as OriginalProps)} />}
    </BackgroundStyleConsumer>
  )

  setCompositionDisplayName(WithBackgroundStyleContainer, WrappedComponent)

  hoistNonReactStatic(WithBackgroundStyleContainer, WrappedComponent)

  return WithBackgroundStyleContainer
}

export default withBackgroundStyle
