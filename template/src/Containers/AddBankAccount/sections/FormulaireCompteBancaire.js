import React, { useEffect, useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'
import { KeyboardAView, PickerInput, TextInput } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@/Theme'
import { Config } from '@/Config'

const FormulaireCompteBancaire = ({
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

  const PAYS = [
    {
      id: 1,
      r_name: "Côte d'Ivoire",
      r_image: Images.CI,
    },
    {
      id: 2,
      r_name: 'Burkina',
      r_image: Images.BF,
    },
    {
      id: 3,
      r_name: 'Mali',
      r_image: Images.ML,
    },
  ]

  const BANQUE = [
    {
      id: 1,
      r_name: "Société Générale de Banque de Côte d'Ivoire",
      r_code_bank: 'CI124',
      r_image:
        'https://trouver1travail.com/wp-content/uploads/2018/04/SGBCI.jpg',
    },
    {
      id: 2,
      r_name: "Banque Nationnale d'Investissement",
      r_code_bank: 'CI122',
      r_image:
        'https://investmentguide.africa/sites/default/files/media/images/IWegPUxsQv2CFbtEXXrX.png',
    },
    {
      id: 3,
      r_name: 'ECOBANK',
      r_code_bank: 'CI130',
      r_image:
        'https://pbs.twimg.com/profile_images/1678894738/Ecobank_Logo_400x400.jpg',
    },
  ]

  return (
    <View style={[tailwind('flex-1 p-4 w-full'), { width }]}>
      <KeyboardAView>
        <View style={tailwind('flex')}>
          <PickerInput
            label="Sélectionnez un pays"
            value={data.r_pays}
            options={PAYS}
            propsDisplay="r_name"
            propsImage="r_image"
            onOptionChange={value => onDataChange('r_pays', value)}
          />
          <PickerInput
            label="Sélectionnez une banque"
            value={data.r_banque}
            options={BANQUE}
            propsDisplay="r_name"
            propsImage="r_image"
            onOptionChange={value =>
              onMultipleDataChange({
                r_banque: value,
                r_code_banque: value.r_code_bank,
              })
            }
          />
          <TextInput
            value={data.r_intitule}
            onChangeText={value => onDataChange('r_intitule', value)}
            label="Intitulé ou alias du compte"
            placeholder="Intitulé ou alias du compte"
            autoCapitalize="characters"
          />
          <TextInput
            value={data.r_code_banque}
            onChangeText={value => onDataChange('r_code_banque', value)}
            label="Code banque"
            placeholder="Ex: CI123"
            autoCapitalize="characters"
            max={Config.LONG_CODE_BANQUE}
            regex={Config.REG_CODE_BANK}
            errorMessage="Le code banque est invalide"
          />
          <TextInput
            value={data.r_code_agence}
            onChangeText={value => onDataChange('r_code_agence', value)}
            label="Code agence"
            placeholder="Ex: 12345"
            keyboardType="numeric"
            max={Config.LONG_CODE_AGENCE}
            regex={Config.REG_CODE_AGENCE}
            errorMessage="Le code agence est invalide"
          />
          <TextInput
            value={data.r_numero_compte}
            onChangeText={value => onDataChange('r_numero_compte', value)}
            label="Numéro de compte à débiter"
            placeholder="Ex: 123456789012"
            keyboardType="numeric"
            max={Config.LONG_NUMERO_COMPTE}
            regex={Config.REG_NUMERO_COMPTE}
            errorMessage="Le numéro de compte est invalide"
          />
          <TextInput
            value={data.r_cle_rib}
            onChangeText={value => onDataChange('r_cle_rib', value)}
            label="Clé RIB"
            placeholder="Ex: 12"
            keyboardType="numeric"
            max={Config.LONG_CLE_RIB}
            regex={Config.REG_CLE_RIB}
            errorMessage="La clé RIB est invalide"
          />
        </View>
      </KeyboardAView>
    </View>
  )
}

FormulaireCompteBancaire.propTypes = {}

FormulaireCompteBancaire.defaultProps = {}

export default FormulaireCompteBancaire
