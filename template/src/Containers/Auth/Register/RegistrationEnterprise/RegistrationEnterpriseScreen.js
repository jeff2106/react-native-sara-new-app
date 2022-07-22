import React from 'react'
import { SafeAreaView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import RegistrationEntrepriseWizard from '@/Containers/Auth/Register/RegistrationEnterprise/sections/RegistrationEntrepriseWizard'

const RegistrationEnterprise = props => {
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Enregistrement entreprise"
        hasBack={true}
        navigation={props.navigation}
      />
      <RegistrationEntrepriseWizard />
    </SafeAreaView>
  )
}

export default RegistrationEnterprise
