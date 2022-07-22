import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigate } from '@/Navigators/Root'
import { EmptyView, ErrorView, SearchInput } from '@/Components'
import { default as FlatList } from '@/Components/FlatList'
import FetchDeclarations from '@/Store/Impot/FetchDeclarations'
import DeclarationItem from '@/Containers/Impot/sections/DeclarationItem'
import DeclarationItemPlaceholder from '@/Containers/Impot/sections/DeclarationItemPlaceholder'

const ListeDeclarationAttenteScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const configuration = JSON.parse(route.params.configuration)

  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const fetchDeclarationsLoading = useSelector(
    state => state.impot.fetchDeclarations.loading,
  )
  const fetchDeclarationsError = useSelector(
    state => state.impot.fetchDeclarations.error,
  )
  const fetchDeclarationsData = useSelector(state => state.impot.declarations)

  const [search, setSearch] = useState('')
  const [declarationList, setDeclarationList] = useState(fetchDeclarationsData)

  const fetchData = () => {
    dispatch(
      FetchDeclarations.action({
        p_session: user_session,
        p_client: r_acteur,
        p_num_registre_commerce: '',
        p_statut: 0,
        p_param: configuration.r_champs,
        p_param_service: configuration.r_service,
      }),
    )
  }

  const goToDeclarationWizard = data => {
    navigate('DeclarationWizard', {
      data: JSON.stringify(data),
      update: false,
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setDeclarationList(fetchDeclarationsData)
  }, [fetchDeclarationsData])

  useEffect(() => {
    setDeclarationList(
      fetchDeclarationsData?.filter(item =>
        item.r_libelle_service.toLowerCase().includes(search),
      ),
    )
  }, [search])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        hasBack={true}
        title={'Déclarations en attente'}
        navigation={navigation}
      />
      <View style={tailwind('flex-1 p-4')}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Rechercher"
        />
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
              <DeclarationItem
                data={item}
                onPress={() =>
                  goToDeclarationWizard({
                    service: item,
                    configuration: configuration,
                  })
                }
              />
            )}
            ListEmptyComponent={() => (
              <EmptyView
                message="Vous n'avez aucune déclaration en attente"
                onBackPress={() => navigation.goBack()}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default ListeDeclarationAttenteScreen
