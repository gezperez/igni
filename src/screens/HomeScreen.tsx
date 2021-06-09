import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react-lite'

import { HomeScreenProps } from '~/navigation/interfaces/home'

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const handleOnPress = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation])

  return <TouchableOpacity onPress={() => handleOnPress()} />
}

export default observer(HomeScreen)
