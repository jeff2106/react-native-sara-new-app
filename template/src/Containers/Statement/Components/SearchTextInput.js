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

const SearchTextInput = ({
  children,
  style,
  onPress,
  disabled,
  onChange,
  placeholder,
  withIcon,
}) => {
  return (
    <View
      onPress={disabled ? null : onPress}
      style={[
        style,
        tailwind(
          'h-14 max-h-14 items-center flex-row bg-gray-300  p-2 mt-2 mb-2 ml-4 mr-2',
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
          backgroundColor: '#F4F6FB',
        },
      ]}
    >
      {withIcon && <Octicons color={Colors.gray} name="search" size={20} />}
      <TextInput
        placeholder={placeholder}
        onChangeText={value => onChange(value)}
        style={[tailwind('ml-2')]}
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
  withIcon: true,
}

export default SearchTextInput
