import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { MaskedTextInput } from 'react-native-mask-text'

const NumberInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  disabled,
  style,
  type,
  max,
  min,
  taille,
  onValidChange,
  errorMessage,
  autoCapitalize = 'none',
}) => {
  const [isFocused, setFocused] = useState(false)
  const [isValid, setValid] = useState(false)
  const [hasError, setError] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')

  useEffect(() => {
    if (value?.length > 0) {
      if (max !== null) {
        if (
          (min !== undefined && min !== null && parseFloat(value) < min) ||
          (min !== undefined && min !== null && parseFloat(value) > max)
        ) {
          setError(true)
          setValidationMessage(
            `La valeur doit être comprise entre ${min} et ${max}`,
          )
        } else {
          setError(false)
          setValidationMessage(null)
        }
      } else {
        if (min !== undefined && min !== null && parseFloat(value) < min) {
          setError(true)
          setValidationMessage(`La valeur doit être supérieur à ${min}`)
        } else {
          setError(false)
          setValidationMessage(null)
        }
      }
    }
  }, [value, isValid, onValidChange])

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
          <MaskedTextInput
            type="currency"
            options={{
              decimalSeparator: '.',
              groupSeparator: '.',
              precision: 0,
            }}
            onFocus={() => setFocused(true)}
            onEndEditing={() => {
              setFocused(false)
              onChangeText(value)
            }}
            style={tailwind('w-full h-full text-gray-900 p-4')}
            onChangeText={onChangeText}
            defaultValue={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={'#d1d5db'}
            autoCorrect={false}
            autoCapitalize={autoCapitalize}
            maxLength={taille}
          />
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

NumberInput.propTypes = {
  label: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  type: PropTypes.oneOf(['double']),
  value: PropTypes.any,
}

NumberInput.defaultProps = {
  label: undefined,
  value: '',
  placeholder: '',
  secureTextEntry: false,
  type: 'double',
}

export default NumberInput
