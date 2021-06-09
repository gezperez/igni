import { NavigatorScreenParams } from '@react-navigation/core'

import { AuthStackParamList } from './auth'
import { HomeStackParamList } from './home'

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>
  HomeStack: NavigatorScreenParams<HomeStackParamList>
} & HomeStackParamList &
  AuthStackParamList
