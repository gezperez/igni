import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { LoginScreen, RecoverPasswordScreen } from '~/screens'

const Stack = createStackNavigator()

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Recover" component={RecoverPasswordScreen} />
  </Stack.Navigator>
)

export default AuthStack
