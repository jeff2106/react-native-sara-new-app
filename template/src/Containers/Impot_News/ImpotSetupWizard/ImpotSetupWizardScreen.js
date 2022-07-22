import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { NavBar } from '@/Components'
import ImpotWizard from '@/Containers/Impot/sections/ImpotWizard'

const ImpotSetupWizardScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { data } = route.params || {}

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        hasBack={true}
        title="Configuration du service"
        navigation={navigation}
      />
      <View style={[tailwind('flex-1 w-full bg-white mt-0')]}>
        <ImpotWizard data={data} />
      </View>
    </SafeAreaView>
  )
}

export default ImpotSetupWizardScreen
