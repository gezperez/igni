import React, { FC } from 'react'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import { IconProps as VectorIconProps, ImageSource } from 'react-native-vector-icons/Icon'

import icoMoonConfig from './selection.json'

export type SmallIconName =
  | 'angle-down'
  | 'angle-left'
  | 'angle-right'
  | 'angle-up'
  | 'arrow-down-dash'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up-dash'
  | 'arrow-up'
  | 'check-circle-solid'
  | 'check-circle'
  | 'check'
  | 'circle-solid'
  | 'clip'
  | 'clock'
  | 'cross-circle-solid'
  | 'cross-circle'
  | 'cross'
  | 'double-check'
  | 'excl-circle'
  | 'i-circle'
  | 'minus-circle-solid'
  | 'minus-circle'
  | 'minus'
  | 'paper'
  | 'pencil'
  | 'plus-circle-solid'
  | 'plus-circle'
  | 'plus'
  | 'power'
  | 'ray'
  | 'ray-solid'
  | 'search'
  | 'share'
  | 'star-solid'
  | 'star'
  | 'telephone'
  | 'trash-bin'

export type MediumIconName =
  | 'arrow-down-line'
  | 'arrow-left'
  | 'arrow-right'
  | 'bell'
  | 'clip'
  | 'cog'
  | 'comment-question'
  | 'comments'
  | 'cross'
  | 'go-out'
  | 'headset'
  | 'paper-clip'
  | 'share-android'
  | 'share-ios'
  | 'user'

export type LargeIconName =
  | 'arrow-down-circle'
  | 'arrow-down-line'
  | 'arrows'
  | 'arrows-curved'
  | 'arrows-diagonal'
  | 'bubbles'
  | 'burger'
  | 'bus'
  | 'car'
  | 'cards-dollar'
  | 'cash-angle-down'
  | 'cash-in'
  | 'cash-out'
  | 'cash'
  | 'chart-bar-line'
  | 'chart-pie'
  | 'check-circle'
  | 'check'
  | 'comment-dollar'
  | 'copy'
  | 'credit-card'
  | 'cross-back'
  | 'cross-circle'
  | 'delete'
  | 'dog'
  | 'dollar-arrow-up'
  | 'dollar-back'
  | 'dollar-bag'
  | 'dollar-loop'
  | 'dollar-rise'
  | 'dots-lines'
  | 'drops'
  | 'envelope'
  | 'eye-slash'
  | 'eye'
  | 'faceid'
  | 'fingerprint'
  | 'fire'
  | 'frame-dash'
  | 'gift-box'
  | 'hand-coin'
  | 'hanger'
  | 'house'
  | 'id-card'
  | 'key'
  | 'link'
  | 'mobile-phone'
  | 'museum'
  | 'paper-check'
  | 'paper-clip'
  | 'paper-pin-slash'
  | 'paper-pin'
  | 'paper-plane'
  | 'pause'
  | 'pencil'
  | 'percentage'
  | 'pin'
  | 'plane'
  | 'play-rectangle'
  | 'play'
  | 'plus'
  | 'ray'
  | 'receipt-arrow'
  | 'receipt'
  | 'receipt-check'
  | 'sand-clock'
  | 'share-android'
  | 'share-ios'
  | 'shield'
  | 'shopping-cart'
  | 'sound-off'
  | 'sound-on'
  | 'star-circle'
  | 'stethoscope-heart'
  | 't-shirt'
  | 'target'
  | 'telephone'
  | 'thumb-down'
  | 'thumb-up'
  | 'ticket'
  | 'trash-bin'
  | 'truck'
  | 'tv-set'
  | 'various'
  | 'wallet'
  | 'whatsapp'
  | 'wifi'

export type ExtraLargeIconName =
  | 'bubbles'
  | 'card-id'
  | 'cero-percent'
  | 'check-circle'
  | 'cross-circle'
  | 'dots-rectangle'
  | 'envelope'
  | 'exclamation-sign-circle'
  | 'happy-face'
  | 'mobile-phone'
  | 'money-bill-out'
  | 'neutral-face'
  | 'paper-pen'
  | 'papers-sign'
  | 'qr'
  | 'sad-face'
  | 'scan'
  | 'thumb-down'
  | 'thumb-up'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

const Icon = createIconSetFromIcoMoon(icoMoonConfig)

