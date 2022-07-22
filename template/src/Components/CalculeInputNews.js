import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { MaskService } from 'react-native-masked-text'

const CalculeInput = ({ label, value, style, errorMessage, min, max }) => {
  const [hasError, setError] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')

  const MASK = {
    precision: 0,
    separator: '.',
    delimiter: '.',
    unit: '',
    suffixUnit: '',
  }
//J'ai passer le precision a 0 de 3
  useEffect(() => {
    if (value?.toString()?.length > 0) {
      if (
        (min !== undefined && min !== null && parseInt(value, 10) < min) ||
        (max !== undefined && max !== null && parseInt(value, 10) > max)
      ) {
        setError(true)
        setValidationMessage(
          `La valeur doit être comprise entre ${min} et ${max}`,
        )
      } else {
        setError(false)
        setValidationMessage(null)
      }
    }
  }, [value])

  return (
    <View style={[style, tailwind('mb-3')]}>
      {label && (
        <Text
          style={[
            tailwind('text-base mb-1 text-gray-600'),
            { fontFamily: 'Gilroy-Regular' },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          tailwind(
            'h-14 rounded-sm border w-full items-center flex-wrap bg-grayLight border-blueGray',
          ),
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
        ]}
      >
        <Text style={tailwind('w-full h-full p-4 text-gray-900 text-right')}>
          {MaskService.toMask('money', value[0].r_valeur || ' ', MASK)}
        </Text>
      </View>
      {value?.toString()?.length > 0 && hasError && (
        <Text style={[tailwind('text-xs font-medium mt-1 text-red-600')]}>
          {validationMessage || errorMessage}
        </Text>
      )}
    </View>
  )
}

CalculeInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
}

CalculeInput.defaultProps = {
  label: undefined,
  value: '',
  placeholder: '',
}

export default CalculeInput
