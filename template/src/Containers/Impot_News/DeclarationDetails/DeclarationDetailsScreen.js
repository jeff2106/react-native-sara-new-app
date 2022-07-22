import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { tailwind } from '@/tailwind'
import { NavBar } from '@/Components'
import DetailsItem from '@/Containers/Impot_News/DeclarationDetails/sections/DetailsItem'
import { navigate } from '@/Navigators/Root'

const DeclarationDetailsScreenNews = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const data = JSON.parse(route.params.data)

  const goToDeclarationWizard = () => {
    navigate('DeclarationWizard', {
      data: JSON.stringify({
        service: data.service,
        configuration: data.configuration,
        champs: data.fields,
      }),
      update: false,
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        hasBack={true}
        title="Détails de la déclarations"
        navigation={navigation}
      />
      <View style={[tailwind('flex-1 w-full bg-white mt-0')]}>
        <DetailsItem
          onPress={goToDeclarationWizard}
          configuration={data.configuration}
          service={data.service}
          fields={data.fields}
        />
      </View>
    </SafeAreaView>
  )
}

export default DeclarationDetailsScreenNews
