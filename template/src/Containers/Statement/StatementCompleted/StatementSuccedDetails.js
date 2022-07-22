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

const StatementSuccedDetails = ({ navigation, route }) => {
  const { data } = route.params

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        navigation={navigation}
        hasBack={true}
        title="Paiements en attente"
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
            {data?.r_code_service}
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
            {data?.r_service}
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
            {moment(data?.r_date_limite).format('DD/MM/YYYY')}
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
            Montant
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
              {data?.r_montant}
            </MaskedText>
          </Text>
        </View>
      </View>
      <Button
        style={[tailwind('m-4')]}
        onPress={() => navigate('PaymentPendingProccess', { data: data })}
      >
        <Text>Proccéder au paiement</Text>
      </Button>
    </SafeAreaView>
  )
}

export default StatementSuccedDetails
