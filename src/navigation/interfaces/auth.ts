import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from './navigation'

export type AuthStackParamList = {
  Login: undefined
}

export type LoginScreenProps = {
  route: RouteProp<RootStackParamList, 'Login'>
  navigation: StackNavigationProp<RootStackParamList, 'Login'>
}
