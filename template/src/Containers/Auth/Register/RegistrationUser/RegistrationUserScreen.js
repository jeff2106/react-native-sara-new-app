import React from 'react'
import { SafeAreaView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import RegistrationParticulierWizard from '@/Containers/Auth/Register/RegistrationUser/sections/RegistrationParticulierWizard'

const RegistrationUser = props => {
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Enregistrement particulier"
        hasBack={true}
        navigation={props.navigation}
      />
      <RegistrationParticulierWizard />
    </SafeAreaView>
  )
}

export default RegistrationUser
