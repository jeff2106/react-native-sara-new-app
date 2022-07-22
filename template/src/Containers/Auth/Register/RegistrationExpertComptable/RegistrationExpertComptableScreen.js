import React from 'react'
import { SafeAreaView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import RegistrationExpertComptableWizard from '@/Containers/Auth/Register/RegistrationExpertComptable/sections/RegistrationExpertComptableWizard'

const RegistrationExpertComptable = props => {
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Enregistrement expert comptable"
        hasBack={true}
        navigation={props.navigation}
      />
      <RegistrationExpertComptableWizard />
    </SafeAreaView>
  )
}

export default RegistrationExpertComptable
