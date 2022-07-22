import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'
import { ButtonText } from '@/Components/index'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useTheme } from '@/Theme'

const SelectInput = ({
  data,
  label,
  value,
  valueKey,
  onChange,
  placeholder,
  disabled,
  style,
}) => {
  const selectInputModalRef = useRef()
  const snapPoints = useMemo(() => ['95%'], [])

  const [isFocused, setFocused] = useState(false)

  const showSelectInputModal = useCallback(() => {
    selectInputModalRef.current?.present()
  }, [])

  const onSelect = select => {
    onChange(select)
    selectInputModalRef.current?.dismiss()
  }

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
          <View style={tailwind('flex-1 w-full flex-row')}>
            <TouchableOpacity
              onPress={showSelectInputModal}
              style={tailwind('flex-row w-full p-1 bg-white items-center')}
            >
              <Text
                style={[
                  tailwind('flex-1 ml-1 text-sm'),
                  value ? tailwind('text-gray-700') : tailwind('text-gray-300'),
                ]}
              >
                {value ? value[valueKey] : placeholder}
              </Text>
              <Icon color={Colors.gray_900} name="chevron-down" size={20} />
            </TouchableOpacity>
            <BottomSheetModal
              ref={selectInputModalRef}
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
                  {placeholder}
                </Text>
                <ScrollView style={tailwind('mt-5')}>
                  {data &&
                    data.map(item => (
                      <TouchableOpacity
                        onPress={() => onSelect(item)}
                        key={item.id}
                        style={[
                          tailwind('flex-row p-3 mb-2'),
                          {
                            borderBottomColor: Colors.gray_200,
                            borderBottomWidth: 1,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            tailwind('text-gray-500 text-base'),
                            { fontFamily: 'Gilroy-Medium' },
                          ]}
                        >
                          {item[valueKey]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  <ButtonText
                    onPress={() => selectInputModalRef.current?.dismiss()}
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
          <Text style={tailwind('w-full h-full text-gray-300 p-4')}>
            {value}
          </Text>
        )}
      </View>
    </View>
  )
}

SelectInput.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.any.isRequired,
  valueKey: PropTypes.any,
}

SelectInput.defaultProps = {
  data: [],
  label: undefined,
  valueKey: undefined,
  placeholder: '',
  secureTextEntry: false,
}

export default SelectInput
