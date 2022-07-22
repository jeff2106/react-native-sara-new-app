import React, { useEffect, useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'
import { KeyboardAView, PickerInput, TextInput } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@/Theme'
import { Config } from '@/Config'

const FormulaireCarteCredit = ({
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

  const TYPE_CARTE = [
    {
      id: 1,
      r_code: 'VISA',
      r_name: 'VISA',
      r_image:
        'https://logowik.com/content/uploads/images/t_visa-payment-card1873.jpg',
    },
    {
      id: 2,
      r_code: 'MASTERCARD',
      r_name: 'MASTERCARD',
      r_image: 'https://logowik.com/content/uploads/images/787_mastercard.jpg',
    },
  ]

  return (
    <View style={[tailwind('flex-1 p-4 w-full'), { width }]}>
      <KeyboardAView>
        <View style={tailwind('flex')}>
          <PickerInput
            label="Sélectionnez un type de carte"
            value={data.r_type_carte}
            options={TYPE_CARTE}
            propsDisplay="r_name"
            propsImage="r_image"
            onOptionChange={value => onDataChange('r_type_carte', value)}
          />
          <TextInput
            value={data.r_nom_prenoms}
            onChangeText={value => onDataChange('r_nom_prenoms', value)}
            label="Nom et prénoms du titulaire"
            placeholder="Nom et prénoms du titulaire"
            autoCapitalize="characters"
          />
          <TextInput
            value={data.r_numero_carte}
            onChangeText={value => onDataChange('r_numero_carte', value)}
            label="Numéro de carte"
            placeholder="Ex: 1234 5678 8901 1234"
            keyboardType="numeric"
            max={Config.LONG_NUMERO_CARTE}
            regex={
              data?.r_type_carte?.r_code === 'VISA'
                ? Config.REG_NUMERO_CARTE_VISA
                : Config.REG_NUMERO_CARTE_MASTERCARD
            }
            errorMessage="La numéro de carte est invalide"
          />
          <TextInput
            value={data.r_numero_cvv}
            onChangeText={value => onDataChange('r_numero_cvv', value)}
            label="Numéro CVV"
            placeholder="Ex: 123"
            keyboardType="numeric"
            max={Config.LONG_NUMERO_CVV}
            regex={Config.REG_NUMERO_CVV}
            errorMessage="Le numéro CVV est invalide"
          />
          <TextInput
            value={data.r_date_limite}
            onChangeText={value => onDataChange('r_date_limite', value)}
            label="Date limite"
            placeholder="Ex: 01/24"
            max={Config.LONG_DATE_LIMIT}
            regex={Config.REG_DATE_LIMITE}
            errorMessage="La date limite est invalide"
          />
        </View>
      </KeyboardAView>
    </View>
  )
}

FormulaireCarteCredit.propTypes = {}

FormulaireCarteCredit.defaultProps = {}

export default FormulaireCarteCredit
