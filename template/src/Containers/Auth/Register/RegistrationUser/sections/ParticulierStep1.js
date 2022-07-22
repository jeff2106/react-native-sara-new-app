import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { DateInput, KeyboardAView, PickerInput, TextInput } from '@/Components'

const ParticulierStep1 = ({ data, onDataChange }) => {
  const { width } = useWindowDimensions()

  const onChange = (field, value) => {
    let newData = { ...data }
    newData[field] = value
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
      </KeyboardAView>
    </View>
  )
}

ParticulierStep1.propTypes = {}

ParticulierStep1.defaultProps = {}

export default ParticulierStep1
