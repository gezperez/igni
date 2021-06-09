import { useEffect } from 'react'
import { BackHandler } from 'react-native'

export type HardwareBackPressHandler = () => boolean | null | undefined

const useHardwareBackPress = (handler: HardwareBackPressHandler) => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => handler())

    return () => {
      subscription.remove()
    }
  }, [handler])
}

export default useHardwareBackPress
