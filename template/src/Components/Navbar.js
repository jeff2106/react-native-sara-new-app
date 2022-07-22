import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import { DrawerActions } from '@react-navigation/native'

const NavBar = ({ title, hasBack, hasDrawer, navigation, goBack }) => {
  return (
    <View
      style={[
        tailwind('w-full flex-row pl-4 pr-4 pt-2 pb-2 items-center flex-wrap'),
      ]}
    >
      {hasBack && (
        <TouchableOpacity
          style={tailwind('p-2')}
          onPress={goBack || navigation.goBack}
        >
          <Icon color={Colors.accent} name="keyboard-backspace" size={24} />
        </TouchableOpacity>
      )}
      {hasDrawer && (
        <TouchableOpacity
          style={tailwind('p-2')}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Icon color={Colors.accent} name="menu" size={24} />
        </TouchableOpacity>
      )}
      <Text
        style={[
          tailwind('text-gray-900 font-bold text-lg flex-1 text-center'),
          hasBack ? tailwind('mr-6') : '',
          { fontFamily: 'Gilroy-Bold' },
        ]}
      >
        {title}
      </Text>
      {hasBack ||
        (hasDrawer && (
          <View style={tailwind('p-2')}>
            <View style={{ width: 24 }} />
          </View>
        ))}
    </View>
  )
}

NavBar.propTypes = {
  hasBack: PropTypes.bool,
  hasDrawer: PropTypes.bool,
}

NavBar.defaultProps = {
  hasBack: false,
  hasDrawer: false,
}

export default NavBar
