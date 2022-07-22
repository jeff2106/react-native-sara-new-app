import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'
import Octicons from 'react-native-vector-icons/Octicons'

const SearchTextInput = ({ children, style, onChange, placeholder }) => {
  return (
    <View
      style={[
        style,
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
          backgroundColor: '#F4F6FB',
        },
      ]}
    >
      <TextInput
        placeholder={placeholder}
        onChangeText={value => onChange(value)}
        placeholderTextColor="black"
        style={[tailwind('ml-2 w-full text-black')]}
      />
    </View>
  )
}

SearchTextInput.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
}

SearchTextInput.defaultProps = {
  disabled: false,
  loading: false,
  onChange: () => console.log()
}

export default SearchTextInput
