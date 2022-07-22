import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { KeyboardAView, PhoneInput, TextInput } from '@/Components'

const ParticulierStep2 = ({ data, onDataChange }) => {
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

  useEffect(() => {
    if (data.p_password && data.p_password_confirm) {
      data.p_password?.length > 0 &&
      data.p_password_confirm?.length > 0 &&
      data.p_password?.localeCompare(data.p_password_confirm) === 0
        ? setError('')
        : setError('Les mots de passe ne corespondent pas')
    } else {
      setError('')
    }
  }, [data.p_password, data.p_password_confirm])

  return (
    <View style={[tailwind('flex-1 p-4 w-full'), { width }]}>
      <KeyboardAView>
        <TextInput
          type="email"
          label="Email"
          placeholder="Entrez votre adresse email"
          value={data.p_email}
          onChangeText={value => onChange('p_email', value)}
        />
        <PhoneInput
          label="Numéro de téléphone"
          defaultCountryCode="CI"
          value={data.p_contact}
          onCountryChange={selectedCountry => {
            let newValue = {}
            newValue.p_indicatif_pays = selectedCountry?.indicatif?.slice(1)
            newValue.p_code_pays = selectedCountry?.code
            onCountryChange(newValue)
          }}
          onChangeText={value => onChange('p_contact', value)}
        />
        <TextInput
          type="password"
          label="Mot de passe"
          placeholder="Entrez votre mot de passe"
          value={data.p_password}
          onChangeText={value => onChange('p_password', value)}
        />
        <TextInput
          type="password"
          label="Confirmation du mot de passe"
          placeholder="Confirmez votre mot de passe"
          value={data.p_password_confirm}
          onChangeText={value => onChange('p_password_confirm', value)}
        />
        <Text style={[tailwind('text-xs font-medium mt-1 text-red-600')]}>
          {error}
        </Text>
      </KeyboardAView>
    </View>
  )
}

ParticulierStep2.propTypes = {}

ParticulierStep2.defaultProps = {}

export default ParticulierStep2
