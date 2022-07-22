import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, Text, View } from 'react-native'
import { default as FlatList } from '@/Components/FlatList'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { Button, EmptyView } from '@/Components'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import { replace, navigateAndSimpleReset } from '@/Navigators/Root'
import FetchPayment from '@/Store/Impot/FetchPayment'
import PaymentSucceedItem from '@/Containers/Dashboard/PaymentSucceed/sections/PaymentSucceedItem'
import PaymentSucceedPlaceholder from '@/Containers/Dashboard/PaymentSucceed/sections/PaymentSucceedPlaceholder'

const PaymentSucceedListScreen = ({ navigation, goBack }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const fetchPaymentSave = useSelector(state => state.impot.paymentEnattente)
  const isLoadingFetchPayment = useSelector(
    state => state.impot?.fetchPayment?.loading,
  )

  const fetchPayment = code => {
    dispatch(
      FetchPayment.action({
        user_session: user_session,
        r_acteur: r_acteur,
        p_statut: 0,
      }),
    )
  }

  const onSelect = data => {
    navigation.navigate('PaymentSucceedDetails', { data: data })
  }

  useEffect(() => {
    fetchPayment()
  }, [])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        navigation={navigation}
        hasBack={true}
        title="Paiements effectués"
      />
      <View style={tailwind('flex-1 mt-3')}>
        {isLoadingFetchPayment && <PaymentSucceedPlaceholder />}
        {!isLoadingFetchPayment && (
          <FlatList
            onRefresh={fetchPayment}
            loading={isLoadingFetchPayment}
            data={fetchPaymentSave}
            ListEmptyComponent={
              <EmptyView
                onBackPress={() => navigation.goBack()}
                message={"vous n'avez effectué aucun paiement"}
              />
            }
            renderItem={({ item, index }) => (
              <View style={tailwind('flex-1 pl-4 pr-4')}>
                {item?.r_param?.map(transac => (
                  <PaymentSucceedItem
                    key={transac?.id}
                    data={transac}
                    onChange={onSelect}
                  />
                ))}
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default PaymentSucceedListScreen
