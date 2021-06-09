import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react-lite'

import { LoginScreenProps } from '~/navigation/interfaces/auth'

const RecoverPasswordScreen = ({ navigation }: LoginScreenProps) => {
  const handleOnPress = useCallback(() => {
    navigation.navigate('HomeStack', { screen: 'Home' })
  }, [navigation])

  return <TouchableOpacity onPress={handleOnPress} />
}

export default observer(RecoverPasswordScreen)
