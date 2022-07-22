import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { Radio, Checkbox } from 'native-base'
import { default as FlatList } from '@/Components/FlatList'
import { Button, KeyboardAView, DynamicFormNews } from '@/Components'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { MaskedText } from 'react-native-mask-text'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import { replace, navigateAndSimpleReset, navigate } from '@/Navigators/Root'
import moment from 'moment'
import FetchFormPayment from '@/Store/Payment/FormPayment'
import DynamicForm from '@/Components/DynamicForm'
import WaitingForPaymentPlaceholder from '@/Containers/Dashboard/WaitingForPayment/sections/WaitingForPaymentPlaceholder'
import { Colors } from '@/Theme/Variables'

const PaymentPendingDetails = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { data } = route.params

  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session
  const [value, setValue] = React.useState('one')
  const isLoadingFormPayment = useSelector(
    state => state.TransacPayment?.getFormPayment.loading,
  )
  const GetPaymentRequest = useSelector(
    state => state.TransacPayment?.ItemsTransacForm,
  )

  const FetchFormPaymentFunc = code => {
    dispatch(
      FetchFormPayment.action({
        p_session: user_session,
        p_id_fournisseur: data.configuration?.id_fournisseur,
        p_id_acteur: r_acteur,
        p_id_declaration: data?.service?.r_formulaire_saisi,
        p_id_service: data?.service?.id_service,
      }),
    ).then(r => console.log(r))
  }

  useEffect(() => {
    FetchFormPaymentFunc()
  }, [])

  //console.log( '=====> OK ', dataq?.find(r => r?.r_valeurs.filter(e => e.r_payable == true)),)
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <ScrollView>
        <KeyboardAView>
          <NavBar
            navigation={navigation}
            hasBack={true}
            title="Paiements en attente"
          />
          <View style={tailwind('flex-1 mt-3 ml-4 mr-4')}>
            <View
              style={tailwind('bg-blueGray p-2 items-center  mb-2 rounded-sm')}
            >
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
                {data?.configuration?.r_type_impot}
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
                Libellé service
              </Text>
              <Text
                style={[
                  tailwind('text-sm text-gray-900 mt-2'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                {data?.service?.r_libelle_service}
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
            </View>
            <View
              style={[tailwind('mt-4'), { borderWidth: 1, opacity: 0.1 }]}
            />
            <View style={tailwind('mt-5 mb-5')}>
              <Text
                style={[
                  tailwind('text-sm text-gray-900'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                Période
              </Text>
              <Text
                style={[
                  tailwind('text-sm text-gray-900 mt-2'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                {data?.service?.r_periode}
              </Text>
            </View>
            {!isLoadingFormPayment &&
              GetPaymentRequest?._description?.r_champs?.length > 0 && (
                <DynamicFormNews
                  disabled={false}
                  onDataChange={r => console.log(r)}
                  fields={GetPaymentRequest?._description?.r_champs}
                />
              )}
            {isLoadingFormPayment && (
              <ActivityIndicator size={'large'} color={Colors.primary} />
            )}
          </View>
          <View style={tailwind('ml-5 mr-5 mb-5')}>
            <Checkbox
              shadow={2}
              value="test"
              onChange={() => setValue(!value)}
              accessibilityLabel="This is a dummy checkbox"
              defaultNotChecked
            >
              J'accepte de payer
            </Checkbox>
          </View>
          <Button
            disabled={value}
            style={[tailwind('m-4')]}
            onPress={() =>
              navigate('PaymentPendingProccess', {
                dataFormDync: GetPaymentRequest,
                data: data,
              })
            }
          >
            <Text>Proccéder au paiement</Text>
          </Button>
        </KeyboardAView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PaymentPendingDetails
