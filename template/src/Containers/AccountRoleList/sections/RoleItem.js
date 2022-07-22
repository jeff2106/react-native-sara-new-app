import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'

const RoleItem = ({ role, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tailwind(
          'flex-row w-full p-4 rounded-md bg-blueGray mt-2 items-center justify-between',
        ),
        { elevation: 1 },
      ]}
    >
      <View style={tailwind('flex-1 mr-5')}>
        <Text
          numberOfLines={1}
          style={[
            tailwind('text-base text-gray-500'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {role.r_libelle}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            tailwind('text-xs text-gray-500'),
            { fontFamily: 'Gilroy-Medium' },
          ]}
        >
          {role.r_code}
        </Text>
      </View>

      <View style={tailwind('flex-row items-center')}>
        <View
          style={[
            tailwind('rounded-full bg-primary bg-opacity-25'),
            { marginStart: 10 },
          ]}
        >
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

RoleItem.propTypes = {}

RoleItem.defaultProps = {}

export default RoleItem
