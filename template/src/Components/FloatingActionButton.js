import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@/Theme'
import { Colors } from '@/Theme/Variables'

const FloatingActionButton = ({ icon, onPress }) => {
  const { Images } = useTheme()

  return (
    <TouchableOpacity onPress={onPress} style={tailwind('absolute bottom-8 right-8')}>
      <View
        style={tailwind(
          'h-16 w-16 bg-primary rounded-full items-center justify-center',
        )}
      >
        <Icon color={Colors.white} size={32} name="plus" />
      </View>
    </TouchableOpacity>
  )
}

FloatingActionButton.propTypes = {}

FloatingActionButton.defaultProps = {}

export default FloatingActionButton
