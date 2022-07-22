import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { KeyboardAView, PhoneInput, TextInput } from '@/Components'

const ExpertComptableStep2 = ({ data, onDataChange }) => {
  const { width } = useWindowDimensions()

  const [error, setError] = useState('')

  const onChange = (field, value) => {
    let newData = { ...data }
    newData[field] = value
    onDataChange(newData)
  }

  return (
    <View style={[tailwind('flex-1 p-4 w-full'), { width }]}>
      <KeyboardAView>
        <TextInput
          label="Numéro de compte"
          placeholder="Entrez votre numéro de compte"
          value={data.p_numero_compte}
          onChangeText={value => onChange('p_numero_compte', value)}
        />
        <TextInput
          label="Raison sociale"
          placeholder="Entrez la raison sociale"
          value={data.p_raison_sociale}
          onChangeText={value => onChange('p_raison_sociale', value)}
        />
        <TextInput
          label="Localisation du cabinet"
          placeholder="Entrez l'adresse du cabinet"
          value={data.p_localisation}
          onChangeText={value => onChange('p_localisation', value)}
        />
        <Text style={[tailwind('text-xs font-medium mt-1 text-red-600')]}>
          {error}
        </Text>
      </KeyboardAView>
    </View>
  )
}

ExpertComptableStep2.propTypes = {}

ExpertComptableStep2.defaultProps = {}

export default ExpertComptableStep2
