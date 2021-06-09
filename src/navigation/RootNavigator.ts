import { createRef } from 'react'
import { NavigationContainerRef } from '@react-navigation/core'

export const navigationRef = createRef<NavigationContainerRef>()

export const navigate = (name: string) => navigationRef.current?.navigate(name)
