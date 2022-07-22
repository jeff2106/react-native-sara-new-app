import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput as Input } from 'react-native'
import { tailwind } from '@/tailwind'
import { MaskedTextInput } from 'react-native-mask-text'

const TextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  mask,
  disabled,
  style,
}) => {
  const [isFocused, setFocused] = useState(false)

  return (
    <View style={style}>
      {label && (
        <Text
          style={[
            tailwind('font-bold text-sm mb-1 ml-1'),
            isFocused ? tailwind('text-primary') : tailwind('text-gray-400'),
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          tailwind(
            'h-14 bg-white rounded-sm border-2 w-full items-center flex-wrap mb-3',
          ),
          isFocused ? tailwind('border-primary') : tailwind('border-gray-400'),
        ]}
      >
        {!disabled && (
          <MaskedTextInput
            mask={mask}
            onChangeText={(text, rawText) => {
              onChangeText(text)
              console.log(text)
              console.log(rawText)
            }}
            style={tailwind('w-full h-full text-gray-900 p-4')}
            placeholderTextColor={'#d1d5db'}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onFocus={() => setFocused(true)}
            onEndEditing={() => setFocused(false)}
          />
        )}
        {disabled && (
          <Text style={tailwind('w-full h-full text-gray-300 p-4')}>
            {value}
          </Text>
        )}
      </View>
    </View>
  )
}

TextInput.propTypes = {
  label: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.any,
}

TextInput.defaultProps = {
  label: undefined,
  value: '',
  placeholder: '',
  secureTextEntry: false,
}

export default TextInput
