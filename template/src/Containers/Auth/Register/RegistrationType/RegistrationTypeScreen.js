import React from 'react'
import { useDispatch } from 'react-redux'
import { SafeAreaView, Text, ScrollView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import AccountTypeItem from '@/Containers/Auth/Register/RegistrationType/sections/AccountTypeItem'
import { navigate } from '@/Navigators/Root'

const RegistrationType = props => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Type de compte"
        hasBack={true}
        navigation={props.navigation}
      />
      <ScrollView style={tailwind('flex-1 p-6')}>
        <Text
          style={[
            tailwind('mt-2 font-light text-black text-lg mb-5'),
            { fontFamily: 'Gilroy-Regular' },
          ]}
        >
          Sélectionnez le type de compte à créer pour commencer votre
          inscription.
        </Text>
        <AccountTypeItem
          title="Particulier"
          subTitle="Compte individuel ou particulier."
          onPress={() => navigate('RegistrationUser')}
        />
        <AccountTypeItem
          title="Compagnie"
          subTitle="Compte organisation ou personne morale."
          onPress={() => navigate('RegistrationEntrepriseFormDownload')}
        />
        <AccountTypeItem
          title="Expert comptable"
          subTitle="Compte expert comptable."
          onPress={() => navigate('RegistrationExpertComptableFormDownload')}
        />
        <AccountTypeItem
          title="Centre de gestion Agrée"
          subTitle="Compte centre de gestion agrée."
          onPress={() => navigate('RegistrationCGAFormDownload')}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegistrationType
