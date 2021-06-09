import React, { FC, PropsWithChildren, ReactNode } from 'react'
import { StyleSheet, TextStyle } from 'react-native'
import splitProps from 'react-split-props'

import { Header, HeaderProps } from '../components'
import { vh } from '../helpers'
import ButtonsAtTheBottomLayout, { ButtonsAtTheBottomLayoutProps } from './ButtonsAtTheBottomLayout'

type RenderHeader = (props: HeaderProps) => ReactNode

export type HeaderAndButtonsLayoutProps = PropsWithChildren<{
  renderHeader?: RenderHeader
}> &
  HeaderProps &
  ButtonsAtTheBottomLayoutProps

const defaultRenderHeader = (props: HeaderProps) => <Header style={styles.header} {...props} />

const HeaderAndButtonsLayout: FC<HeaderAndButtonsLayoutProps> = ({
  children,
  renderHeader = defaultRenderHeader,
  ...props
}) => {
  const [buttonsAtBottomProps, headerProps] = splitProps<[ButtonsAtTheBottomLayoutProps, HeaderProps]>(
    props,
    [
      'buttons',
      'primaryButton',
      'secondaryButton',
      'primaryVariant',
      'contentContainerStyle',
      'bottomContainerStyle',
      'style',
      'transparentTopBar',
      'renderBeforeButtons',
      'renderAfterButtons',
    ],
    ['animation', 'summary', 'title', 'titleHero', 'text', 'illustration', 'illustrationSize', 'gutter']
  )

  return (
    <ButtonsAtTheBottomLayout {...buttonsAtBottomProps}>
      {renderHeader(headerProps)}
      {children}
    </ButtonsAtTheBottomLayout>
  )
}

type Styles = {
  header: TextStyle
}

const styles = StyleSheet.create<Styles>({
  header: {
    marginVertical: vh(4),
  },
})

export default HeaderAndButtonsLayout
