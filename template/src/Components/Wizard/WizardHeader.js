import React, { useEffect, useRef, useState } from 'react'
import { View, Animated, useWindowDimensions, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'

const WizardHeader = ({ data, current }) => {
  const { width } = useWindowDimensions()
  const [percent, setPercent] = useState(0)

  const progressAnimation = useRef(new Animated.Value(0)).current
  const progressRef = useRef(null)

  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    const result = (width / data.length) * (current + 1)
    setPercent(result)
  }, [current, data.length, width])

  useEffect(() => {
    animation(percent)
  }, [percent])

  useEffect(() => {
    progressAnimation.addListener(value => {
      if (progressRef.current) {
        progressRef.current.setNativeProps({
          width: value.value,
        })
      }
    })
  }, [percent])

  return (
    <View style={[tailwind('flex-col justify-center items-center')]}>
      <View
        style={tailwind('flex bg-blueGray w-full p-4 flex-row items-center')}
      >
        <View
          style={tailwind(
            'h-12 w-12 bg-primary rounded-full mr-2 justify-center items-center',
          )}
        >
          {!data[current].icon && (
            <Text style={tailwind('text-xl font-bold text-white')}>
              {current + 1}
            </Text>
          )}
          {data[current].icon && (
            <Icon color={Colors.white} size={24} name={data[current].icon} />
          )}
        </View>
        <View style={tailwind('flex-col w-full')}>
          <Text style={tailwind('text-primary font-bold text-sm')}>
            Etape {current + 1} sur {data.length}
          </Text>
          <Text numberOfLines={1} style={tailwind('font-bold text-gray-500')}>
            {data[current].title}
          </Text>
        </View>
      </View>
      <View style={tailwind('flex w-full h-1 bg-primary bg-opacity-20')}>
        <Animated.View
          ref={progressRef}
          style={[tailwind('flex h-1 bg-primary')]}
        />
      </View>
    </View>
  )
}

WizardHeader.propTypes = {}

WizardHeader.defaultProps = {}

export default WizardHeader
