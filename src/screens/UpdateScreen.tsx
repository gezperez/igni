import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

const UpdateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{'Se requiere actualizar la app'}</Text>
    </View>
  )
}

type Styles = {
  container: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default UpdateScreen
