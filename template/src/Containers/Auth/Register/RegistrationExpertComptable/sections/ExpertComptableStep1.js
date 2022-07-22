import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import {
  DateInput,
  KeyboardAView,
  PhoneInput,
  PickerInput,
  TextInput,
} from '@/Components'

const ExpertComptableStep1 = ({ data, onDataChange }) => {
  const { width } = useWindowDimensions()

  const onChange = (field, value) => {
    let newData = { ...data }
    newData[field] = value
    onDataChange(newData)
  }

  const onCountryChange = value => {
    let newData = { ...data, ...value }
    onDataChange(newData)
  }

  const civiliteData = [
    {
      label: 'Monsieur',
      value: 1,
    },
    {
      label: 'Madame',
      value: 2,
    },
    {
      label: 'Mademoiselle',
      value: 3,
    },
  ]

  return (
    <View style={[tailwind('flex-1 p-4 w-full'), { width }]}>
      <KeyboardAView>
        <PickerInput
          label="Civilité"
          placeholder="Civilité"
          value={data.p_civilite}
          options={civiliteData}
          onOptionChange={value => onChange('p_civilite', value.value)}
        />
        <TextInput
          label="Nom"
          placeholder="Entrez votre nom"
          value={data.p_nom}
          onChangeText={value => onChange('p_nom', value)}
        />
        <TextInput
          label="Prénoms"
          placeholder="Entrez vos prénoms"
          value={data.p_prenom}
          onChangeText={value => onChange('p_prenom', value)}
        />
        <DateInput
          label="Date de naissance"
          placeholder="Date de naissance"
          value={data.p_date_naissance ? data.p_date_naissance : new Date()}
          onChange={value => onChange('p_date_naissance', value)}
          maximumDate={new Date()}
        />
        {new Date().getFullYear() -
          new Date(data?.p_date_naissance).getFullYear() <
          21 && (
          <Text
            style={[tailwind('pl-1 text-xs font-medium mb-2 text-red-600')]}
          >
            L'age minimum requis est de 21 ans.
          </Text>
        )}
        {!data?.p_date_naissance && (
          <Text
            style={[tailwind('pl-1 text-xs font-medium mb-2 text-red-600')]}
          >
            L'age minimum requis est de 21 ans.
          </Text>
        )}
        <TextInput
          type="email"
          label="Email"
          placeholder="Entrez votre adresse email"
          value={data.p_email}
          onChangeText={value => onChange('p_email', value)}
        />
        <PhoneInput
          label="Numéro de téléphone"
          value={data.p_contact}
          defaultCountryCode="CI"
          onCountryChange={selectedCountry => {
            let newValue = {}
            newValue.p_indicatif_pays = selectedCountry?.indicatif?.slice(1)
            newValue.p_code_pays = selectedCountry?.code
            onCountryChange(newValue)
          }}
          onChangeText={value => onChange('p_contact', value)}
        />
      </KeyboardAView>
    </View>
  )
}

ExpertComptableStep1.propTypes = {}

ExpertComptableStep1.defaultProps = {}

export default ExpertComptableStep1
