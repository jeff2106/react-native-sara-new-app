import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'

const DateInput = ({
  label,
  value,
  maximumDate,
  onChange,
  placeholder,
  disabled,
  style,
}) => {
  const [showModal, setShowModal] = useState(false)

  const toggleShowModal = () => {
    setShowModal(!showModal)
  }

  return (
    <View style={style}>
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
      <TouchableOpacity
        onPress={disabled ? null : toggleShowModal}
        style={[
          tailwind(
            'h-14 rounded-sm border w-full items-center flex-wrap mb-3 border-blueGray',
          ),
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
        ]}
      >
        {!disabled && (
          <View style={tailwind('flex-1 justify-center p-4')}>
            <Text>
              {!value && placeholder && placeholder}
              {value && moment(value).format('DD/MM/YYYY')}
            </Text>
          </View>
        )}
        {disabled && (
          <Text style={tailwind('w-full h-full text-gray-800 p-4')}>
            {!value && placeholder && placeholder}
            {value && moment(value).format('DD/MM/YYYY')}
          </Text>
        )}
      </TouchableOpacity>
      {showModal && (
        <DatePicker
          modal
          mode="date"
          title={label}
          open={showModal}
          date={value}
          locale="fr-FR"
          maximumDate={maximumDate}
          onConfirm={date => {
            setShowModal(false)
            onChange(date)
          }}
          onCancel={() => {
            setShowModal(false)
          }}
        />
      )}
    </View>
  )
}

DateInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
}

DateInput.defaultProps = {
  label: undefined,
  value: '',
  placeholder: '',
}

export default DateInput