const iconSizes: Record<IconSize, number> = {
  sm: 16,
  md: 32,
  lg: 32,
  xl: 48,
}

export type IconProps<IconNameT> = {
  name: IconNameT
  bold?: boolean
} & Omit<VectorIconProps, 'name'>

const createIcon = <IconNameT extends {}>(size: IconSize) => {
  const getName = (rawName: IconNameT, iconSize: IconSize, bold?: boolean) => {
    const name = `${iconSize}-${rawName}`

    return bold ? `${name}-bold` : name
  }

  const IconComponent: FC<IconProps<IconNameT>> = ({ name, bold, ...props }) => (
    <Icon name={getName(name, size, bold)} size={iconSizes[size]} {...props} />
  )

  return IconComponent
}

export const SmallIcon = createIcon<SmallIconName>('sm')

export const MediumIcon = createIcon<MediumIconName>('md')

export const LargeIcon = createIcon<LargeIconName>('lg')

export const ExtraLargeIcon = createIcon<ExtraLargeIconName>('xl')

export type MediumIconImageName =
  | 'arrow-down-line'
  | 'arrow-left'
  | 'arrow-right'
  | 'bell'
  | 'clip'
  | 'cog'
  | 'comment-question'
  | 'comments'
  | 'cross'
  | 'go-out'
  | 'headset'
  | 'paper-clip'
  | 'ray-solid'
  | 'ray'
  | 'share-android'
  | 'share-ios'
  | 'user'

export const MediumIconImage: Record<MediumIconImageName, ImageSource> = {
  'arrow-down-line': require('../assets/icons/md-arrow-down-line.png'),
  'arrow-left': require('../assets/icons/md-arrow-left.png'),
  'arrow-right': require('../assets/icons/md-arrow-right.png'),
  bell: require('../assets/icons/md-bell.png'),
  clip: require('../assets/icons/md-clip.png'),
  cog: require('../assets/icons/md-cog.png'),
  'comment-question': require('../assets/icons/md-comment-question.png'),
  comments: require('../assets/icons/md-comments.png'),
  cross: require('../assets/icons/md-cross.png'),
  'go-out': require('../assets/icons/md-go-out.png'),
  headset: require('../assets/icons/md-headset.png'),
  'paper-clip': require('../assets/icons/md-paper-clip.png'),
  'ray-solid': require('../assets/icons/md-ray-solid.png'),
  ray: require('../assets/icons/md-ray.png'),
  'share-android': require('../assets/icons/md-share-android.png'),
  'share-ios': require('../assets/icons/md-share-ios.png'),
  user: require('../assets/icons/md-user.png'),
}

export type LargeBoldIconImageName =
  | 'arrows'
  | 'arrows-curved'
  | 'cash-angle-down'
  | 'chart-bar-line'
  | 'chart-pie'
  | 'credit-card'
  | 'dollar-loop'
  | 'dollar-rise'
  | 'dots-lines'
  | 'hand-coin'
  | 'house'
  | 'paper-plane'
  | 'plus'
  | 'receipt'
  | 'wallet'

export const LargeBoldIconImage: Record<LargeBoldIconImageName, ImageSource> = {
  arrows: require('../assets/icons/lg-arrows-bold.png'),
  'arrows-curved': require('../assets/icons/lg-arrows-curved-bold.png'),
  'cash-angle-down': require('../assets/icons/lg-cash-angle-down-bold.png'),
  'chart-bar-line': require('../assets/icons/lg-chart-bar-line-bold.png'),
  'chart-pie': require('../assets/icons/lg-chart-pie-bold.png'),
  'credit-card': require('../assets/icons/lg-credit-card-bold.png'),
  'dollar-loop': require('../assets/icons/lg-dollar-loop-bold.png'),
  'dollar-rise': require('../assets/icons/lg-dollar-rise-bold.png'),
  'dots-lines': require('../assets/icons/lg-dots-lines-bold.png'),
  'hand-coin': require('../assets/icons/lg-hand-coin-bold.png'),
  house: require('../assets/icons/lg-house-bold.png'),
  'paper-plane': require('../assets/icons/lg-paper-plane-bold.png'),
  plus: require('../assets/icons/lg-plus-bold.png'),
  receipt: require('../assets/icons/lg-receipt-bold.png'),
  wallet: require('../assets/icons/lg-wallet-bold.png'),
}
