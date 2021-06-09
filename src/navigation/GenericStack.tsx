import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { MaintenanceScreen, UpdateScreen } from '~/screens'

const Stack = createStackNavigator()

const GenericStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Update" component={UpdateScreen} />
    <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
  </Stack.Navigator>
)

export default GenericStack
