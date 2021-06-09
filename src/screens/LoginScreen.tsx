import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { isNil } from 'lodash'
import { observer } from 'mobx-react-lite'
import * as yup from 'yup'

import { TextField } from '~/components'
import { useSingleField } from '~/hooks'
import { SingleFieldScreenLayout } from '~/layouts'
import { useStore } from '~/store'

const LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const PROFILE = gql`
  {
    me {
      userName
    }
  }
`

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)

  const [login, { error, data, loading }] = useMutation(LOGIN, {
    variables: {
      email,
      password,
    },
  })

  const [profile, {}] = useLazyQuery(PROFILE)

  console.log(error, data)

  const { authStore } = useStore()

  const handleLoginPress = () => login()

  const handleProfilePress = () => profile()

  const { hintText, fieldSchema } = useHintAndErrorText(4, 12)

  const [handleContinueButtonPress, singleFieldProps] = useSingleField('integer', fieldSchema, {
    onSubmit: () => {},
    fieldProps: {
      label: 'Label',
      accessibilityLabel: 'Acc Label',
      centered: true,
      hint: hintText,
    },
  })

  if (loading) {
    return <ActivityIndicator style={styles.loader} />
  }

  return (
    <SingleFieldScreenLayout
      title={'Login'}
      field={singleFieldProps}
      primaryButton={{
        title: 'Submit Button',
        onPress: () => {},
      }}
    />
  )
}

type Styles = {
  container: ViewStyle
  input: ViewStyle
  loader: ViewStyle
  button: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 50,
    alignSelf: 'center',
  },
  loader: {
    flex: 1,
  },
  button: {
    width: '90%',
    height: 50,
  },
})

export default observer(LoginScreen)

const useHintAndErrorText = (codeMinLength: number | null, codeMaxLength: number | null) => {
  const { t } = useTranslation()

  let fieldSchema = yup.string().required(t('validation.required'))
  let hintText: string | undefined

  const hasCodeMaxLength = !isNil(codeMaxLength) && codeMaxLength > 0
  const hasCodeMinLength = !isNil(codeMinLength) && codeMinLength > 0

  if (hasCodeMaxLength && codeMaxLength === codeMinLength) {
    fieldSchema = yup
      .string()
      .required(t('validation.required'))
      .length(Number(codeMaxLength), t('validation.fixedLength', { codeMaxLength }))
    hintText = t('hintFixedLength', { codeMaxLength })
  } else if (hasCodeMinLength && !hasCodeMaxLength) {
    fieldSchema = yup
      .string()
      .required(t('validation.required'))
      .min(Number(codeMinLength), t('validation.minLength', { codeMinLength }))
  } else if (hasCodeMinLength && hasCodeMaxLength) {
    hintText = t('hintRangeLength', { codeMinLength, codeMaxLength })
    fieldSchema = yup
      .string()
      .required(t('validation.required'))
      .min(Number(codeMinLength), t('validation.minLength', { codeMinLength }))
      .max(Number(codeMaxLength), t('validation.maxLength', { codeMaxLength }))
  }

  return { hintText, fieldSchema }
}
