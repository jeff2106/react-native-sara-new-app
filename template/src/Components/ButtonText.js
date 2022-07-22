import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'

const ButtonText = ({ children, onPress, iconLeft, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tailwind('h-14 max-h-14 justify-center items-center rounded-md'),
        style,
      ]}
    >
      <View
        style={tailwind(
          'h-14 flex-row justify-center items-center rounded-md p-4',
        )}
      >
        {iconLeft && <Icon color={Colors.primary} name={iconLeft} size={16} />}
        <Text
          style={[
            tailwind('text-primary font-bold'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

ButtonText.propTypes = {}

ButtonText.defaultProps = {}

export default ButtonText
