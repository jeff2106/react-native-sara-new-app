import React from 'react'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { useTheme } from '@/Theme'
import { default as Image } from 'react-native-fast-image'

const WaitingItem = ({ data }) => {
  const { Images } = useTheme()

  return (
    <View style={tailwind('flex-row mt-4 mb-4 items-center')}>
      <Image
        source={{ uri: data?.r_image_url }}
        style={tailwind('h-12 w-12')}
        resizeMode="contain"
      />
      <Text
        style={[
          tailwind('flex-1 text-base text-gray-900 ml-2'),
          { fontFamily: 'Gilroy-Bold' },
        ]}
      >
        {data?.r_name}
      </Text>
    </View>
  )
}

WaitingItem.propTypes = {}

WaitingItem.defaultProps = {}

export default WaitingItem
