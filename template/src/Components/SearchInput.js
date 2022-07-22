import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '@/Theme/Variables'

const SearchInput = ({ value, onChangeText, placeholder, style }) => {
  return (
    <View
      style={tailwind('flex-row p-2 bg-blueGray rounded-md h-14 items-center')}
    >
      <Icon name="search" size={24} color={Colors.gray_500} />
      <TextInput
        style={[tailwind('flex-1 ml-2'), style]}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray_500}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

SearchInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
}

SearchInput.defaultProps = {
  value: '',
  placeholder: '',
}

export default SearchInput
