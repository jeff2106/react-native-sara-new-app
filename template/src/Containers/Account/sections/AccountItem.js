import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@/Theme'
import { Colors } from '@/Theme/Variables'

const AccountItem = ({ name, icon, onPress }) => {
  const { Images } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tailwind('h-14 flex-row items-center p-2 bg-blueGray rounded-sm')}
    >
      <Icon color={Colors.primary} name={icon} size={24} />
      <Text
        style={[
          tailwind('ml-2 font-bold text-base text-gray-500'),
          { fontFamily: 'Gilroy-SemiBold' },
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  )
}

AccountItem.propTypes = {}

AccountItem.defaultProps = {}

export default AccountItem
