import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, FlatList, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import CompanyItem from '@/Containers/Services/CompanyList/sections/CompanyItem'
import { replace } from '@/Navigators/Root'
import FetchFournisseurByCategoryId from '@/Store/Fournisseur/FetchFournisseurByCategoryId'
import CompanyListPlaceholder from '@/Containers/Services/CompanyList/CompanyListPlaceholder'
import { EmptyView, ErrorView } from '@/Components'
import { Config } from '@/Config'
import { showInfoToast } from '@/Components/Alert'

const CompanyList = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { data } = route.params

  const user = useSelector(state => state.auth.item)

  const fournisseursConfigures = useSelector(
    state => state.auth.fournisseursConfigures,
  )
  const fournisseurs = useSelector(state => state.fournisseur.item)
  const fetchFournisseurLoading = useSelector(
    state => state.fournisseur.fetchFournisseurByCategoryId.loading,
  )
  const fetchFournisseurError = useSelector(
    state => state.fournisseur.fetchFournisseurByCategoryId.error,
  )

  const getFournisseurs = () => {
    dispatch(
      FetchFournisseurByCategoryId.action({
        categoryId: data.category.id,
        session: user?._session,
      }),
    )
  }

  const checkIfConfigExist: boolean = fournisseur => {
    const index = fournisseursConfigures.findIndex(
      item => item.r_fournisseur.r_reference === fournisseur.r_reference,
    )

    return index !== -1
  }

  useEffect(() => {
    getFournisseurs()
  }, [])

  const onCompanyPress = company => {
    console.log(company)
    switch (company.r_reference) {
      case Config.CODE_IMPOT:
        checkIfConfigExist(company)
          ? replace('ImpotServiceNews', { data: { ...company } })
          : replace('ImpotSetupScreenNews', { data: { ...company } })
        break
      default:
        showInfoToast(
          'Bientôt disponible',
          'Ce service sera bientôt disponible',
        )
        break
    }
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        hasBack={true}
        title={data.category.r_libelle}
        navigation={navigation}
      />
      <View style={tailwind('flex-1 w-full p-4 rounded-md')}>
        {fetchFournisseurLoading && <CompanyListPlaceholder />}
        {!fetchFournisseurLoading && fetchFournisseurError && (
          <ErrorView
            errorMessage="Erreur lors de la récupération des données, veuillez réessayer."
            onRetryPress={getFournisseurs}
          />
        )}
        {!fetchFournisseurLoading && !fetchFournisseurError && (
          <>
            <Text
              style={[
                tailwind('font-bold text-gray-900 text-base'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Sélectionnez une entité
            </Text>
            <View style={tailwind('flex-row flex-wrap mt-5')}>
              <FlatList
                contentContainerStyle={tailwind('flex justify-between')}
                showsVerticalScrollIndicator={false}
                data={fournisseurs}
                ListEmptyComponent={
                  <EmptyView
                    onBackPress={navigation.goBack}
                    message="Aucun fournisseur disponible dans cette categorie pour l'instant, revenez plus tard."
                  />
                }
                renderItem={({ item }) => (
                  <CompanyItem
                    data={item}
                    onPress={() => onCompanyPress(item)}
                  />
                )}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

export default CompanyList
