import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigate } from '@/Navigators/Root'
import { Button } from '@/Components'

const RegistrationInfos = props => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Les étapes de votre inscription"
        hasBack={true}
        navigation={props.navigation}
      />
      <ScrollView style={tailwind('flex-1 p-4')}>
        <View
          style={[
            tailwind('bg-blueGray p-5 rounded-md'),
            {
              shadowColor: '#F4F6FB',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 0.5,

              elevation: 1,
            },
          ]}
        >
          <View style={tailwind('flex-row mb-3')}>
            <Text
              style={[
                tailwind('font-bold text-3xl'),
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
              Vous sélectionnez d'abord le type de compte à créer. Vous aurez le
              choix entre trois types de compte, particulier, pour les personnes
              physiques et administration ou entreprise s'il s'agit
              respectivement d'une structure adminstrative ou d'une entreprise.
            </Text>
          </View>
          <View style={tailwind('flex-row mb-3')}>
            <Text
              style={[
                tailwind('font-bold text-3xl'),
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
              Vous devrez renseigner les informations d'identification de
              l'entreprise ou de l'administration publique.
            </Text>
          </View>
          <View style={tailwind('flex-row mb-3')}>
            <Text
              style={[
                tailwind('font-bold text-3xl'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              3.
            </Text>
            <Text
              style={[
                tailwind('flex-1 ml-2 text-sm'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Vous devrez ensuite renseigner les informations d'identité de
              l'utilisateur principal qui sera responsable du compte en ligne et
              aura le rôle d'adminstrateur.
            </Text>
          </View>
          <View style={tailwind('flex-row mb-12')}>
            <Text
              style={[
                tailwind('font-bold text-3xl'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              4.
            </Text>
            <Text
              style={[
                tailwind('flex-1 ml-2 text-sm'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              La dernière étape consistera à vérifier vos informations à l'aide
              d'un code OTP envoyé sur votre messagerie electronique et votre
              numéro de téléphone.
            </Text>
          </View>

          <Button onPress={() => navigate('RegistrationType')}>
            Commencer
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegistrationInfos
