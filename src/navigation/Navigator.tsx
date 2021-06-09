import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AuthStack from './AuthStack'
import GenericStack from './GenericStack'
import HomeStack from './HomeStack'
import { navigationRef } from './RootNavigator'

const Stack = createStackNavigator()

const linking = {
  prefixes: ['monorepo://'],
  config: {
    screens: {
      AuthStack: {
        screens: {
          Login: 'login/:username',
          Recover: 'recover/:username',
        },
      },
      HomeStack: {
        screens: {
          Home: 'home/:username',
        },
      },
      GenericStack: {
        screens: {
          Maintenance: 'generic/:username',
        },
      },
    },
  },
}

const Navigator = () => (
  <NavigationContainer ref={navigationRef} linking={linking}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="GenericStack" component={GenericStack} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default Navigator
