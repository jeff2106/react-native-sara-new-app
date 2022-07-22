import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { tailwind } from '@/tailwind'
import { NavBar } from '@/Components'
import DeclarationWizard from '@/Containers/Impot/DeclarationWizard/sections/DeclarationWizard'
import DeclarationWizardUpdate from '@/Containers/Impot/DeclarationWizard/sections/DeclarationWizardUpdate'

const DeclarationWizardScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const data = JSON.parse(route.params.data)
  const updateMode = route.params.update
  console.log(updateMode)
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        hasBack={true}
        title="Déclaration d'impot"
        navigation={navigation}
      />
      <View style={[tailwind('flex-1 w-full bg-white mt-0')]}>
        {!updateMode && (
          <DeclarationWizard
            service={data.service}
            configuration={data.configuration}
          />
        )}
        {updateMode && (
          <DeclarationWizardUpdate
            service={data.service}
            configuration={data.configuration}
            champs={data.champs}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default DeclarationWizardScreen
