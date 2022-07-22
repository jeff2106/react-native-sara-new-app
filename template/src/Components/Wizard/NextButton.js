import React from 'react'
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const NextButton = ({ onPress, children, isDisabled, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={isDisabled || isLoading ? null : onPress}
      style={[
        tailwind(
          'h-14 pl-6 pr-6 pt-1 pb-1  justify-center items-center rounded-md',
        ),
        isDisabled || isLoading
          ? tailwind('bg-gray-300')
          : tailwind('bg-primary'),
      ]}
    >
      {!isLoading && (
        <View style={tailwind('flex-row justify-center items-center')}>
          <Text
            style={[
              tailwind('text-white font-bold text-base'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {children}
          </Text>
          <Icon color={Colors.white} name="chevron-right" size={16} />
        </View>
      )}
      {isLoading && (
        <View style={tailwind('flex-row justify-center items-center')}>
          <ActivityIndicator color={Colors.white} size="small" />
          <Text
            style={[
              tailwind('text-white font-bold text-base ml-2'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Chargement
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

NextButton.propTypes = {}

NextButton.defaultProps = {}

export default NextButton
