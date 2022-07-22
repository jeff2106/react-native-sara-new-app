import React from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'

const Step2 = ({}) => {
  const { width } = useWindowDimensions()

  return (
    <View style={[tailwind('flex-1 justify-center items-center'), { width }]}>
      <Text>Etape 2</Text>
    </View>
  )
}

Step2.propTypes = {}

Step2.defaultProps = {}

export default Step2
