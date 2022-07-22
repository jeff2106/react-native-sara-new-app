import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Dimensions } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigate } from '@/Navigators/Root'
import { EmptyView, ErrorView, SearchInput } from '@/Components'
import { default as FlatList } from '@/Components/FlatList'
import DeclarationItemPlaceholder from '@/Containers/Impot_News/sections/DeclarationItemPlaceholder'
import DeclarationEffectueItem from '@/Containers/Impot_News/sections/DeclarationEffectueItem'
import FetchDeclarationsHorsDelai from '@/Store/Statement/statement_getRejected'
import FilterPaymentCompleted from '@/Containers/Statement/TransactionOutOfTime/section/FilterTransacOutOfTime'
//493
const TransactionOutOfTimeScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const [dataFilter, setDataFilter] = useState('')
  const { r_acteur } = user._description || {}
  const user_session = user?._session
  const { height, width } = Dimensions.get('window')
  /*  Default date */
  const D = new Date().getDate()
  const Day = D < 10 ? `0${D}` : D
  const M = new Date().getMonth()
  const Month = M > 9 ? M : `0${M}`
  const ActMonth = M + 1 > 9 ? M + 1 : `0${M + 1}`
  const Year = new Date().getUTCFullYear()
  const OldDate = `${Year}-${Month}-${Day}`
  const ActDate = `${Year}-${ActMonth}-${Day}`
  /* End */

  const fetchDeclarationsLoading = useSelector(
    state => state.Statement.getStatementRejected.loading,
  )
  const fetchDeclarationsError = useSelector(
    state => state.Statement.getStatementRejected.error,
  )
  const fetchDeclarationsData = useSelector(
    state => state.Statement.ItemsStatementRejected,
  )
  const [search, setSearch] = useState('')
  const [declarationList, setDeclarationList] = useState()

  const fetchData = () => {
    if (typeof dataFilter?.DateObj?.datetype_1 === 'string') {
      dispatch(
        FetchDeclarationsHorsDelai.action({
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
      ).then(r => console.log('====> String : ', r))
    }
  }

  const goToDeclarationDetails = data => {
    navigate('DeclarationWizardScreenNews', { data: data })
  }
  const _GetData = data => {
    setDataFilter(data)
  }
  const _GetTextSearch = data => {}

  useEffect(() => {
    fetchData()
    //console.log('reload')
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
        title={'Déclarations hors délais'}
        navigation={navigation}
      />
      <View style={tailwind('flex-1 p-4')}>
        {
          <View style={{ height: height / 4 }}>
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
            style={tailwind('flex-1 pt-4')}
            showsVerticalScrollIndicator={false}
            data={declarationList}
            renderItem={({ item, index }) => (
              <DeclarationEffectueItem
                key={index}
                data={item}
                btn_Status={1}
                btnText={'Refaire la declaration'}
                onPress={() =>
                  goToDeclarationDetails({
                    service: item,
                    configuration: item,
                    fields: item.r_champs,
                  })
                }
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

export default TransactionOutOfTimeScreen
