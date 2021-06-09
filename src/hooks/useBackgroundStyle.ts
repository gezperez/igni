import { useContext } from 'react'

import BackgroundStyleContext, { BackgroundStyle } from '../contexts/BackgroundStyleContext'

const useBackgroundStyle = () => useContext<BackgroundStyle>(BackgroundStyleContext)

export default useBackgroundStyle
