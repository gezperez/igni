import React, { ReactNode } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { TextField } from '../components'
import { withKeyboard } from '../hocs'
import HeaderAndButtonsLayout, { HeaderAndButtonsLayoutProps } from './HeaderAndButtonsLayout'

type RenderField = <TField extends {}>(props: TField) => ReactNode

export type SingleFieldScreenLayoutProps<TField> = {
  renderField?: RenderField
  field?: TField
} & HeaderAndButtonsLayoutProps

const defaultRenderField = <TField extends {}>(props: TField) => <TextField {...props} />

const SingleFieldScreenLayout = <TField extends {}>({
  renderField = defaultRenderField,
  field,
  children,
  ...props
}: SingleFieldScreenLayoutProps<TField>) => (
  <HeaderAndButtonsLayout gutter="xs" contentContainerStyle={styles.fieldContainer} {...props}>
    {!!field && renderField(field)}
    {children}
  </HeaderAndButtonsLayout>
)

type Styles = {
  fieldContainer: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  fieldContainer: {
    paddingHorizontal: 32,
  },
})

export default withKeyboard(SingleFieldScreenLayout)
