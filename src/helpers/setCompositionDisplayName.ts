import { ComponentType } from 'react'

const getDisplayName = (Component: ComponentType) => Component.displayName || Component.name || 'Component'

const setCompositionDisplayName = (targetComponent: ComponentType<any>, sourceComponent: ComponentType<any>) => {
  const targetComponentName = getDisplayName(targetComponent)
  const sourceComponentName = getDisplayName(sourceComponent)

  targetComponent.displayName = `${targetComponentName}(${sourceComponentName})`
}

export default setCompositionDisplayName
