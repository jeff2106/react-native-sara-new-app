import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { default as FlatList } from '@/Components/FlatList'
import { Button } from '@/Components'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { MaskedText } from 'react-native-mask-text'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import { replace, navigateAndSimpleReset, navigate } from '@/Navigators/Root'

import moment from 'moment'

const StatementRejectedDetails = ({ navigation, route }) => {
  const { data } = route.params
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        navigation={navigation}
        hasBack={true}
        title="Déclarations echouées"
      />
      <View style={tailwind('flex-1 mt-3 ml-4 mr-4')}>
        <View style={tailwind('bg-blueGray p-2 items-center   rounded-sm')}>
          <Text
            style={[
              tailwind('text-base text-center'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Récapitulatif
          </Text>
        </View>
        <View style={tailwind('mt-5')}>
          <Text
            style={[
              tailwind('text-sm text-gray-900'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Code
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 mt-2'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {data?.service?.r_type_impot}
          </Text>
          <View style={[tailwind('mt-4'), { borderWidth: 1, opacity: 0.1 }]} />
        </View>
        <View style={tailwind('mt-5')}>
          <Text
            style={[
              tailwind('text-sm text-gray-900'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Libellé impôt
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 mt-2'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {data?.service?.r_libelle_formulaire}
          </Text>
          <View style={[tailwind('mt-4'), { borderWidth: 1, opacity: 0.1 }]} />
        </View>
        <View style={tailwind('mt-5')}>
          <Text
            style={[
              tailwind('text-sm text-gray-900'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Date limite
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 mt-2'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {moment(data?.service?.r_date_limite).format('DD/MM/YYYY')}
          </Text>
          <View style={[tailwind('mt-4'), { borderWidth: 1, opacity: 0.1 }]} />
        </View>
        <View style={tailwind('mt-5')}>
          <Text
            style={[
              tailwind('text-sm text-gray-900'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Montants
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 mt-2'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            <MaskedText
              type="currency"
              options={{
                suffix: ' FCFA',
                decimalSeparator: ',',
                groupSeparator: '.',
                precision: 0,
                groupSize: 3,
              }}
              numberOfLines={1}
            >
              {data?.service?.r_total_a_payer}
            </MaskedText>
          </Text>
        </View>
        <View style={[tailwind('mt-4'), { borderWidth: 1, opacity: 0.1 }]} />
        <View style={tailwind('mt-5')}>
          <Text
            style={[
              tailwind('text-sm text-gray-900'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Motif de rejet
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 mt-2'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Fond insuffisant
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default StatementRejectedDetails
