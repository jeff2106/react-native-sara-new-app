import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { tailwind } from '@/tailwind'

const HistoryWaitingItem = ({ onPress, style, data }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tailwind(
          'flex-row p-2 rounded-md bg-white items-center justify-between mb-2',
        ),
        { elevation: 1 },
        style,
      ]}
    >
      <View style={tailwind('flex-1 flex-row items-center mr-2')}>
        <Image
          source={{ uri: data.company.logo }}
          style={tailwind('h-12 w-12 mr-2')}
          resizeMode="contain"
        />
        <View style={tailwind('flex-1')}>
          <Text
            numberOfLines={1}
            style={[
              tailwind('text-sm font-bold text-gray-600'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {data.service.libelle}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              tailwind('text-xs text-gray-600'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {new Date(data.created_at).toLocaleDateString()}
            {' - '}
            {new Date(data.created_at).toLocaleTimeString()}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={1}
        style={[
          tailwind('text-xs font-bold text-primary'),
          { fontFamily: 'Gilroy-Bold' },
        ]}
      >
        En attente
      </Text>
    </TouchableOpacity>
  )
}

HistoryWaitingItem.propTypes = {}

HistoryWaitingItem.defaultProps = {}

export default HistoryWaitingItem
