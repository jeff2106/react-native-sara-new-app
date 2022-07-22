import React from 'react'
import { View, Animated, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions()

  return (
    <View style={[tailwind('flex-row justify-center'), { height: 20 }]}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        })

        return (
          <Animated.View
            style={[
              tailwind('bg-primary'),
              {
                height: 10,
                width: dotWidth,
                borderRadius: 5,
                marginHorizontal: 8,
                opacity,
              },
            ]}
            key={i.toString()}
          />
        )
      })}
    </View>
  )
}

Paginator.propTypes = {}

Paginator.defaultProps = {}

export default Paginator
