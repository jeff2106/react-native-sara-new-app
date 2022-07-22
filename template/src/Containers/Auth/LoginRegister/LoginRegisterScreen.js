import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { tailwind } from '@/tailwind'
import { Brand, Button } from '@/Components'
import ButtonOuline from '@/Components/ButtonOutline'
import { navigate } from '@/Navigators/Root'
import { Config } from '@/Config'

const LoginRegister = () => {
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <ScrollView style={tailwind('h-full p-6 pb-12')}>
        <Brand height={100} style={tailwind('mt-2 self-center')} />
        <Text
          style={[
            tailwind('mt-4 font-bold text-2xl text-center'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          Bienvenue sur GlobalPay{' '}
          <Text style={tailwind('text-primary')}>Côte d'Ivoire</Text>
        </Text>
        <View style={tailwind('mt-4')}>
          <Text
            style={[
              tailwind('mt-4 font-medium text-base'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Vous avez déjà un compte ?
          </Text>
          <Text
            style={[
              tailwind('font-light text-gray-500 text-base'),
              { fontFamily: 'Gilroy-Light' },
            ]}
          >
            Connectez-vous pour accédez à votre espace.
          </Text>
          <Button style={tailwind('mt-5')} onPress={() => navigate('Login')}>
            Se connecter
          </Button>
        </View>
        <View style={tailwind('mt-4')}>
          <Text
            style={[
              tailwind('mt-4 font-medium text-base'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Vous n'avez pas encore de compte ?
          </Text>
          <Text
            style={[
              tailwind('font-light text-gray-500 text-base'),
              { fontFamily: 'Gilroy-Light' },
            ]}
          >
            Créez votre compte en quelques minutes pour accéder à votre espace.
          </Text>
          <ButtonOuline
            onPress={() => navigate('RegistrationInfos')}
            style={tailwind('mt-5')}
          >
            S'inscrire à GlobalPay
          </ButtonOuline>

          <Text
            style={[
              tailwind('font-bold text-gray-400 text-xs text-center mt-5'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            GlobalPay version {Config.VERSION}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginRegister
