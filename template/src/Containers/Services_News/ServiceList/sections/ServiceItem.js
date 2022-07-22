import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, TouchableOpacity, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { useTheme } from '@/Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'

const ServiceItem = ({ data, onPress }) => {
  const dispatch = useDispatch()

  const { Images } = useTheme()

  return (
    <TouchableOpacity onPress={onPress} style={[tailwind('mb-3')]}>
      <View
        style={tailwind(
          'flex-row p-4 rounded-md bg-gray-100 items-center justify-between',
        )}
      >
        <Text
          style={[
            tailwind('flex-1 font-bold text-gray-700 text-sm'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {data.libelle}
        </Text>
        <View style={tailwind('flex-row items-center')}>
          <View
            style={[
              tailwind('rounded-full bg-gray-500 bg-opacity-25'),
              { marginStart: 10 },
            ]}
          >
            <Icon
              color={Colors.gray_500}
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

export default ServiceItem
