import { Platform, StyleSheet, TextStyle } from 'react-native'
import Color from './Color'
import FontStyle from './FontStyle'

type Typography = {
  hero: TextStyle
  highlight: TextStyle
  bodyTitle: TextStyle
  bodyText: TextStyle
  inputText: TextStyle
  searchInputText: TextStyle
  label: TextStyle
  topTabLabel: TextStyle
  listItemTitle: TextStyle
  listItemText: TextStyle
  legal: TextStyle
  linkText: TextStyle
  buttonText: TextStyle
  initialsText: TextStyle
  errorText: TextStyle
  warningText: TextStyle
  money: TextStyle
}

const typographyObject: Readonly<Typography> = {
  hero: {
    ...FontStyle.bold,
    fontSize: 30,
    lineHeight: 36,
    color: Color.GRAY_90,
  },
  highlight: {
    ...FontStyle.medium,
    fontSize: 22,
    lineHeight: 28,
    color: Color.GRAY_90,
  },
  bodyTitle: {
    ...FontStyle.medium,
    fontSize: 18,
    lineHeight: 24,
    color: Color.GRAY_90,
  },
  bodyText: {
    ...FontStyle.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Color.GRAY_70,
  },
  inputText: {
    ...FontStyle.medium,
    fontSize: 18,
    lineHeight: 24,
    color: Color.GRAY_70,
  },
  searchInputText: {
    ...FontStyle.medium,
    fontSize: 16,
    ...Platform.select({
      ios: {
        lineHeight: 19,
      },
      android: {
        paddingVertical: 0,
      },
    }),
    color: Color.GRAY_70,
  },
  label: {
    ...FontStyle.medium,
    fontSize: 12,
    lineHeight: 14,
    color: Color.GRAY_50,
  },
  topTabLabel: {
    ...FontStyle.medium,
    fontSize: 12,
    lineHeight: 14,
    color: Color.GRAY_70,
    textTransform: 'uppercase',
  },
  listItemTitle: {
    ...FontStyle.medium,
    fontSize: 16,
    lineHeight: 20,
    color: Color.GRAY_90,
  },
  listItemText: {
    ...FontStyle.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Color.GRAY_60,
  },
  legal: {
    ...FontStyle.medium,
    fontSize: 12,
    lineHeight: 14,
    color: Color.GRAY_60,
  },
  linkText: {
    ...FontStyle.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: Color.SECONDARY,
  },
  buttonText: {
    ...FontStyle.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },
  initialsText: {
    ...FontStyle.regular,
    fontSize: 13,
    color: Color.GRAY_70,
  },
  errorText: {
    ...FontStyle.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Color.DANGER,
  },
  warningText: {
    ...FontStyle.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Color.PRIMARY,
  },
  money: {
    ...FontStyle.medium,
    color: Color.GRAY_90,
  },
}

type Styles = Typography

const Typography = StyleSheet.create<Styles>(typographyObject)

export default Typography
