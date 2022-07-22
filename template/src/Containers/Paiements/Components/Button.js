import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'

const ButtonPaiement = ({
  children,
  style,
  onPress,
  disabled,
  loading,
  height,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={disabled ? null : onPress}
      style={[
        style,
        tailwind('h-14 max-h-14 justify-center items-center'),
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
            'h-14 w-full flex-row justify-center items-center rounded-md',
          ),
          tailwind(disabled ? 'bg-gray-300' : 'bg-primary'),
          {
            height,
          },
        ]}
      >
        {loading && (
          <ActivityIndicator
            color={Colors.white}
            style={tailwind(' self-center ')}
          />
        )}
        {!loading && children}
      </View>
    </TouchableOpacity>
  )
}

ButtonPaiement.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
}

ButtonPaiement.defaultProps = {
  disabled: false,
  loading: false,
}

export default ButtonPaiement
