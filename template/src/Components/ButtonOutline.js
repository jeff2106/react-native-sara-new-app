import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'

const ButtonOuline = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tailwind('h-14 max-h-14 flex-1 justify-center items-center'),
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
        style={tailwind(
          'bg-white border-primary border-2 h-14 w-full justify-center items-center rounded-md',
        )}
      >
        <Text
          style={[
            tailwind('text-primary text-base font-bold'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

ButtonOuline.propTypes = {}

ButtonOuline.defaultProps = {}

export default ButtonOuline
