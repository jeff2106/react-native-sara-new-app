import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, TouchableOpacity, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { default as Image } from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'

const CompanyItem = ({ data, onPress }) => {
  const dispatch = useDispatch()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tailwind('justify-center bg-blueGray p-2 mb-3')]}
    >
      <View style={tailwind('flex items-center flex-row')}>
        <View style={tailwind('h-16 w-16 items-center justify-center')}>
          <Image
            source={{ uri: data.r_image_url }}
            style={tailwind('h-16 w-16')}
            resizeMode="contain"
          />
        </View>
        <Text
          numberOfLines={2}
          style={[
            tailwind('flex-1 ml-2 text-base text-gray-900'),
            { fontFamily: 'Gilroy-Regular' },
          ]}
        >
          {data.r_nom}
        </Text>
        <View style={tailwind('justify-center')}>
          <View
            style={[
              tailwind('rounded-full bg-primary bg-opacity-25'),
              { marginStart: 10 },
            ]}
          >
            <Icon
              color={Colors.primary}
              name="chevron-right"
              style={{ margin: 2 }}
              size={16}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CompanyItem
