import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, TouchableOpacity, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { default as Image } from 'react-native-fast-image'

const CompanyItem = ({ data, onPress }) => {
  const dispatch = useDispatch()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tailwind('items-center justify-center mb-3'), { width: '25%' }]}
    >
      <View style={tailwind('flex flex-col')}>
        <View
          style={tailwind(
            'h-16 w-16 rounded-md border-2 border-gray-200 items-center justify-center',
          )}
        >
          <Image
            source={{ uri: data.r_image_url }}
            style={tailwind('h-14 w-14')}
            resizeMode="contain"
          />
        </View>
        <Text numberOfLines={2} style={tailwind('mt-1 text-xs text-center')}>
          {data.r_nom}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CompanyItem
