import React, { FC, ReactNode } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

import { ButtonProps, ButtonStack, ButtonStackProps, ButtonVariant } from '../components'
import { vh, vw } from '../helpers'
import BottomContentLayout, { BottomContentLayoutProps } from './BottomContentLayout'

type RenderProps<T> = (props: T) => ReactNode

type RenderBottomContentProps = {
  renderBeforeButtons?: () => ReactNode
  renderAfterButtons?: () => ReactNode
} & ButtonStackProps

type RenderBottomContent = RenderProps<RenderBottomContentProps>

const defaultRenderBottomContent: RenderBottomContent = ({
  renderBeforeButtons,
  renderAfterButtons,
  buttons,
  renderButton,
}) => (
  <>
    {renderBeforeButtons && renderBeforeButtons()}
    <ButtonStack buttons={buttons} renderButton={renderButton} style={styles.buttonStack} />
    {renderAfterButtons && renderAfterButtons()}
  </>
)

export type ButtonsAtTheBottomLayoutProps = {
  bottomContainerStyle?: StyleProp<ViewStyle>
  bottomContainerWithoutButtonsStyle?: StyleProp<ViewStyle>
  primaryButton?: ButtonProps
  secondaryButton?: ButtonProps
  primaryVariant?: ButtonVariant
  renderBottomContent?: RenderBottomContent
} & RenderBottomContentProps &
  BottomContentLayoutProps

const ButtonsAtTheBottomLayout: FC<ButtonsAtTheBottomLayoutProps> = ({
  bottomContainerStyle,
  bottomContainerWithoutButtonsStyle,
  buttons: overrideButtons,
  primaryButton: overridePrimaryButton,
  secondaryButton: overrideSecondaryButton,
  renderButton,
  primaryVariant,
  renderBottomContent = defaultRenderBottomContent,
  renderBeforeButtons = () => null,
  renderAfterButtons = () => null,
  ...props
}) => {
  let primaryButton, secondaryButton

  if (overridePrimaryButton) {
    primaryButton = Object.assign({}, { variant: primaryVariant || 'solid' }, overridePrimaryButton)
  }

  if (overrideSecondaryButton) {
    secondaryButton = Object.assign({}, { variant: 'text' }, overrideSecondaryButton)
  }

  let buttons: ButtonProps[] = []

  if (primaryButton) {
    buttons.push(primaryButton)
  }

  if (secondaryButton) {
    buttons.push(secondaryButton)
  }

  if (overrideButtons) {
    if (overridePrimaryButton || overrideSecondaryButton) {
      // eslint-disable-next-line no-console
      console.warn('The prop "buttons" is conflicting with "primaryButton" or "secondaryButton"')
    }

    buttons = overrideButtons
  }

  return (
    <BottomContentLayout
      bottomContainerStyle={[
        buttons.length ? styles.bottomContainerWithButtons : bottomContainerWithoutButtonsStyle,
        bottomContainerStyle,
      ]}
      bottomContent={renderBottomContent({
        renderBeforeButtons,
        renderAfterButtons,
        buttons,
        renderButton,
      })}
      {...props}
    />
  )
}

type Styles = {
  bottomContainerWithButtons: ViewStyle
  buttonStack: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  bottomContainerWithButtons: {
    paddingVertical: vh(4),
  },
  buttonStack: {
    width: vw(72),
    alignSelf: 'center',
  },
})

export default ButtonsAtTheBottomLayout
