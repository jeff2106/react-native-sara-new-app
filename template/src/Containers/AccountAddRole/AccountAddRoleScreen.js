import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import TextInput from '@/Components/TextInput'
import { Button } from '@/Components'
import { navigate } from '@/Navigators/Root'
import KeyboardAView from '@/Components/KeyboardAView'

const AccountAddRole = ({ navigation }) => {
  const dispatch = useDispatch()

  const [code, setCode] = useState('')
  const [libelle, setLibelle] = useState('')

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar title="Ajouter un rôle" hasBack={true} navigation={navigation} />
      <KeyboardAView>
        <View style={tailwind('flex-1 p-6')}>
          <TextInput
            label="Code"
            placeholder="Code"
            returnKeyType="next"
            value={code}
            onChangeText={setCode}
          />
          <TextInput
            label="Libellé"
            placeholder="Libellé"
            returnKeyType="next"
            value={libelle}
            onChangeText={setLibelle}
          />

          <Button
            style={tailwind('mt-5')}
            onPress={() =>
              navigate('AccountUpdateRole', { role: { code, libelle } })
            }
          >
            Sauvegarder
          </Button>
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default AccountAddRole
