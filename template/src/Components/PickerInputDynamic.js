import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'
import { ButtonText } from '@/Components/index'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { isEmpty, isEqual } from 'lodash'

const PickerInput = ({
  label,
  value,
  onOptionChange,
  disabled,
  style,
  options,
  propsDisplay = undefined,
  propsImage = undefined,
  propsValue = undefined,
}) => {
  const pickerModalRef = useRef()
  const snapPoints = useMemo(() => ['95%'], [])

  const [selectedOption, setSelectedOption] = useState({})

  const showPhoneInputModal = useCallback(() => {
    pickerModalRef.current?.present()
  }, [])

  const onOptionSelect = option => {
    propsValue
      ? setSelectedOption(option[propsValue])
      : setSelectedOption(option)
    pickerModalRef.current?.dismiss()
  }

  useEffect(() => {
    selectedOption ? onOptionChange(selectedOption) : ''
  }, [selectedOption])

  useEffect(() => {
    let results = options.filter(item => item[propsValue] === value)
    console.debug('selected : ', results)
    results.length > 0 ? setSelectedOption(results[0]) : setSelectedOption(null)
  }, [])

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
      <View
        style={[
          tailwind(
            'h-14 bg-blueGray rounded-sm border w-full items-center flex-wrap mb-3 border-blueGray',
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
        {!disabled && (
          <View style={tailwind('flex-1 flex-row')}>
            <TouchableOpacity
              onPress={showPhoneInputModal}
              style={tailwind('flex-1 flex-row p-1 bg-blueGray items-center')}
            >
              <View style={tailwind('flex-1 p-2')}>
                {isEmpty(selectedOption) && (
                  <Text
                    numberOfLines={1}
                    style={[
                      tailwind('flex-1 ml-1 text-sm text-gray-400'),
                      { fontFamily: 'Gilroy-Regular' },
                    ]}
                  >
                    {label}
                  </Text>
                )}
                {propsDisplay && !isEmpty(selectedOption) && (
                  <View style={tailwind('flex-row items-center')}>
                    <Text
                      numberOfLines={1}
                      style={[tailwind('flex-1 ml-1 text-gray-900')]}
                    >
                      {
                        options?.find(
                          option => option[propsValue] === selectedOption,
                        )[propsDisplay]
                      }
                    </Text>
                  </View>
                )}
              </View>
              <Icon color={Colors.gray_900} name="chevron-down" size={14} />
            </TouchableOpacity>
            <BottomSheetModal
              ref={pickerModalRef}
              index={0}
              snapPoints={snapPoints}
            >
              <View style={tailwind('flex flex-1 p-4')}>
                <Text
                  style={[
                    tailwind('font-bold text-gray-900 text-2xl mb-2'),
                    { fontFamily: 'Gilroy-Bold' },
                  ]}
                >
                  {label}
                </Text>
                <ScrollView style={tailwind('mt-5')}>
                  {options.map((option, index) => (
                    <TouchableOpacity
                      onPress={() => onOptionSelect(option)}
                      key={index}
                      style={[
                        tailwind(
                          'flex-row justify-between p-3 mb-2 items-center',
                        ),
                        isEqual(selectedOption, option)
                          ? tailwind('bg-grayLight')
                          : '',
                        {
                          borderBottomColor: Colors.gray_200,
                          borderBottomWidth: 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          tailwind('flex-1 text-gray-500 text-base'),
                          { fontFamily: 'Gilroy-Medium' },
                        ]}
                      >
                        {propsDisplay ? option[propsDisplay] : option.label}
                      </Text>
                      {propsImage && <View />}
                    </TouchableOpacity>
                  ))}
                  <ButtonText
                    onPress={() => pickerModalRef.current?.dismiss()}
                    style={tailwind('mt-16')}
                  >
                    Annuler
                  </ButtonText>
                </ScrollView>
              </View>
            </BottomSheetModal>
          </View>
        )}
        {disabled && (
          <Text style={tailwind('w-full h-full text-gray-600 p-4')}>
            {!isEmpty(value)
              ? options?.find(option => option[propsValue] === value)[
                  propsDisplay
                ]
              : ''}
          </Text>
        )}
      </View>
    </View>
  )
}

PickerInput.propTypes = {
  defaultCountryCode: PropTypes.string,
  label: PropTypes.string,
  onOptionChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.any,
}

PickerInput.defaultProps = {
  defaultCountryCode: 'CI',
  label: undefined,
  value: '',
  placeholder: '',
  secureTextEntry: false,
}

export default PickerInput
