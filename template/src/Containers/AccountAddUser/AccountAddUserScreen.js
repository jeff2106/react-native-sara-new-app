import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import TextInput from '@/Components/TextInput'
import { Button, PhoneInput, SelectInput } from '@/Components'
import KeyboardAView from '@/Components/KeyboardAView'
import FetchRole from '@/Store/Role/FetchRole'

const AccountAddUser = ({ navigation }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const fetchRoleResponse = useSelector(state => state.role.item)
  const fetchRoleLoading = useSelector(state => state.role.fetchRole.loading)
  const fetchRoleError = useSelector(state => state.role.fetchRole.error)

  const [role, setRole] = useState()
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    dispatch(FetchRole.action({ acteurId: user._description.r_acteur }))
  }, [])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Ajouter un utilisateur"
        hasBack={true}
        navigation={navigation}
      />
      <KeyboardAView>
        <View style={tailwind('flex-1 p-6')}>
          <SelectInput
            onChange={setRole}
            value={role}
            label="Rôle"
            placeholder="Sélectionnez un rôle"
            valueKey="r_libelle"
            data={fetchRoleResponse}
          />
          <TextInput
            value={nom}
            onChangeText={setNom}
            label="Nom"
            placeholder="Nom"
            returnKeyType="next"
          />
          <TextInput
            value={prenom}
            onChangeText={setPrenom}
            label="Prénoms"
            placeholder="Prénoms"
            returnKeyType="next"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            label="Adresse e-mail"
            placeholder="Adresse e-mail"
            keyboardType="email-address"
            type="email"
            returnKeyType="next"
          />
          <PhoneInput
            onChangeText={setPhone}
            onCountryChange={() => {}}
            value={phone}
            label="Numéro de téléphone"
            placeholder="Numéro de téléphone"
            returnKeyType="next"
          />
          <Button onPress={() => navigation.goBack()}>Sauvegarder</Button>
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default AccountAddUser
