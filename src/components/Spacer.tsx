import React, { Children, cloneElement, FC, isValidElement, PropsWithChildren } from 'react'
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native'
import { isNumber } from 'lodash'

export type SpacerGutter = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const spacerGutterSizes: Record<SpacerGutter, number> = {
  xxs: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 40,
  xl: 64,
}

export type SpacerProps = PropsWithChildren<{
  gutter?: number | SpacerGutter
  horizontal?: boolean
}> &
  ViewProps

const Spacer: FC<SpacerProps> = ({ gutter = 0, horizontal = false, children, style, ...props }) => {
  const gutterSize = isNumber(gutter) ? gutter : spacerGutterSizes[gutter]

  return (
    <View style={[style, horizontal && styles.horizontal]} {...props}>
      {Children.toArray(children)
        .filter(child => isValidElement(child))
        .map((child: any, index) =>
          cloneElement(child, {
            style: [
              child.props.style,
              {
                [horizontal ? 'marginLeft' : 'marginTop']: index ? gutterSize : 0,
              },
            ],
          })
        )}
    </View>
  )
}

type Styles = {
  horizontal: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  horizontal: {
    flexDirection: 'row',
  },
})

export default Spacer
