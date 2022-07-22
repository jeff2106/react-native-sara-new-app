import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import {
  NavBar,
  KeyboardAView,
  Button,
  TextInput,
  ButtonText,
} from '@/Components'

const ImpotDemandeNTDScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const [nomPrenom, setNomPrenom] = useState('')
  const [ncc, setNcc] = useState('')
  const [adresse, setAdresse] = useState('')

  const goToSetupWizard = () => {
    navigation.navigate('ImpotSetupWizard')
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar hasBack={true} title="Demande de NTD" navigation={navigation} />
      <View style={tailwind('flex-1 p-4 bg-white')}>
        <KeyboardAView>
          <TextInput
            value={nomPrenom}
            onChangeText={setNomPrenom}
            label="Etat civil complet"
            placeholder="Etat civil complet"
            autoCapitalize="words"
          />
          <TextInput
            value={ncc}
            onChangeText={value => setNcc(value.toUpperCase())}
            label="Numéro de compte contribuable"
            placeholder="Numéro de compte contribuable"
            autoCapitalize="characters"
          />
          <TextInput
            value={adresse}
            onChangeText={setAdresse}
            label="Adresse"
            placeholder="Adresse"
            autoCapitalize="characters"
          />

          <View style={tailwind('flex flex-row justify-between mt-5 mb-14')}>
            <ButtonText
              onPress={() => navigation.goBack()}
              iconLeft="chevron-left"
              style={tailwind('flex-1')}
            >
              Retour
            </ButtonText>
            <View style={tailwind('p-2')} />
            <Button>Soumettre</Button>
          </View>

          <Text
            style={[
              tailwind('text-sm mb-2 text-center'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Vous avez déjà un numéro de télédéclarant (NTD) ?
          </Text>

          <ButtonText onPress={navigation.goBack}>
            Passer à la configuration
          </ButtonText>
        </KeyboardAView>
      </View>
    </SafeAreaView>
  )
}

export default ImpotDemandeNTDScreen
