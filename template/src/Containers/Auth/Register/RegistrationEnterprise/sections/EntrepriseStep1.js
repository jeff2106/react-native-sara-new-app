import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import {
  DocumentSelect,
  KeyboardAView,
  PhoneInput,
  TextInput,
} from '@/Components'

const EntrepriseStep1 = ({ data, onDataChange }) => {
  const { width } = useWindowDimensions()

  const [error, setError] = useState('')

  const onChange = (field, value) => {
    let newData = { ...data }
    newData[field] = value
    onDataChange(newData)
  }

  const onCountryChange = value => {
    let newData = { ...data, ...value }
    onDataChange(newData)
  }

  return (
    <View style={[tailwind('flex-1 p-4 w-full'), { width }]}>
      <KeyboardAView>
        <TextInput
          type="email"
          label="Email de l'entreprise"
          placeholder="Entrez l'email de l'entreprise"
          value={data.p_email_acteur}
          onChangeText={value => onChange('p_email_acteur', value)}
        />
        <PhoneInput
          defaultCountryCode="CI"
          label="Numéro de téléphone entreprise"
          value={data.p_contact_acteur}
          onCountryChange={selectedCountry => {
            let contact = {}
            contact.p_indicatif_pays_acteur =
              selectedCountry?.indicatif?.slice(1)
            contact.p_code_pays_acteur = selectedCountry?.code
            if (contact.p_code_pays_acteur && contact.p_indicatif_pays_acteur) {
              onCountryChange(contact)
            }
          }}
          onChangeText={value => onChange('p_contact_acteur', value)}
        />
        <TextInput
          label="Raison sociale"
          placeholder="Entrez la raison sociale"
          value={data.p_raison_social}
          onChangeText={value => onChange('p_raison_social', value)}
        />
        <TextInput
          label="Localisation de l'entreprise"
          placeholder="Entrez l'adresse du centre de gestion"
          value={data.p_localisation}
          onChangeText={value => onChange('p_localisation', value)}
        />
        <DocumentSelect
          label="Formulaire d'adhésion"
          placeholder="Joindre le formulaire d'adhésion"
          selectedFile={data.file}
          onFileSelect={value => onChange('file', value)}
        />
        <Text style={[tailwind('text-xs font-medium mt-1 text-red-600')]}>
          {error}
        </Text>
      </KeyboardAView>
    </View>
  )
}

EntrepriseStep1.propTypes = {}

EntrepriseStep1.defaultProps = {}

export default EntrepriseStep1
