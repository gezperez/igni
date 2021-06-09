import { cloneElement, isValidElement, ReactNode } from 'react'

export type KeyExtractor<ItemT> = (item: ItemT, index: number) => string

export type ItemInfo<ItemT, PropsT> = {
  item: ItemT
  index: number
  props: PropsT
}

export type RenderItem<ItemT, PropsT extends object = {}> = (info: ItemInfo<ItemT, PropsT>) => ReactNode

export type RenderListProps<ItemT, PropsT extends object = {}> = {
  data: ReadonlyArray<ItemT> | null | undefined
  keyExtractor?: KeyExtractor<ItemT>
  renderItem: RenderItem<ItemT, PropsT>
  props?: PropsT
}

const renderList = <ItemT, PropsT extends object = {}>({
  data,
  keyExtractor,
  renderItem,
  props = {} as PropsT,
}: RenderListProps<ItemT, PropsT>): ReactNode => {
  if (!data) {
    return null
  }

  return data.map((item, index) => {
    const element = renderItem({
      item,
      index,
      props,
    })

    if (!isValidElement(element)) {
      return element
    }

    if (typeof keyExtractor === 'function') {
      return cloneElement(element, {
        key: keyExtractor(item, index),
      })
    }

    return element
  })
}

export default renderList
