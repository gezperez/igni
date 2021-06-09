import { createContext } from 'react'

export type BackgroundStyle = 'dark' | 'light'

const BackgroundStyleContext = createContext<BackgroundStyle>('light')

export const BackgroundStyleProvider = BackgroundStyleContext.Provider
export const BackgroundStyleConsumer = BackgroundStyleContext.Consumer

export default BackgroundStyleContext
