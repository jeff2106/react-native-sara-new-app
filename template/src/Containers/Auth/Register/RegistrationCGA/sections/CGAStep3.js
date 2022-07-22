import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { KeyboardAView, TextInput } from '@/Components'

const CGAStep3 = ({ data, onDataChange }) => {
  const { width } = useWindowDimensions()

  const [error, setError] = useState('')

  const onChange = (field, value) => {
    let newData = { ...data }
    newData[field] = value
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
          secureTextEntry={true}
          label="Mot de passe"
          placeholder="Entrez votre mot de passe"
          value={data.p_password}
          onChangeText={value => onChange('p_password', value)}
        />
        <TextInput
          secureTextEntry={true}
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

CGAStep3.propTypes = {}

CGAStep3.defaultProps = {}

export default CGAStep3
