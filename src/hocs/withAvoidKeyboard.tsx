import React, { ComponentType } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import hoistNonReactStatic from 'hoist-non-react-statics'
import setCompositionDisplayName from '../helpers/setCompositionDisplayName'

const withAvoidKeyboard = <OriginalProps extends {}>(WrappedComponent: ComponentType<OriginalProps>) => {
  const WithAvoidKeyboardContainer = (props: OriginalProps) => (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding' })} enabled>
      <WrappedComponent {...(props as OriginalProps)} />
    </KeyboardAvoidingView>
  )

  setCompositionDisplayName(WithAvoidKeyboardContainer, WrappedComponent)

  hoistNonReactStatic(WithAvoidKeyboardContainer, WrappedComponent)

  return WithAvoidKeyboardContainer
}

export default withAvoidKeyboard
