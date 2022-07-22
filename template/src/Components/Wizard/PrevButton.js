import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'

const PrevButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tailwind(
          'h-14 pl-6 pr-6 pt-1 pb-1 bg-gray-100 justify-center items-center rounded-md',
        ),
      ]}
    >
      <View style={tailwind('flex-row justify-center items-center')}>
        <Icon color={Colors.gray_900} name="chevron-left" />
        <Text
          style={[
            tailwind('font-bold text-gray-500 ml-2 text-base'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          Précédent
        </Text>
      </View>
    </TouchableOpacity>
  )
}

PrevButton.propTypes = {}

PrevButton.defaultProps = {}

export default PrevButton
