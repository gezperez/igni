import { useCallback, useState } from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData, TextInputKeyPressEventData } from 'react-native'
import useShake, { Shake } from './useShake'

type OnChangeText = (text: string) => void

type UseNumberInput = [object, { interpolate: any; shouldAddSeparator: boolean; shake: Shake }]

const useNumberInput = (value: string = '', onChangeText?: OnChangeText): UseNumberInput => {
  const [interpolate, shake] = useShake()

  const [shouldAddSeparator, setShouldAddSeparator] = useState(false)

  const emitChangeText = useCallback(
    text => {
      if (onChangeText) {
        onChangeText(text)
      }
    },
    [onChangeText]
  )

  const onChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const { text } = e.nativeEvent

      const [integral, fractional] = value.split('.')

      const isSeparatorPresent = value.includes('.')

      if (/^\d$/.test(text)) {
        if ((isSeparatorPresent && fractional.length >= 2) || (!isSeparatorPresent && integral.length >= 11)) {
          shake()
        } else if (value || text !== '0') {
          emitChangeText(`${value}${shouldAddSeparator ? '.' : ''}${text}`)
          setShouldAddSeparator(false)
        }
      } else if (/^[,.]$/.test(text)) {
        if (isSeparatorPresent) {
          shake()
        } else {
          setShouldAddSeparator(true)
        }
      }
    },
    [emitChangeText, value, shake, shouldAddSeparator, setShouldAddSeparator]
  )

  const onKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      const { key } = e.nativeEvent

      if (key === 'Backspace') {
        if (shouldAddSeparator) {
          setShouldAddSeparator(false)
        } else if (value) {
          if (value.length > 1 && value.charAt(value.length - 2) === '.') {
            emitChangeText(value.slice(0, -2))
            setShouldAddSeparator(true)
          } else {
            emitChangeText(value.slice(0, -1))
            setShouldAddSeparator(false)
          }
        } else {
          shake()
          setShouldAddSeparator(false)
        }
      }
    },
    [emitChangeText, value, shake, shouldAddSeparator, setShouldAddSeparator]
  )

  return [
    { onChange, onKeyPress, value: '', maxLength: 1 },
    { interpolate, shouldAddSeparator, shake },
  ]
}

export default useNumberInput
