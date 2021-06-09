import { TextStyle } from 'react-native'

export type FontVariant = {
  thin: Readonly<TextStyle>
  extraLight: Readonly<TextStyle>
  light: Readonly<TextStyle>
  regular: Readonly<TextStyle>
  medium: Readonly<TextStyle>
  semiBold: Readonly<TextStyle>
  bold: Readonly<TextStyle>
  extraBold: Readonly<TextStyle>
  black: Readonly<TextStyle>
}

const FontStyle: FontVariant = {
  thin: {
    fontFamily: 'Montserrat-Thin',
  },
  extraLight: {
    fontFamily: 'Montserrat-ExtraLight',
  },
  light: {
    fontFamily: 'Montserrat-Light',
  },
  regular: {
    fontFamily: 'Montserrat-Regular',
  },
  medium: {
    fontFamily: 'Montserrat-Medium',
  },
  semiBold: {
    fontFamily: 'Montserrat-SemiBold',
  },
  bold: {
    fontFamily: 'Montserrat-Bold',
  },
  extraBold: {
    fontFamily: 'Montserrat-ExtraBold',
  },
  black: {
    fontFamily: 'Montserrat-Black',
  },
}

export default FontStyle
