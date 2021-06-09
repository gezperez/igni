import { useCallback, useState } from 'react'
import { Dimensions, LayoutChangeEvent } from 'react-native'

type ContentSizeChange = (w: number, h: number) => void

const { height: windowHeight } = Dimensions.get('window')

const useDynamicScrollView = () => {
  const [contentHeight, setContentHeight] = useState(0)
  const [containerHeight, setContainerHeight] = useState(windowHeight)

  const onContentSizeChange: ContentSizeChange = useCallback((width, height) => setContentHeight(height), [])

  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => setContainerHeight(nativeEvent.layout.height),
    []
  )

  return { scrollEnabled: contentHeight > containerHeight, onContentSizeChange, onLayout }
}

export default useDynamicScrollView
