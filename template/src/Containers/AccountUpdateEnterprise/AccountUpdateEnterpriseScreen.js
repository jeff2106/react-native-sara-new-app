import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import TextInput from '@/Components/TextInput'
import { Button, PhoneInput } from '@/Components'
import KeyboardAView from '@/Components/KeyboardAView'

const AccountUpdateEntreprise = ({ navigation }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)

  const { r_nom_acteur, r_email_acteur, r_contact_acteur } =
    user._description || {}

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <NavBar
        title="Modification des informations"
        hasBack={true}
        navigation={navigation}
      />
      <KeyboardAView>
        <View style={tailwind('flex-1 p-6')}>
          <TextInput
            label="Nom de l'entreprise"
            value={r_nom_acteur}
            onChangeText={() => {}}
            placeholder="Nom de l'entreprise"
            returnKeyType="next"
          />
          <TextInput
            value={r_email_acteur}
            onChangeText={() => {}}
            label="Email de l'entreprise"
            placeholder="Email de l'entreprise"
            returnKeyType="next"
          />
          <PhoneInput
            value={r_contact_acteur}
            onChangeText={() => {}}
            label="Contact de l'entreprise"
            placeholder="Contact de l'entreprise"
            returnKeyType="done"
          />
          <Button onPress={() => navigation.goBack()}>Sauvegarder</Button>
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default AccountUpdateEntreprise
