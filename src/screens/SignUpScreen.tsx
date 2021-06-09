import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import { observer } from 'mobx-react-lite'

import { useStore } from '~/store'

const LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user
    }
  }
`

const SignUpScreen = () => {
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)

  const { authStore } = useStore()

  const handleLoginPress = () => {
    try {
      const [login, { error, data, loading }] = useMutation(LOGIN, {
        variables: {
          email,
          password,
        },
      })

      login()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'usuario'}
        placeholderTextColor={'black'}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder={'usuario'}
        placeholderTextColor={'black'}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder={'usuario'}
        placeholderTextColor={'black'}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder={'contraseña'}
        placeholderTextColor={'black'}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity onPress={handleLoginPress} style={styles.button} />
    </View>
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

export default observer(SignUpScreen)
