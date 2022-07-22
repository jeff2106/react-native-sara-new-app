import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Dimensions } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigate } from '@/Navigators/Root'
import { EmptyView, ErrorView, SearchInput } from '@/Components'
import { default as FlatList } from '@/Components/FlatList'
import DeclarationItemPlaceholder from '@/Containers/Impot_News/sections/DeclarationItemPlaceholder'
import DeclarationEffectueItemsNews from '@/Containers/Statement/StatementCompleted/section/DeclarationEffectueItemsNews'
import FetchDeclarationsSucceed from '@/Store/Statement/statement_getSucceed'
import FilterPaymentCompleted from '@/Containers/Statement/StatementCompleted/section/FilterPaymentCompleted'
import Statement from '@/Store/Statement'

const StatementSuccedScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const [dataFilter, setDataFilter] = useState('')
  const { r_acteur } = user._description || {}
  const user_session = user?._session
  const [isFetch, setIsFetch] = useState(false)
  const fetchData = () => {
    if (typeof dataFilter?.DateObj?.datetype_1 === 'string') {
      dispatch(
        FetchDeclarationsSucceed.action({
          p_session: user_session,
          p_id_acteur: r_acteur,
          p_date_debut:
            dataFilter?.DateObj?.datetype_1 === ''
              ? OldDate
              : dataFilter?.DateObj?.datetype_1,
          p_date_fin:
            dataFilter?.DateObj?.datetype_2 === ''
              ? ActDate
              : dataFilter?.DateObj?.datetype_2,
          p_id_fournisseur: dataFilter?.FilterObj?.id_filtertype_2,
          p_categorie_fournisseur: dataFilter?.FilterObj?.id_filtertype_1,
        }),
      )
    }
  }

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

  /* End */
  const fetchDeclarationsLoading = useSelector(
    state => state.Statement.getStatementSucceed.loading,
  )
  const fetchDeclarationsError = useSelector(
    state => state.Statement.getStatementSucceed.error,
  )
  const fetchDeclarationsData = useSelector(
    state => state.Statement.ItemsStatementSucceed,
  )

  const [search, setSearch] = useState('')
  const [declarationList, setDeclarationList] = useState()

  const goToPaymentDeclaration = data => {
    navigate('PaymentPendingDetails', { data: data })
  }
  const goToDetailsReject = data => {
    navigate('StatementRejectedDetails', { data: data })
  }
  const _GetData = data => {
    setDataFilter(data)
    //console.log("=====> ",data)
  }
  const _GetTextSearch = data => {}
  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    fetchData()
  }, [dataFilter])

  useEffect(() => {
    setDeclarationList(fetchDeclarationsData)
  }, [fetchDeclarationsData])

  useEffect(() => {
    setDeclarationList(
      fetchDeclarationsData?.filter(item =>
        item?.r_libelle_service?.toLowerCase().includes(search?.toLowerCase()),
      ),
    )
  }, [search])
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        hasBack={true}
        title={'Déclarations éffectuées'}
        navigation={navigation}
      />
      <View style={tailwind('flex-1 p-4')}>
        {
          <View style={{ height: height / 3.5 }}>
            <FilterPaymentCompleted
              onChange={_GetData}
              onChangeText={_GetTextSearch}
            />
          </View>
        }
        {declarationList?.length > 0 && (
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="Rechercher"
          />
        )}
        {fetchDeclarationsLoading && <DeclarationItemPlaceholder />}
        {!fetchDeclarationsLoading && fetchDeclarationsError && (
          <ErrorView
            onRetryPress={fetchData}
            errorMessage="Erreur lors de la récupération des déclarations"
          />
        )}
        {!fetchDeclarationsLoading && !fetchDeclarationsError && (
          <FlatList
            contentContainerStyle={tailwind('p-1')}
            onRefresh={fetchData}
            loading={false}
            style={tailwind('flex-1 pt-4 mt-2')}
            showsVerticalScrollIndicator={false}
            data={declarationList}
            renderItem={({ item, index }) => (
              <DeclarationEffectueItemsNews
                data={item}
                btnText={
                  item?.r_statut_formulaire === 2
                    ? 'Voir les details '
                    : 'Procéder au paiement'
                }
                isPayable={item?.r_payable}
                onPress={() => {
                  item?.r_statut_formulaire === 3
                    ? goToPaymentDeclaration({
                        service: item,
                        configuration: item,
                        fields: item.r_champs,
                      })
                    : goToDetailsReject({
                        service: item,
                        configuration: item,
                        fields: item.r_champs,
                      })
                }}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyView
                message="Vous n'avez efféctué aucune déclaration"
                onBackPress={() => navigation.goBack()}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default StatementSuccedScreen
