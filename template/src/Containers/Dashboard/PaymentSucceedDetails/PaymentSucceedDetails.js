import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { default as FlatList } from '@/Components/FlatList'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { MaskedText } from 'react-native-mask-text'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import { replace, navigateAndSimpleReset } from '@/Navigators/Root'

const PaymentSucceedDetails = ({ navigation, route }) => {
  const { data } = route.params

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <ScrollView>
        <NavBar
          navigation={navigation}
          hasBack={true}
          title="Paiements effectués"
        />
        <View style={tailwind('flex-1 mt-3 ml-4 mr-4')}>
          <View style={tailwind('bg-blueGray p-2 items-center   rounded-sm')}>
            <Text
              style={[
                tailwind('text-base text-center'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Facture
            </Text>
          </View>
          <View style={tailwind('mt-5')}>
            <Text
              style={[
                tailwind('text-sm text-gray-900'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Intitulé de l'impot
            </Text>
            <Text
              style={[
                tailwind('text-sm text-gray-900 mt-2'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Avis de versement Impôt Foncier
            </Text>
            <View
              style={[tailwind('mt-4'), { borderWidth: 1, opacity: 0.1 }]}
            />
          </View>
          <View style={tailwind('mt-5')}>
            <Text
              style={[
                tailwind('text-sm text-gray-900'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Période de l'impôt à payer
            </Text>
            <Text
              style={[
                tailwind('text-sm text-gray-900 mt-2'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Tiers 1 2022
            </Text>
            <View
              style={[tailwind('mt-4'), { borderWidth: 1, opacity: 0.1 }]}
            />
          </View>
          <View style={tailwind('mt-5')}>
            <Text
              style={[
                tailwind('text-sm text-gray-900'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Moyen de paiement
            </Text>
            <Text
              style={[
                tailwind('text-sm text-gray-900 mt-2'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Compte bancaire
            </Text>
            <View
              style={[tailwind('mt-4'), { borderWidth: 1, opacity: 0.1 }]}
            />
          </View>
          <View style={tailwind('mt-5')}>
            <Text
              style={[
                tailwind('text-sm text-gray-900'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Nom et prénoms du titulaire
            </Text>
            <Text
              style={[
                tailwind('text-sm text-gray-900 mt-2'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Sara Jean Philippe
            </Text>
            <View
              style={[tailwind('mt-4'), { borderWidth: 1, opacity: 0.1 }]}
            />
          </View>
          <View style={tailwind('mt-5')}>
            <Text
              style={[
                tailwind('text-sm text-gray-900'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Réference
            </Text>
            <Text
              style={[
                tailwind('text-sm text-gray-900 mt-2'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              0223826378
            </Text>
            <View
              style={[tailwind('mt-4'), { borderWidth: 1, opacity: 0.1 }]}
            />
          </View>
          <View style={tailwind('mt-5')}>
            <View style={tailwind('flex-row justify-between')}>
              <Text
                style={[
                  tailwind('text-sm text-gray-900'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                Montant total :
              </Text>
              <Text
                style={[
                  tailwind('text-sm text-gray-900'),
                  { fontFamily: 'Gilroy-bold' },
                ]}
              >
                <MaskedText
                  type="currency"
                  options={{
                    suffix: '',
                    decimalSeparator: ',',
                    groupSeparator: '.',
                    precision: 0,
                    groupSize: 3,
                  }}
                  numberOfLines={1}
                >
                  {data?.r_montant}
                </MaskedText>
              </Text>
            </View>
            <View style={tailwind('flex-row justify-between mt-5')}>
              <Text
                style={[
                  tailwind('text-sm text-gray-900'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                Montant à payer :
              </Text>
              <Text
                style={[
                  tailwind('text-sm text-gray-900'),
                  { fontFamily: 'Gilroy-bold' },
                ]}
              >
                <MaskedText
                  type="currency"
                  options={{
                    suffix: '',
                    decimalSeparator: ',',
                    groupSeparator: '.',
                    precision: 0,
                    groupSize: 3,
                  }}
                  numberOfLines={1}
                >
                  {data?.r_montant}
                </MaskedText>
              </Text>
            </View>
            <View style={tailwind('flex-row justify-between mt-5')}>
              <Text
                style={[
                  tailwind('text-sm text-gray-900'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                Reste dû :
              </Text>
              <Text
                style={[
                  tailwind('text-sm text-gray-900'),
                  { fontFamily: 'Gilroy-bold' },
                ]}
              >
                <MaskedText
                  type="currency"
                  options={{
                    suffix: '',
                    decimalSeparator: ',',
                    groupSeparator: '.',
                    precision: 0,
                    groupSize: 3,
                  }}
                  numberOfLines={1}
                >
                  {data?.r_montant}
                </MaskedText>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PaymentSucceedDetails
