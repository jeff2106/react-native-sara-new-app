import React from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'

const Step3 = ({}) => {
  const { width } = useWindowDimensions()

  return (
    <View style={[tailwind('flex-1 justify-center items-center'), { width }]}>
      <Text>Etape 3</Text>
    </View>
  )
}

Step3.propTypes = {}

Step3.defaultProps = {}

export default Step3
