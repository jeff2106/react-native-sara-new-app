import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SafeAreaView, View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigateAndSimpleReset } from '@/Navigators/Root'
import { useTheme } from '@/Theme'
import { default as Image } from 'react-native-fast-image'
import { Button } from '@/Components'
import KeyboardAView from '@/Components/KeyboardAView'
import ClearUser from '@/Store/Auth/ClearUser'

const SessionExpireScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { Images } = useTheme()

  useEffect(() => {
    dispatch(ClearUser.action())
  }, [])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title=""
        navigation={navigation}
        hasBack={false}
        hasDrawer={false}
      />
      <KeyboardAView>
        <View style={tailwind('flex-1 p-4')}>
          <View
            style={[
              tailwind('w-full p-4 rounded-md bg-white'),
              { elevation: 1 },
            ]}
          >
            <View style={tailwind('items-center justify-center mt-5')}>
              <Image
                style={tailwind('w-32 h-32')}
                source={Images.session_expire}
                resizeMode="contain"
              />
              <Text
                style={[
                  tailwind(
                    'font-light text-gray-500 text-base mb-12 mt-12 text-center',
                  ),
                  { fontFamily: 'Gilroy-SemiBold' },
                ]}
              >
                Votre session a expiré, veuillez vous réconnecter.
              </Text>
              <View style={tailwind('mt-5 mb-5 flex-row')}>
                <Button onPress={() => navigateAndSimpleReset('Auth')}>
                  Se connecter
                </Button>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default SessionExpireScreen
