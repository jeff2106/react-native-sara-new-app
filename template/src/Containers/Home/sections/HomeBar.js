import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@/Theme'
import { Colors } from '@/Theme/Variables'
import { DrawerActions } from '@react-navigation/native'
import BrandInline from '@/Components/BrandInline'

const HomeBar = ({ navigation }) => {
  const { Images } = useTheme()

  return (
    <View
      style={[
        tailwind(
          'h-14 pr-4 pl-4 flex-row items-center justify-between bg-white',
        ),
        {
          shadowColor: Platform.OS === 'ios' ? '#f5f5f5' : '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 1,
          shadowRadius: 1,

          elevation: 5,
        },
      ]}
    >
      <View style={tailwind('flex-1')}>
        <BrandInline height={45} width={150} />
      </View>
      <View style={tailwind('flex-row')}>
        <TouchableOpacity style={tailwind('p-2 justify-center items-center')}>
          <Icon name="bell" color={Colors.accent} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

HomeBar.propTypes = {}

HomeBar.defaultProps = {}

export default HomeBar
