import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, Text, View } from 'react-native'
import { default as FlatList } from '@/Components/FlatList'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { Button, EmptyView } from '@/Components'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import { replace } from '@/Navigators/Root'
import FetchPayment from '@/Store/Impot/FetchPayment'
import PaymentItem from '@/Containers/Dashboard/PendingForPayment/sections/PaymentItem'
import PaymentPendingPlaceholder from '@/Containers/Dashboard/PendingForPayment/sections/PaymentPendingPlaceholder'
import PendingFournisseurItem from '@/Containers/Dashboard/PendingForPayment/sections/PendingFournisseurItem'

const PaymentPendingListScreen = ({ navigation }) => {
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

  useEffect(() => {
    fetchPayment()
  }, [])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        navigation={navigation}
        hasBack={true}
        title="En attente de d'approbation"
      />
      <View style={tailwind('flex-1')}>
        {isLoadingFetchPayment && <PaymentPendingPlaceholder/>}
        {!isLoadingFetchPayment && (
          <FlatList
            onRefresh={fetchPayment}
            loading={isLoadingFetchPayment}
            data={fetchPaymentSave}
            ListEmptyComponent={
              <EmptyView message={"Vous n'avez aucun paiement en attente"} />
            }
            renderItem={({ item, index }) => (
              <View style={tailwind('flex-1 pl-4 pr-4')}>
                <PendingFournisseurItem
                  data={{
                    r_name: item?.r_acteur_recepteur,
                    r_image_url: item.r_image_url,
                  }}
                />
                {item?.r_param?.map(transac => (
                  <PaymentItem
                    key={transac.id}
                    data={transac}
                    onChange={onSelect}
                    value={radioValue}
                  />
                ))}
              </View>
            )}
          />
        )}
      </View>

      <View style={[tailwind('p-4  ')]}>
        <Button disabled={!radioValue}>Procéder au paiement</Button>
      </View>
    </SafeAreaView>
  )
}

export default PaymentPendingListScreen
