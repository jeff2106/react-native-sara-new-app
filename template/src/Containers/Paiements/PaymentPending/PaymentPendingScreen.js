import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, Text, View, Dimensions } from 'react-native'
import { default as FlatList } from '@/Components/FlatList'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import WaitingItemPayment from '@/Containers/Paiements/PaymentPending/section/WaitingItemPayment'
import { Button, EmptyView, SearchInput } from '@/Components'
import { replace, navigate } from '@/Navigators/Root'
import WaitingForPaymentPlaceholder from '@/Containers/Dashboard/WaitingForPayment/sections/WaitingForPaymentPlaceholder'
import FilterPaymentPending from '@/Containers/Paiements/PaymentPending/section/FilterPaymentPending'
import FetchDeclarationsSucceed from '@/Store/Payment/get_count_payment_pending'

const PaymentPendingScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session
  const [dataFilter, setDataFilter] = useState('')

  const fetchItemsTransacPending = useSelector(
    state => state.TransacPayment.ItemsPaymentPending,
  )

  const [search, setSearch] = useState('')
  const [PaymentPendingLists, setPaymentPendingList] = useState(
    fetchItemsTransacPending,
  )
  const isLoadingFetchPaymentPending = useSelector(
    state => state.TransacPayment?.getItemsPaymentPending.loading,
  )
  console.log(isLoadingFetchPaymentPending)

  const { height, width } = Dimensions.get('window')

  /*  Default date */
  const D = new Date().getDate()
  const Day = D < 10 ? `0${D}` : D
  const M = new Date().getMonth()
  const Month = M > 9 ? M : `0${M}`
  const ActMonth = M + 1 > 9 ? M + 1 : `0${M + 1}`
  const Year = new Date().getUTCFullYear()
  const OldDate = `${Day}-${Month}-${Year}`
  const ActDate = `${Day}-${ActMonth}-${Year}`
  //console.log(ActDate,OldDate)
  /* End */

  const FetchDeclarationsSucceedData = () => {
    if (typeof dataFilter?.DateObj?.datetype_1 === 'string') {
      dispatch(
        FetchDeclarationsSucceed.action({
          p_session: user_session,
          p_id_acteur: r_acteur,
          p_date_debut:
            dataFilter?.DateObj?.datetype_1 === ''
              ? '*'
              : dataFilter?.DateObj?.datetype_1,
          p_date_fin:
            dataFilter?.DateObj?.datetype_2 === ''
              ? '*'
              : dataFilter?.DateObj?.datetype_2,
          p_id_fournisseur: dataFilter?.FilterObj?.id_filtertype_2,
          p_categorie_fournisseur: dataFilter?.FilterObj?.id_filtertype_1,
        }),
      ).then(r => console.log('===>rules: ', r))
    }
  }

  const _GetData = data => {
    setDataFilter(data)
  }
  const _GetTextSearch = data => {
    //console.log(data)
  }
  const goToPaymentDeclaration = data => {
    navigate('PaymentPendingDetails', { data: data })
  }
  useEffect(() => {
    FetchDeclarationsSucceedData()
  }, [dataFilter])

  useEffect(() => {
    setPaymentPendingList(fetchItemsTransacPending)
  }, [fetchItemsTransacPending])

  useEffect(() => {
    setPaymentPendingList(
      fetchItemsTransacPending?.filter(item =>
        item?.r_type_impot?.toLowerCase().includes(search?.toLowerCase()),
      ),
    )
  }, [search])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        navigation={navigation}
        hasBack={true}
        title="Paiements en attente"
      />
      <View style={tailwind('flex-1 p-4')}>
        <View style={{ height: height / 3.5 }}>
          <FilterPaymentPending
            onChange={_GetData}
            onChangeText={_GetTextSearch}
          />
        </View>
        {fetchItemsTransacPending?.length > 0 && (
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="Rechercher"
          />
        )}

        {isLoadingFetchPaymentPending && (
          <View style={tailwind('flex-1  items-center')}>
            <WaitingForPaymentPlaceholder />
          </View>
        )}

        {!isLoadingFetchPaymentPending && (
          <View style={{ height: height / 2 }}>
            <FlatList
              onRefresh={FetchDeclarationsSucceedData}
              loading={isLoadingFetchPaymentPending}
              data={PaymentPendingLists}
              ListEmptyComponent={
                <EmptyView
                  onBackPress={() => navigation.goBack()}
                  message={"Vous n'avez aucun paiement en attente"}
                />
              }
              renderItem={({ item, index }) => (
                <View key={index} style={tailwind('flex-1  mt-4')}>
                  <WaitingItemPayment
                    key={index}
                    onPress={() => {
                      goToPaymentDeclaration({
                        service: item,
                        configuration: item,
                        fields: item.r_champs,
                      })
                    }}
                    data={item}
                  />
                </View>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default PaymentPendingScreen
