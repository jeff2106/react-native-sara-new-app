import React, { useEffect, useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'
import { KeyboardAView, PhoneInput, PickerInput, TextInput } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@/Theme'
import { Config } from '@/Config'

const FormulaireMobileMoney = ({
  data,
  onDataChange,
  onMultipleDataChange,
}) => {
  const { Images } = useTheme()

  const { width } = useWindowDimensions()
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const OPERATEUR = [
    {
      id: 4,
      r_code: 'BFREE',
      r_name: 'B.FREE',
      r_image:
        'https://play-lh.googleusercontent.com/XAYkdq15MiQ_2iTSXU3ijt2pZ-TPyW_KkNzTgDH1_Tlkx0PNLQy5Pnlyn7_8C9LwLEE',
    },
    {
      id: 1,
      r_code: 'OCI',
      r_name: 'Orange CI',
      r_image:
        'https://www.idevice.ro/wp-content/uploads/2015/04/Orange-Romania-logo.jpg',
    },
    {
      id: 2,
      r_code: 'MTNCI',
      r_name: "MTN Côte d'Ivoire",
      r_image: 'https://www.mtn.ci/wp-content/uploads/mtn-ci.jpg',
    },
    {
      id: 2,
      r_code: 'MOOV',
      r_name: 'Moov Africa',
      r_image:
        'https://pbs.twimg.com/profile_images/1352344336239898626/xVqL4BEl_400x400.jpg',
    },
    {
      id: 3,
      r_code: 'WAVE',
      r_name: 'WAVE',
      r_image:
        'https://play-lh.googleusercontent.com/-Mp3XW7uhwn3KGQxUKGPoc4MbA5ti-3-q23TgoVi9ujBgHWW5n4IySvlG5Exwrxsjw',
    },
  ]

  return (
    <View style={[tailwind('flex-1 p-4 w-full'), { width }]}>
      <KeyboardAView>
        <View style={tailwind('flex')}>
          <PickerInput
            label="Sélectionnez un opérateur"
            value={data.r_operateur}
            options={OPERATEUR}
            propsDisplay="r_name"
            propsImage="r_image"
            onOptionChange={value => onDataChange('r_operateur', value)}
          />
          <TextInput
            value={data.r_nom_prenoms}
            onChangeText={value => onDataChange('r_nom_prenoms', value)}
            label="Nom et prénoms du titulaire"
            placeholder="Nom et prénoms du titulaire"
            autoCapitalize="characters"
          />
          <PhoneInput
            defaultCountryCode={
              data.r_country_code || Config.DEFAULT_COUNTRY_CODE
            }
            value={data.r_numero}
            onChangeText={value => onDataChange('r_numero', value)}
            onCountryChange={selectedCountry => {
              onMultipleDataChange({
                r_country_code: selectedCountry?.code,
                r_indicatif_pays: selectedCountry.indicatif?.slice(1),
              })
            }}
            label="Numéro de téléphone"
            placeholder="Numéro de téléphone"
            returnKeyType="next"
          />
        </View>
      </KeyboardAView>
    </View>
  )
}

FormulaireMobileMoney.propTypes = {}

FormulaireMobileMoney.defaultProps = {}

export default FormulaireMobileMoney
