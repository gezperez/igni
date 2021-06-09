import React, { FC, PropsWithChildren, ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { isFunction } from 'lodash'
import { DynamicScrollView } from '../components'
import { Color } from '../constants'
import withTransparentTopBar, { WithTransparentTopBarProps } from '../hocs/withTransparentTopBar'

type RenderProps<T> = (props: T) => ReactNode

type RenderContentProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>
}>

type RenderContent = RenderProps<RenderContentProps>

const defaultRenderContent: RenderContent = ({ children, style }) => <View style={style}>{children}</View>

export type BottomContentLayoutProps = {
  bottomContainerStyle?: StyleProp<ViewStyle>
  bottomContent?: Function | ReactNode
  contentContainerStyle?: StyleProp<ViewStyle>
  renderContent?: RenderContent
  style?: StyleProp<ViewStyle>
} & WithTransparentTopBarProps

const BottomContentLayout: FC<BottomContentLayoutProps> = ({
  bottomContainerStyle,
  bottomContent,
  children,
  contentContainerStyle,
  renderContent = defaultRenderContent,
  style,
  ...props
}) => (
  <View style={[styles.container, style]} {...props}>
    <DynamicScrollView contentBelowStyle={styles.contentBelowStyle}>
      {renderContent({ children, style: contentContainerStyle })}
    </DynamicScrollView>
    <View style={bottomContainerStyle}>{isFunction(bottomContent) ? bottomContent(props) : bottomContent}</View>
  </View>
)

type Styles = {
  container: ViewStyle
  contentBelowStyle: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },
  contentBelowStyle: {
    borderBottomWidth: 3,
    borderColor: Color.FOLD,
  },
})

export default withTransparentTopBar(BottomContentLayout)
