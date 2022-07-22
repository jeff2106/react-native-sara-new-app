import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import DynamicForm from '@/Components/DynamicForm'
import { KeyboardAView } from '@/Components'

const FournisseurConfigureDetailsScreen = ({ navigation, route }) => {
  const data = route.params.data

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        navigation={navigation}
        hasBack={true}
        title="Détails de la configuration"
      />
      <KeyboardAView style={tailwind('flex-1 pl-2 pr-2')}>
        <View style={tailwind('flex-1 rounded-sm p-4')}>
          <Text
            style={[
              tailwind('text-base text-gray-900 mb-5'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {data.r_fournisseur.r_nom}
          </Text>

          <View
            style={tailwind(
              'flex flex-row items-center mb-2 p-2 bg-graySection border-b border-white rounded-md',
            )}
          >
            <Text
              style={[
                tailwind('flex-1 p-2 text-sm text-blueDark'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Paramètres
            </Text>
          </View>
          <View style={tailwind('flex p-2')}>
            <DynamicForm disabled={true} fields={data.r_champs} />
          </View>

          <View
            style={tailwind(
              'flex flex-row items-center p-2 bg-graySection rounded-t-md',
            )}
          >
            <Text
              style={[
                tailwind('flex-1 p-2 text-sm text-blueDark'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Services sélectionnés
            </Text>
          </View>

          {data.r_service.map((item, index) => (
            <View
              key={index}
              style={[
                tailwind(
                  'flex flex-row items-center p-2 pt-4 pb-4 border-gray-200 border',
                ),
                index % 2 === 0 ? tailwind('') : tailwind('bg-grayLight'),
              ]}
            >
              <Text
                style={[
                  tailwind('flex-1 text-sm mr-5'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                {item.r_libelle}
              </Text>
            </View>
          ))}
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default FournisseurConfigureDetailsScreen
