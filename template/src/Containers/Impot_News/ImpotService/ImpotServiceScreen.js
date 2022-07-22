import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text, Dimensions, ScrollView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { default as Image } from 'react-native-fast-image'
import { navigate, navigateAndSimpleReset } from '@/Navigators/Root'
import { Config } from '@/Config'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Colors } from '@/Theme/Variables'
import ConfigurationsScreenNews from '@/Containers/Impot_News/ImpotService/sections/ConfigurationsScreen'
import TeledeclarationsScreen from '@/Containers/Impot/ImpotService/sections/TeledeclarationsScreen'
import SelectionImpotUpdate from '@/Containers/Impot_News/ImpotService/sections/ConfigurationScreenNewFace'
import DynamicForm from '@/Components/DynamicForm'
import { Button } from '@/Components'

const ImpotServiceScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const fournisseursConfigures = useSelector(
    state => state.auth.fournisseursConfigures,
  )
  console.log(JSON.stringify(fournisseursConfigures))
  const goToUpdateConfigurationScreen = () => {
    navigate('ImpotUpdateConfigScreenNews', {
      data: JSON.stringify(configuration),
    })
  }

  const [configuration, setConfiguration] = useState()

  const findConfig = () => {
    const foundIndex = fournisseursConfigures.find(
      item => item.r_fournisseur.r_reference === Config.CODE_IMPOT,
    )
    setConfiguration(foundIndex)
  }

  useEffect(() => {
    if (!configuration) {
      findConfig()
    }
  }, [configuration])
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar hasBack={true} title={''} navigation={navigation} />
      <ScrollView style={tailwind('flex-1 p-6')}>
        {/*
        <ConfigurationsScreenNews
          navigation={navigation}
          configuration={configuration}
        />
        */}
        <DynamicForm disabled={true} fields={configuration?.r_champs} />
        {typeof configuration?.r_fournisseur !== 'undefined' && (
          <SelectionImpotUpdate
            fournisseur={configuration?.r_fournisseur}
            fournisseurValue={configuration?.r_service}
            value={configuration?.r_service}
            isVisible={false}
            navigation={navigation}
          />
        )}

        <Text />
        <View style={tailwind('p-2 pl-4 pr-4 mb-5')}>
          <Button onPress={goToUpdateConfigurationScreen}>
            Modifier la configuration
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ImpotServiceScreen
