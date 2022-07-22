import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput as Input, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'

const TextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  disabled,
  style,
  type,
  max,
  taille,
  onValidChange,
  autoCapitalize = 'none',
  regex = null,
  errorMessage = "La valeur n'est pas valide",
}) => {
  const [isFocused, setFocused] = useState(false)
  const [isValid, setValid] = useState(false)
  const [hasError, setError] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')

  const [isSecureEntry, setSecureEntry] = useState(type === 'password')

  useEffect(() => {
    if (type === 'email' && value.length > 0) {
      const emailReg = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')
      setValid(emailReg.test(value))
      onValidChange ? onValidChange(isValid) : null
      if (isValid) {
        setValidationMessage('')
        setError(false)
      } else {
        setError(true)
        setValidationMessage("L'adresse email est invalide")
      }
    } else if (regex) {
      const regEx = new RegExp(regex)
      setValid(regEx.test(value))
      onValidChange ? onValidChange(isValid) : null
      if (isValid) {
        setValidationMessage('')
        setError(false)
      } else {
        setError(true)
        setValidationMessage(errorMessage)
      }
    } else {
      setValid(true)
    }
  }, [value, isValid, onValidChange, type, regex, errorMessage])

  return (
    <View style={[style, tailwind('mb-3')]}>
      {label && (
        <Text
          style={[
            tailwind('text-base mb-1'),
            { fontFamily: 'Gilroy-Regular' },
            !hasError
              ? isFocused
                ? tailwind('text-primary')
                : tailwind('text-gray-600')
              : value.length > 0
              ? tailwind('text-red-600')
              : tailwind('text-gray-400'),
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          tailwind('h-14 rounded-sm border w-full items-center flex-wrap'),
          disabled ? tailwind('bg-grayLight') : tailwind('bg-blueGray'),
          {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0.7,
            },
            shadowOpacity: 0.2,
            shadowRadius: 0.7,

            elevation: 0.7,
          },
          !hasError
            ? isFocused
              ? tailwind('border-primary')
              : tailwind('border-blueGray')
            : value.length > 0
            ? tailwind('border-red-600')
            : tailwind('border-blueGray'),
        ]}
      >
        {!disabled && (
          <View style={tailwind('flex-row justify-center p-4 pr-0')}>
            <Input
              onFocus={() => setFocused(true)}
              onEndEditing={() => setFocused(false)}
              style={tailwind('flex-1 h-full text-gray-900')}
              onChangeText={onChangeText}
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType}
              secureTextEntry={isSecureEntry}
              placeholderTextColor={'#d1d5db'}
              autoCorrect={false}
              autoCapitalize={autoCapitalize}
              maxLength={taille}
            />
            {type === 'password' && (
              <>
                <TouchableOpacity
                  onPress={() => setSecureEntry(!isSecureEntry)}
                  style={tailwind('h-full w-8 justify-center items-center')}
                >
                  <Icon
                    name={isSecureEntry ? 'eye-off' : 'eye'}
                    size={24}
                    color={Colors.blueDark}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
        {disabled && (
          <Text style={tailwind('w-full h-full text-gray-800 p-4')}>
            {value}
          </Text>
        )}
      </View>
      {value?.length > 0 && hasError && (
        <Text style={[tailwind('text-xs font-medium mt-1 text-red-600')]}>
          {validationMessage || errorMessage}
        </Text>
      )}
    </View>
  )
}

TextInput.propTypes = {
  label: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'email', 'password']),
  value: PropTypes.any,
}

TextInput.defaultProps = {
  label: undefined,
  value: '',
  placeholder: '',
  secureTextEntry: false,
  type: 'text',
}

export default TextInput
