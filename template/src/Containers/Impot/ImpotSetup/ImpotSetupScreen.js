import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { NavBar, KeyboardAView, Button, ButtonText } from '@/Components'
import { default as Image } from 'react-native-fast-image'
import { navigate } from '@/Navigators/Root'

const ImpotSetupScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { data } = route.params || {}

  const goToSetupWizard = () => {
    navigation.navigate('ImpotSetupWizard', { data: { ...data } })
  }

  const goToDemandeNTD = () => {
    navigate('ImpotDemandeNTD', { data: { ...data } })
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        hasBack={true}
        title="Configuration du service"
        navigation={navigation}
      />
      <KeyboardAView>
        <View style={tailwind('flex-1 p-4')}>
          <View
            style={[
              tailwind('w-full flex-row p-4 rounded-md bg-blueGray mb-5'),
              { elevation: 1 },
            ]}
          >
            <View
              style={tailwind(
                'h-16 w-16 rounded-md border-2 border-gray-200 items-center justify-center',
              )}
            >
              <Image
                source={{ uri: data.r_image_url }}
                style={tailwind('h-14 w-14')}
                resizeMode="contain"
              />
            </View>
            <View style={tailwind('m-1 flex-1')}>
              <Text
                style={[
                  tailwind('font-bold text-gray-900 text-base'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                {data.r_nom}
              </Text>
            </View>
          </View>
          <View style={[tailwind('w-full p-4 rounded-md bg-blueGray mt-0')]}>
            <Text
              style={[tailwind('text-xl mb-5'), { fontFamily: 'Gilroy-Bold' }]}
            >
              Bienvenue !
            </Text>

            <Text
              style={[
                tailwind('text-sm mb-2'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Nous allons procéder à la configuration du service des impôts.
            </Text>

            <Text
              style={[tailwind('text-sm'), { fontFamily: 'Gilroy-Regular' }]}
            >
              La configuration se fera en deux étapes.
            </Text>

            <View style={tailwind('flex-row mt-2')}>
              <Text
                style={[
                  tailwind('font-bold text-2xl'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                1.
              </Text>
              <Text
                style={[
                  tailwind('flex-1 ml-2 text-sm'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                Munissez-vous des informations suivantes : {'\n'}
                <Text
                  style={[tailwind('text-sm'), { fontFamily: 'Gilroy-Bold' }]}
                >
                  - Votre numéro de compte contribuable (NCC); {'\n'}
                </Text>
                <Text
                  style={[tailwind('text-sm'), { fontFamily: 'Gilroy-Bold' }]}
                >
                  - Votre numéro de télédéclarant (NTD) {'\n'}
                </Text>
              </Text>
            </View>

            <View style={tailwind('flex-row mt-2')}>
              <Text
                style={[
                  tailwind('font-bold text-2xl'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                2.
              </Text>
              <Text
                style={[
                  tailwind('flex-1 ml-2 text-sm'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                Sélectionnez les impôts à déclarer au service des impôts.
              </Text>
            </View>

            <Button onPress={goToSetupWizard} style={tailwind('mt-10 mb-10')}>
              Démarrer la configuration
            </Button>

            <Text
              style={[
                tailwind('text-sm mb-2 text-center'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Vous n'avez pas de numéro de télédéclarant (NTD) ?
            </Text>

            <ButtonText onPress={goToDemandeNTD}>
              Faire une demande de NTD
            </ButtonText>
          </View>
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default ImpotSetupScreen
