import { createContext, useContext } from 'react'

import { RootStore } from './RootStore'

import 'mobx-react-lite/batchingForReactNative'

const store = new RootStore()

export const StoreContext = createContext(store)

export const useStore = (): RootStore => useContext(StoreContext)

export default store
