import React from 'react'

import { createField } from '../helpers'
import MoneyInput from './MoneyInput'
import Select from './Select'
import TextInput from './TextInput'

export const TextField = createField(props => <TextInput {...props} />)

export const MoneyField = createField(props => <MoneyInput {...props} />, {
  centered: true,
  fixedLabel: true,
})

export const SelectField = createField(props => <Select {...props} />)
