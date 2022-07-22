import React, { useRef, useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigate, navigateAndSimpleReset } from '@/Navigators/Root'
import { useTheme } from '@/Theme'
import { default as Image } from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import { Button } from '@/Components'
import KeyboardAView from '@/Components/KeyboardAView'

const PaymentDone = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { Images } = useTheme()

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <NavBar title="" navigation={navigation} />
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
                source={Images.done}
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
                Votre paiement a été enregistré avec succès.
              </Text>
              <View style={tailwind('mt-5 mb-5 flex-row')}>
                <Button onPress={() => navigateAndSimpleReset('Tab')}>
                  Terminer
                </Button>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default PaymentDone
