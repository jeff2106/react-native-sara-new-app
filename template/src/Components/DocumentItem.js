import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Theme'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'

const DocumentItem = ({ label, uri, type, name, size }) => {
  return (
    <View>
      <Text
        style={[
          tailwind('text-gray-900 text-sm mb-2'),
          { fontFamily: 'Gilroy-Medium' },
        ]}
      >
        {label}
      </Text>
      <View
        style={tailwind(
          'h-20 flex-1 flex-row justify-between p-2 mb-5 rounded-md bg-gray-100 items-center',
        )}
      >
        <View style={tailwind('flex-row items-center')}>
          <View
            style={[
              tailwind('rounded-full bg-gray-500 bg-opacity-25'),
              { marginStart: 10 },
            ]}
          >
            <Icon
              color={Colors.gray_500}
              name="file-pdf"
              style={{ margin: 5 }}
              size={24}
            />
          </View>
          <View style={tailwind('flex-1 ml-5')}>
            <Text
              numberOfLines={1}
              style={[
                tailwind('text-gray-500 text-sm'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              {name}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                tailwind('text-gray-500 text-sm'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              {(size / 1048576).toFixed(2)} mb
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

DocumentItem.propTypes = {}

DocumentItem.defaultProps = {}

export default DocumentItem
