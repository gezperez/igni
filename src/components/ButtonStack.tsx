import React, { FC } from 'react'

import renderList, { KeyExtractor, RenderItem, RenderListProps } from '../helpers/renderList'
import Button, { ButtonProps } from './Button'
import Spacer, { SpacerProps } from './Spacer'

const defaultRenderButton: RenderItem<ButtonProps> = ({ item }) => <Button fullWidth {...item} />

const defaultKeyExtractor: KeyExtractor<any> = (item, index) => index.toString()

export type ButtonStackProps = {
  buttons?: ButtonProps[]
  renderButton?: RenderItem<ButtonProps>
} & SpacerProps &
  Pick<RenderListProps<ButtonProps>, 'keyExtractor'>

const ButtonStack: FC<ButtonStackProps> = ({
  buttons,
  gutter = 'sm',
  renderButton = defaultRenderButton,
  keyExtractor = defaultKeyExtractor,
  ...props
}) => (
  <Spacer gutter={gutter} {...props}>
    {renderList({ data: buttons, renderItem: renderButton, keyExtractor })}
  </Spacer>
)

export default ButtonStack
