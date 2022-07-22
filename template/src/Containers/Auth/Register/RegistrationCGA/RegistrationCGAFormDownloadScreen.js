import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigate } from '@/Navigators/Root'
import { Button } from '@/Components'
import { default as Image } from 'react-native-fast-image'
import { useTheme } from '@/Theme'
import { default as Icon } from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { downloadFile } from '@/Utils'
import { Config } from '@/Config'
import uuid from 'react-native-uuid'

const RegistrationCGAFormDownloadScreen = props => {
  const dispatch = useDispatch()
  const { Images } = useTheme()

  const initDownload = () => {
    const name = uuid.v4()
    downloadFile(Config.ENTREPRISE_PROCURATION_PDF_URL, {
      name,
      ext: 'pdf',
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Formulaire d'adhésion"
        hasBack={true}
        navigation={props.navigation}
      />
      <ScrollView style={tailwind('flex-1 p-4')}>
        <View style={[tailwind('items-center')]}>
          <Image
            source={Images.registerEntrepriseIllustration}
            style={tailwind('h-36 w-36 mt-5 mb-5')}
          />
          <Text
            style={[
              tailwind('flex-1 text-base text-center'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Téléchargez et renseignez le formulaire physique d'adhésion à la
            plateforme GLOBALPAY. Faites signer et cacheter le formulaire par le
            représentant légal de l'organisation.
          </Text>
          <TouchableOpacity
            onPress={initDownload}
            style={tailwind(
              'bg-blueGray p-4 rounded-md mt-5 items-center w-40',
            )}
          >
            <View
              style={tailwind(
                'bg-grayLight border-2 border-gray-300 rounded-full',
              )}
            >
              <Icon
                style={tailwind('m-4')}
                color={Colors.primary}
                name="file-download"
                size={46}
              />
            </View>
            <Text
              style={[
                tailwind('mt-2 text-center text-base text-gray-500'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Télécharger le formulaire
            </Text>
          </TouchableOpacity>
          <View style={tailwind('flex-row mt-10 mb-12')}>
            <Button onPress={() => navigate('RegistrationCGA')}>
              Démarrer l'inscription
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegistrationCGAFormDownloadScreen
