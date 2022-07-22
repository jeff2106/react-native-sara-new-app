import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'

const Button = ({ children, style, onPress, disabled, loading }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={disabled ? null : onPress}
      style={[
        style,
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        },
      ]}
    >
      <View
        style={[
          tailwind(
            'h-12  w-full flex-row justify-center items-center rounded-md',
          ),
          tailwind(disabled ? 'bg-gray-300' : 'bg-primary'),
        ]}
      >
        {loading && (
          <ActivityIndicator color={Colors.white} style={tailwind('mr-2')} />
        )}
        <Text
          style={[
            tailwind('text-white text-base font-bold'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
}

Button.defaultProps = {
  disabled: false,
  loading: false,
}

export default Button
