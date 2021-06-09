import React, { forwardRef } from 'react'
import { TextInput } from 'react-native'

import Field, { FieldProps, InputProps, RenderInput } from '../components/Field'

const createField = <T extends InputProps & Omit<FieldProps, 'renderInput'>>(
  renderInput: RenderInput,
  fieldProps = {}
) => {
  return forwardRef<TextInput, T>((props, ref) => (
    <Field ref={ref} renderInput={renderInput} {...fieldProps} {...props} />
  ))
}

export default createField
