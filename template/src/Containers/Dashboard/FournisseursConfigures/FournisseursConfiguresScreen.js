import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { default as FlatList } from '@/Components/FlatList'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import FournisseurItem from '@/Containers/Dashboard/sections/FournisseurItem'
import { navigate } from '@/Navigators/Root'
import FetchFournisseursConfigures from '@/Store/Auth/FetchFournisseursConfigures'
import FournisseursConfiguresPlaceholder from '@/Containers/Dashboard/FournisseursConfigures/sections/FournisseursConfiguresPlaceholder'

const FournisseursConfiguresScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const fournisseursConfigures = useSelector(
    state => state.auth.fournisseursConfigures,
  )
  const fetchFournisseursConfiguresLoading = useSelector(
    state => state.auth.fetchFournisseursConfigures.loading,
  )

  const fetchData = () => {
    dispatch(
      FetchFournisseursConfigures.action({
        session: user_session,
        acteur: r_acteur,
      }),
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        navigation={navigation}
        hasBack={true}
        title="Fournisseurs configurés"
      />
      <View style={tailwind('flex-1 pl-4 pr-4')}>
        {fetchFournisseursConfiguresLoading && (
          <FournisseursConfiguresPlaceholder />
        )}
        {!fetchFournisseursConfiguresLoading && (
          <FlatList
            onRefresh={fetchData}
            loading={fetchFournisseursConfiguresLoading}
            style={tailwind('flex-1')}
            showsVerticalScrollIndicator={false}
            data={fournisseursConfigures}
            renderItem={({ item, index }) => (
              <FournisseurItem
                data={item}
                onPress={() =>
                  navigate('FournisseurConfigureDetails', { data: item })
                }
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default FournisseursConfiguresScreen
