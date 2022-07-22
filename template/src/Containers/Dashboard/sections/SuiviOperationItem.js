import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Colors } from '@/Theme/Variables'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SuiviOperationItem = ({ onPress, title, value, icon, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={tailwind(
          'bg-white p-2 rounded-md flex-row justify-between items-center mb-2',
        )}
      >
        <View style={tailwind('flex-1 flex-row items-center')}>
          <View
            style={[
              tailwind(
                'bg-primary h-12 w-12 rounded-full justify-center items-center',
              ),
              tailwind(color),
            ]}
          >
            {icon}
          </View>
          <Text
            style={[
              tailwind('flex-1 text-sm text-gray-500 ml-2'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {title}
          </Text>
          <View style={tailwind('ml-4 rounded-full bg-blueGray')}>
            <Text
              style={[
                tailwind('text-sm text-primary m-2'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              {value}
            </Text>
          </View>
        </View>

        <View
          style={[
            tailwind('rounded-full bg-primary bg-opacity-25'),
            { marginStart: 10 },
          ]}
        >
          <MaterialCommunityIcons
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

SuiviOperationItem.propTypes = {}

SuiviOperationItem.defaultProps = {}

export default SuiviOperationItem
