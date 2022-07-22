import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, Text, View, Dimensions } from 'react-native'
import { default as FlatList } from '@/Components/FlatList'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import WaitingItemPayment from '@/Containers/Paiements/PaymentCompleted/section/WaitingItemPayment'
import FournisseurItem from '@/Containers/Dashboard/WaitingForPayment/sections/FournisseurItem'
import { Button, EmptyView, SearchInput } from '@/Components'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import { replace, navigate } from '@/Navigators/Root'
import FetchPayment from '@/Store/Impot/FetchPayment'
import WaitingForPaymentPlaceholder from '@/Containers/Dashboard/WaitingForPayment/sections/WaitingForPaymentPlaceholder'
import FilterPaymentPending from '@/Containers/Paiements/PaymentCompleted/section/FilterPaymentCompleted'
import TransacCompleted from '@/Store/Payment/Payment'

const PaymentSuccedScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session
  const [dataFilter, setDataFilter] = useState('')

  const fetchItemsTransacSucceed = useSelector(
    state => state.TransacPayment.ItemsTransacSucceed,
  )
  const [search, setSearch] = useState('')
  const [PaymentSucceedLists, setPaymentSucceedList] = useState(
    fetchItemsTransacSucceed,
  )
  const isLoadingFetchPayment = useSelector(
    state => state.TransacPayment?.getTransacPaymentSuccess?.loading,
  )

  const { height, width } = Dimensions.get('window')

  /*  Default date */
  const D = new Date().getDate()
  const Day = D < 10 ? `0${D}` : D
  const M = new Date().getMonth()
  const Month = M > 9 ? M : `0${M}`
  const ActMonth = M + 1 > 9 ? M + 1 : `0${M + 1}`
  const Year = new Date().getUTCFullYear()
  const OldDate = `${Year}-01-01`
  const ActDate = `${Year}-${ActMonth}-${Day}`
  //console.log(ActDate,OldDate)
  /* End */

  const fetchPaymentWaiting = code => {
    if (typeof dataFilter?.DateObj?.datetype_1 === 'string') {
      dispatch(
        TransacCompleted.action({
          p_session: user_session,
          p_id_acteur: r_acteur,
          p_statut: '*',
          p_id_fournisseur: 0,
          p_date_debut:
            dataFilter?.DateObj?.datetype_1 === ''
              ? OldDate
              : dataFilter?.DateObj?.datetype_1,
          p_date_fin:
            dataFilter?.DateObj?.datetype_2 === ''
              ? ActDate
              : dataFilter?.DateObj?.datetype_2,
        }),
      ).then(r => {
        console.log('==>', r)
      })
    }
  }

  const _GetData = data => {
    setDataFilter(data)
  }
  const _GetTextSearch = data => {
    //console.log(data)
  }

  useEffect(() => {
    fetchPaymentWaiting()
  }, [dataFilter])

  useEffect(() => {
    setPaymentSucceedList(fetchItemsTransacSucceed)
  }, [fetchItemsTransacSucceed])

  useEffect(() => {
    setPaymentSucceedList(
      fetchItemsTransacSucceed?.filter(item =>
        item?.r_param?.r_service?.toLowerCase().includes(search?.toLowerCase()),
      ),
    )
  }, [search])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        navigation={navigation}
        hasBack={true}
        title="Paiements en effectués"
      />
      <View style={tailwind('flex-1 p-4')}>
        <View style={{ height: height / 3.5 }}>
          <FilterPaymentPending
            onChange={_GetData}
            onChangeText={_GetTextSearch}
          />
        </View>

        {fetchItemsTransacSucceed?.length > 0 && (
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="Rechercher"
          />
        )}
        {isLoadingFetchPayment && (
          <View style={tailwind('flex-1  items-center')}>
            <WaitingForPaymentPlaceholder />
          </View>
        )}

        {!isLoadingFetchPayment && (
          <FlatList
            onRefresh={fetchPaymentWaiting}
            loading={isLoadingFetchPayment}
            data={PaymentSucceedLists}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyView
                onBackPress={() => navigation.goBack()}
                message={"Vous n'avez aucun paiement en attente"}
              />
            }
            renderItem={({ item, index }) => (
              <View style={tailwind('flex-1  mt-4')}>
                {item?.r_param?.map(transac => (
                  <WaitingItemPayment
                    onPress={() =>
                      navigate('PaymentSuccedDetails', { data: transac })
                    }
                    key={transac.id}
                    data={transac}
                  />
                ))}
                {item?.r_param?.length < 1 && (
                  <EmptyView
                    onBackPress={() => navigation.goBack()}
                    message={"Vous n'avez aucun paiement en effectués"}
                  />
                )}
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default PaymentSuccedScreen
