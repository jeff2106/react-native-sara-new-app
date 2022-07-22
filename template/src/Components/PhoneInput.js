import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'
import { ButtonText } from '@/Components/index'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useTheme } from '@/Theme'
import { default as Image } from 'react-native-fast-image'
import MaskInput from 'react-native-mask-input'

const PhoneInput = ({
  label,
  value,
  onChangeText,
  onCountryChange,
  placeholder,
  disabled,
  defaultCountryCode,
  style,
}) => {
  const { Images } = useTheme()

  const COUNTRIES = [
    {
      code: 'BJ',
      country: 'Bénin',
      indicatif: '+229',
      flag: Images.BJ,
      placeholder: 'XX-XXX-XXX',
      mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
    {
      code: 'BF',
      country: 'Burkina Faso',
      indicatif: '+226',
      flag: Images.BF,
      placeholder: 'XX-XXX-XXX',
      mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
    {
      code: 'CI',
      country: "Côte d'Ivoire",
      indicatif: '+225',
      flag: Images.CI,
      placeholder: 'XX-XXX-XXX-XX',
      mask: [
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
      ],
    },
    {
      code: 'GW',
      country: 'Guinnée Bissau',
      indicatif: '+245',
      flag: Images.GW,
      placeholder: 'XX-XXX-XXX',
      mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
    {
      code: 'ML',
      country: 'Mali',
      indicatif: '+223',
      flag: Images.ML,
      placeholder: 'XX-XXX-XXX',
      mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
    {
      code: 'NE',
      country: 'Niger',
      indicatif: '+227',
      flag: Images.NE,
      placeholder: 'XX-XXX-XXX',
      mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
    {
      code: 'SN',
      country: 'Sénégal',
      indicatif: '+221',
      flag: Images.SN,
      placeholder: 'XX-XXX-XXX',
      mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
    {
      code: 'TG',
      country: 'Togo',
      indicatif: '+228',
      flag: Images.TG,
      placeholder: 'XX-XXX-XXX',
      mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
  ]

  const phoneInputModalRef = useRef()
  const snapPoints = useMemo(() => ['95%'], [])

  const [isFocused, setFocused] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({})

  const showPhoneInputModal = useCallback(() => {
    phoneInputModalRef.current?.present()
  }, [])

  const onCountrySelect = country => {
    setSelectedCountry(country)
    phoneInputModalRef.current?.dismiss()
  }

  useEffect(() => {
    onCountryChange ? onCountryChange(selectedCountry) : ''
  }, [selectedCountry])

  useEffect(() => {
    let results = COUNTRIES.filter(
      item => item.code.localeCompare(defaultCountryCode) === 0,
    )
    if (results.length > 0) {
      setSelectedCountry(results[0])
      onCountryChange(results[0])
    } else {
      setSelectedCountry({})
    }
  }, [])

  return (
    <View style={style}>
      {label && (
        <Text
          style={[
            tailwind('text-base mb-1'),
            { fontFamily: 'Gilroy-Regular' },
            isFocused ? tailwind('text-primary') : tailwind('text-gray-600'),
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          tailwind(
            'h-14 bg-blueGray rounded-sm border w-full items-center flex-wrap mb-3',
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
          isFocused ? tailwind('border-primary') : tailwind('border-blueGray'),
        ]}
      >
        {!disabled && (
          <View style={tailwind('flex-1 flex-row')}>
            <TouchableOpacity
              onPress={showPhoneInputModal}
              style={tailwind(
                'flex-row p-1 bg-blueGray items-center justify-center',
              )}
            >
              <Image
                source={selectedCountry.flag}
                style={{ width: 16, height: 16 }}
              />
              <Text style={tailwind('ml-1 font-bold text-xs text-gray-700')}>
                {selectedCountry.indicatif}
              </Text>
              <Icon color={Colors.gray_900} name="chevron-down" size={14} />
            </TouchableOpacity>
            <MaskInput
              onFocus={() => {
                setFocused(true)
                onCountryChange(selectedCountry)
              }}
              onEndEditing={() => setFocused(false)}
              style={tailwind('w-full h-full text-gray-900 p-4')}
              onChangeText={(masked, unmasked) => {
                onChangeText(unmasked)
              }}
              mask={selectedCountry.mask}
              value={value}
              placeholder={selectedCountry.placeholder || placeholder}
              keyboardType="phone-pad"
              placeholderTextColor={'#d1d5db'}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <BottomSheetModal
              ref={phoneInputModalRef}
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
                  Sélectionnez un pays
                </Text>
                <ScrollView style={tailwind('mt-5')}>
                  {COUNTRIES.map(country => (
                    <TouchableOpacity
                      onPress={() => onCountrySelect(country)}
                      key={country.code}
                      style={[
                        tailwind('flex-row justify-between p-3 mb-2'),
                        {
                          borderBottomColor: Colors.gray_200,
                          borderBottomWidth: 1,
                        },
                      ]}
                    >
                      <Image
                        source={country.flag}
                        style={{ width: 24, height: 24 }}
                      />
                      <Text
                        style={[
                          tailwind('text-gray-500 text-base'),
                          { fontFamily: 'Gilroy-Medium' },
                        ]}
                      >
                        {country.country}
                      </Text>
                      <Text
                        style={[
                          tailwind('text-gray-500 text-sm'),
                          { fontFamily: 'Gilroy-Bold' },
                        ]}
                      >
                        {country.indicatif}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <ButtonText
                    onPress={() => phoneInputModalRef.current?.dismiss()}
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

PhoneInput.propTypes = {
  defaultCountryCode: PropTypes.string,
  label: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.any,
}

PhoneInput.defaultProps = {
  defaultCountryCode: 'CI',
  label: undefined,
  value: '',
  placeholder: '',
  secureTextEntry: false,
}

export default PhoneInput
