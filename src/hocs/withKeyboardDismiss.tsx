import React, { ComponentType } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import hoistNonReactStatic from 'hoist-non-react-statics'
import setCompositionDisplayName from '../helpers/setCompositionDisplayName'

const withKeyboardDismiss = <OriginalProps extends {}>(WrappedComponent: ComponentType<OriginalProps>) => {
  const WithDismissKeyboardContainer = (props: OriginalProps) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <WrappedComponent {...props} />
      </View>
    </TouchableWithoutFeedback>
  )

  setCompositionDisplayName(WithDismissKeyboardContainer, WrappedComponent)

  hoistNonReactStatic(WithDismissKeyboardContainer, WrappedComponent)

  return WithDismissKeyboardContainer
}

export default withKeyboardDismiss
