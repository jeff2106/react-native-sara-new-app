import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Theme'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'

const AccountTypeItem = ({ title, subTitle, onPress }) => {
  const { Layout, Images } = useTheme()
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          tailwind(
            'bg-white p-5 rounded-sm flex-row mb-3 items-center justify-between',
          ),
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
        <View style={tailwind('flex-1')}>
          <Text
            style={[
              tailwind('text-black font-bold text-lg'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              tailwind('text-gray-500 font-bold text-sm'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {subTitle}
          </Text>
        </View>
        <View style={tailwind('rounded-full bg-primary bg-opacity-25')}>
          <Icon
            color={Colors.primary}
            name="chevron-right"
            style={{ margin: 2 }}
            size={16}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

AccountTypeItem.propTypes = {
  subTitle: PropTypes.string,
  title: PropTypes.string,
}

AccountTypeItem.defaultProps = {
  subTitle: '',
  title: '',
}

export default AccountTypeItem
