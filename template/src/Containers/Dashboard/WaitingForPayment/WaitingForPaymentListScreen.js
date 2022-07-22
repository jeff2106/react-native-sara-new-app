import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, Text, View } from 'react-native'
import { default as FlatList } from '@/Components/FlatList'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import WaitingItem from '@/Containers/Dashboard/WaitingForPayment/sections/WaitingItem'
import FournisseurItem from '@/Containers/Dashboard/WaitingForPayment/sections/FournisseurItem'
import { Button, EmptyView } from '@/Components'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import { replace } from '@/Navigators/Root'
import FetchPayment from '@/Store/Impot/FetchPayment'
import WaitingForPaymentPlaceholder from '@/Containers/Dashboard/WaitingForPayment/sections/WaitingForPaymentPlaceholder'

const WaitingForPaymentListScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const fetchPaymentSave = useSelector(state => state.impot.paymentEnattente)
  const isLoadingFetchPayment = useSelector(
    state => state.impot?.fetchPayment?.loading,
  )

  const [radioValue, setRadioValue] = React.useState()

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
    setRadioValue(data)
  }
  const onSubmit = data => {
    navigation.navigate('PaymentProccess', {
      id: data?.id,
      reference: data?.reference,
    })
  }
  useEffect(() => {
    fetchPayment()
  }, [])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        navigation={navigation}
        hasBack={true}
        title="En attente de paiement"
      />
      <View style={tailwind('flex-1')}>
        {isLoadingFetchPayment && <WaitingForPaymentPlaceholder />}
        {!isLoadingFetchPayment && (
          <FlatList
            onRefresh={fetchPayment}
            loading={isLoadingFetchPayment}
            data={fetchPaymentSave}
            ListEmptyComponent={
              <EmptyView
                onBackPress={() => navigation.goBack()}
                message={"Vous n'avez aucun paiement en attente"}
              />
            }
            renderItem={({ item, index }) => (
              <View style={tailwind('flex-1 pl-4 pr-4')}>
                <FournisseurItem
                  data={{
                    r_name: item?.r_acteur_recepteur,
                    r_image_url: item.r_image_url,
                  }}
                />
                {item?.r_param?.map(transac => (
                  <WaitingItem
                    key={transac.id}
                    data={transac}
                    onChange={onSelect}
                    value={radioValue?.id}
                  />
                ))}
              </View>
            )}
          />
        )}
      </View>

      <View style={[tailwind('p-4  ')]}>
        <Button onPress={() => onSubmit(radioValue)} disabled={!radioValue}>
          Procéder au paiement
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default WaitingForPaymentListScreen
