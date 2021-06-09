import { RefObject, useCallback, useEffect } from 'react'
import { TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { FieldProps } from '~/components'

type SingleFieldType = 'text' | 'integer' | 'decimal' | 'email' | 'message'

type UseSingleFieldProps = { ref?: RefObject<TextInput> } & Omit<FieldProps, 'renderInput'>

type UseSingleField = [() => void, UseSingleFieldProps]

const defaultProps: UseSingleFieldProps = {
  returnKeyType: 'go',
  autoFocus: true,
}

type PropsByType = Record<SingleFieldType, UseSingleFieldProps>

const propsByType: PropsByType = {
  text: {
    keyboardType: 'default',
    autoCapitalize: 'none',
    autoCorrect: false,
    autoCompleteType: 'off',
  },
  integer: {
    keyboardType: 'number-pad',
  },
  decimal: {
    keyboardType: 'decimal-pad',
  },
  email: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoCorrect: false,
    autoCompleteType: 'off',
  },
  message: {
    keyboardType: 'default',
    autoCapitalize: 'sentences',
    autoCorrect: true,
    autoCompleteType: 'off',
  },
}

type UseSingleFieldOptions<T> = {
  onSubmit: (value: T, setFieldError: (error: string) => void) => Promise<void> | void
  initialValue?: string
  fieldProps: UseSingleFieldProps
}

const useSingleField = <T>(
  type: SingleFieldType,
  fieldSchema: yup.Schema<T>,
  { onSubmit = () => undefined, initialValue = '', fieldProps }: UseSingleFieldOptions<T>
): UseSingleField => {
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('aca')
    })

    return unsubscribe
  }, [navigation])

  const fieldName = 'field'

  const validationSchema = yup
    .object({
      [fieldName]: fieldSchema,
    })
    .defined()

  const formik = useFormik({
    initialValues: {
      [fieldName]: initialValue,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit(values, { setFieldError }) {
      const normalizedValues = validationSchema.cast(values)
      const value = normalizedValues[fieldName]
      onSubmit(value, error => setFieldError(fieldName, error))
    },
  })

  const value = formik.values[fieldName]

  const error = formik.errors[fieldName]

  const onChangeText = useCallback(
    text => {
      formik.setErrors({})
      formik.handleChange(fieldName)(text)
    },
    [formik, fieldName]
  )

  const onClearPress = useCallback(() => {
    formik.setErrors({})
    formik.setFieldValue(fieldName, '')
  }, [formik, fieldName])

  const onBlur = useCallback(
    e => {
      formik.handleBlur(fieldName)(e)
    },
    [formik, fieldName]
  )

  const onSubmitEditing = useCallback(() => {
    formik.handleSubmit()
  }, [formik])

  const handleSubmit = useCallback(() => {
    onSubmitEditing()
  }, [onSubmitEditing])

  return [
    handleSubmit,
    {
      ...defaultProps,
      ...propsByType[type],
      ...fieldProps,
      value,
      error,
      onChangeText,
      onSubmitEditing,
      onClearPress,
      onBlur,
    },
  ]
}

export default useSingleField
