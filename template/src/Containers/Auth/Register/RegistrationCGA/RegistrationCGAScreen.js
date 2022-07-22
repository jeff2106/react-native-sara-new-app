import React from 'react'
import { SafeAreaView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import RegistrationCGAWizard from '@/Containers/Auth/Register/RegistrationCGA/sections/RegistrationCGAWizard'

const RegistrationExpertComptable = props => {
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Centre de gestion agrée"
        hasBack={true}
        navigation={props.navigation}
      />
      <RegistrationCGAWizard />
    </SafeAreaView>
  )
}

export default RegistrationExpertComptable
