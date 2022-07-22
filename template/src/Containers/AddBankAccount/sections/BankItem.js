import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { default as Image } from 'react-native-fast-image'
import { tailwind } from '@/tailwind'

const BankItem = ({ onPress, logo, libelle, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tailwind(
          'flex-row p-1 m-1 ml-2 rounded-md bg-white items-center justify-between',
        ),
        { elevation: 1 },
        style,
      ]}
    >
      <View style={tailwind('flex-1 flex-row items-center mr-2')}>
        <Image
          source={{ uri: logo }}
          style={tailwind('h-12 w-12 mr-2')}
          resizeMode="contain"
        />
        <View style={tailwind('items-center')}>
          <Text
            numberOfLines={1}
            style={[
              tailwind('text-sm font-bold text-gray-600'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {libelle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

BankItem.propTypes = {}

BankItem.defaultProps = {}

export default BankItem
