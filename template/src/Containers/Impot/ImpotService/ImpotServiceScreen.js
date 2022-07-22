import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text, Dimensions } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { default as Image } from 'react-native-fast-image'
import { navigateAndSimpleReset } from '@/Navigators/Root'
import { Config } from '@/Config'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Colors } from '@/Theme/Variables'
import ConfigurationsScreen from '@/Containers/Impot/ImpotService/sections/ConfigurationsScreen'
import TeledeclarationsScreen from '@/Containers/Impot/ImpotService/sections/TeledeclarationsScreen'

const ImpotServiceScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const fournisseursConfigures = useSelector(
    state => state.auth.fournisseursConfigures,
  )

  const [configuration, setConfiguration] = useState()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    {
      key: 'teledeclaration',
      title: 'Télédéclarations',
    },
    {
      key: 'configurations',
      title: 'Configurations',
    },
  ])

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

  const initialLayout = {
    width: Dimensions.get('window').width,
  }

  const renderScene = SceneMap({
    teledeclaration: props => (
      <TeledeclarationsScreen
        {...props}
        navigation={navigation}
        configuration={configuration}
      />
    ),
    configurations: props => (
      <ConfigurationsScreen
        {...props}
        navigation={navigation}
        configuration={configuration}
      />
    ),
  })

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.primary, height: 3 }}
      style={{ backgroundColor: Colors.blueGray }}
      inactiveColor={Colors.gray_900}
      activeColor={Colors.primary}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={[
            tailwind('font-bold text-base'),
            { fontFamily: 'Gilroy-Bold', color },
          ]}
        >
          {route.title}
        </Text>
      )}
    />
  )

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar hasBack={true} title={''} navigation={navigation} />
      <View style={tailwind('flex-1')}>
        <View
          style={[
            tailwind('w-full flex-row pl-4 pr-4 pb-4 items-center'),
            { elevation: 1 },
          ]}
        >
          <View style={tailwind('h-16 w-16 items-center justify-center')}>
            <Image
              source={{ uri: configuration?.r_fournisseur?.r_image_url }}
              style={tailwind('h-16 w-16')}
              resizeMode="contain"
            />
          </View>
          <View style={tailwind('ml-2 flex-1')}>
            <Text
              style={[
                tailwind('font-bold text-gray-900 text-base'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              {configuration?.r_fournisseur?.r_nom}
            </Text>
          </View>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          swipeEnabled={false}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  )
}

export default ImpotServiceScreen
