import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

const MaintenanceScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{'Actualmente estamos en mantenimiento'}</Text>
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

export default MaintenanceScreen
