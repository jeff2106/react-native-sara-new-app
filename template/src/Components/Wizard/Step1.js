import React from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'

const Step1 = ({}) => {
  const { width } = useWindowDimensions()

  return (
    <View
      style={[tailwind('flex-1 justify-center items-center w-full'), { width }]}
    >
      <Text>Etape 1</Text>
    </View>
  )
}

Step1.propTypes = {}

Step1.defaultProps = {}

export default Step1
