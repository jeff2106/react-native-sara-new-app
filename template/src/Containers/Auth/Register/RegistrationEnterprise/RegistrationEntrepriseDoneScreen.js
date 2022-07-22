import React from 'react'
import { useDispatch } from 'react-redux'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigateAndSimpleReset } from '@/Navigators/Root'
import { Button } from '@/Components'
import { default as Image } from 'react-native-fast-image'
import { useTheme } from '@/Theme'
import { default as Icon } from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'

const RegistrationEntrepriseFormDownloadScreen = props => {
  const dispatch = useDispatch()
  const { Images } = useTheme()

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar title="" hasBack={false} navigation={props.navigation} />
      <ScrollView style={tailwind('flex-1 p-4')}>
        <View style={[tailwind('items-center mt-12')]}>
          <Icon
            size={150}
            color={Colors.primary}
            name="checkbox-marked-circle-outline"
          />
          <Text
            style={[
              tailwind('text-3xl text-center mt-5'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Félicitation !
          </Text>
          <Text
            style={[
              tailwind('flex-1 text-base text-center mt-5'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Vous avez réussi la première étape de votre inscription. Vous
            recevrez un mail pour la création de votre mot de passe.
          </Text>
          <View style={tailwind('flex-row mt-10 mb-12')}>
            <Button onPress={() => navigateAndSimpleReset('LoginRegister')}>
              Terminer
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegistrationEntrepriseFormDownloadScreen
