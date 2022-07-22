import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput } from 'react-native'
import { tailwind } from '@/tailwind'
import { TextInputMask, MaskService } from 'react-native-masked-text'

const MonetaireInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  disabled,
  style,
  type,
  min,
  max,
  taille,
  errorMessage,
  onValidChange,
}) => {
  const MASK = {
    precision: 0,
    separator: ' ',
    delimiter: ' ',
    unit: '',
    suffixUnit: '',
  }

  const ref = useRef()
  const [isFocused, setFocused] = useState(false)
  const [isValid, setValid] = useState(false)
  const [hasError, setError] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')
  const [amout, setAmout] = useState(0)

  useEffect(() => {
    if (value?.length > 0) {
      if (max !== null) {
        if (
          (min !== undefined && min !== null && parseInt(value, 10) < min) ||
          (min !== undefined && min !== null && parseInt(value, 10) > max)
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
        if (min !== undefined && min !== null && parseInt(value, 10) < min) {
          setError(true)
          setValidationMessage(`La valeur doit être supérieur à ${min}`)
        } else {
          setError(false)
          setValidationMessage(null)
        }
      }
    }
  }, [value, isValid, onValidChange, type])
  //console.log(max == null, min)
  /*
  let number = 2;
              if (value >= 0 && value !== null) {
                if (value >= 0 && min <= value) {
                  setFocused(false)
                  onChangeText(value !== null && value?.replace(/\s/g, ''))
                  console.log(value)
                  setValidePrice(value)
                } else if (value >= 0 && max >= value) {
                  setFocused(false)
                  onChangeText(value !== null && value?.replace(/\s/g, ''))
                  console.log(value)
                  setValidePrice(value)
                } else {
                  console.log('Valeur min max non correspondant !!')
                }
              }
   */
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
          <TextInputMask
            ref={ref}
            onFocus={() => setFocused(true)}
            onEndEditing={() => {
              setFocused(false)
              const zero = '0'
              if (max !== null && value > max) {
                value !== null && onChangeText(zero.replace(/\s/g, ''))
              } else {
                value !== null && onChangeText(value.replace(/\s/g, ''))
              }
            }}
            placeholder={placeholder}
            keyboardType={'numeric'}
            maxLength={taille}
            placeholderTextColor={'#d1d5db'}
            style={tailwind('w-full h-full text-gray-900 p-4')}
            type={'money'}
            options={MASK}
            value={value}
            onChangeText={val => {
              if (max !== null) {
                val !== '' && onChangeText(val.replace(/\s/g, ''))
                //console.log(val)
              } else {
                val !== '' && onChangeText(val.replace(/\s/g, ''))
                //console.log(val)
              }
            }}
            textAlign={'right'}
          />
        )}
        {disabled && (
          <Text style={tailwind('w-full h-full p-4 text-gray-800 text-right')}>
            {MaskService.toMask('money', value || '', MASK)}
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

MonetaireInput.propTypes = {
  label: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  type: PropTypes.oneOf(['monetaire']),
  value: PropTypes.any,
}

MonetaireInput.defaultProps = {
  label: undefined,
  value: '',
  placeholder: '',
  secureTextEntry: false,
  type: 'monetaire',
}

export default MonetaireInput
