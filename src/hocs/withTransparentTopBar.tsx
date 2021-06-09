import React, { FC } from 'react'
import { Platform, SafeAreaView, StyleSheet, ViewStyle } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useHeaderHeight } from '@react-navigation/stack'
import hoistNonReactStatic from 'hoist-non-react-statics'

import setCompositionDisplayName from '../helpers/setCompositionDisplayName'

export type WithTransparentTopBarProps = {
  transparentTopBar?: boolean
}

const withTransparentTopBar = <OriginalProps extends {}>(WrappedComponent: FC<OriginalProps>) => {
  const WithTransparentTopBarContainer: FC<OriginalProps & WithTransparentTopBarProps> = ({
    transparentTopBar,
    ...props
  }) => {
    const headerHeight = useHeaderHeight()

    const statusBarHeight = getStatusBarHeight()

    return (
      <SafeAreaView
        style={[
          styles.container,
          transparentTopBar &&
            Platform.select({
              android: {
                paddingTop: headerHeight + statusBarHeight,
              },
            }),
        ]}
      >
        <WrappedComponent {...(props as OriginalProps)} />
      </SafeAreaView>
    )
  }

  setCompositionDisplayName(WithTransparentTopBarContainer, WrappedComponent)

  hoistNonReactStatic(WithTransparentTopBarContainer, WrappedComponent)

  return WithTransparentTopBarContainer
}

type Styles = {
  container: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    height: '100%',
  },
})

export default withTransparentTopBar
