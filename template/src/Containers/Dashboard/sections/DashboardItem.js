import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DashboardItem = ({ onPress, title, value, icon, color }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tailwind('flex-1 bg-white p-2 rounded-md')}
    >
      <View style={tailwind('flex-row justify-between items-center')}>
        <View style={tailwind('flex-row items-center')}>
          <View
            style={[
              tailwind(
                'h-7 w-7 bg-grayDash rounded-full justify-center items-center',
              ),
              tailwind(color),
            ]}
          >
            {icon}
          </View>
          <Text
            style={[
              tailwind('ml-1 text-xs text-gray-500 text-left'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {title}
          </Text>
        </View>

        <View style={tailwind('flex-row items-center')}>
          <View style={tailwind('mr-2')}>
            <Text
              numberOfLines={1}
              style={[
                tailwind('flex-1 ml-1 text-2xl text-primary text-right'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              {value}
            </Text>
          </View>
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
      </View>
    </TouchableOpacity>
  )
}

DashboardItem.propTypes = {}

DashboardItem.defaultProps = {}

export default DashboardItem
