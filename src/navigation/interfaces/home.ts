import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from './navigation'

export type HomeStackParamList = {
  Home: undefined
}

export type HomeScreenProps = {
  route: RouteProp<RootStackParamList, 'Home'>
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}
