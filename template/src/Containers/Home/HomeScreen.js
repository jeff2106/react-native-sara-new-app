import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { tailwind } from '@/tailwind'
import UserProfil from '@/Containers/Home/sections/UserProfil'
import ServicesList from '@/Containers/Home/sections/ServicesList'
import HomeBar from '@/Containers/Home/sections/HomeBar'
import { default as FlatList } from '@/Components/FlatList'
import FetchCategory from '@/Store/Category/FetchCategory'
import ServiceListPlaceholder from '@/Containers/Home/sections/ServiceListPlaceholder'
import { ErrorView } from '@/Components'

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)

  const categories = useSelector(state => state.category.item)
  const fetchCategoryLoading = useSelector(
    state => state.category.fetchCategory.loading,
  )
  const fetchCategoryError = useSelector(
    state => state.category.fetchCategory.error,
  )

  const [categoriesConfigure, setCategoriesConfigure] = useState([])
  const [categoriesNonConfigure, setCategoriesNonConfigure] = useState([])
  const [viewWidth, setViewWidth] = useState()

  useEffect(() => {
    if (categories) {
      const categorieConfig = categories.filter(item => item.r_configure)
      const categorieNonConfig = categories.filter(item => !item.r_configure)

      setCategoriesConfigure(categorieConfig)
      setCategoriesNonConfigure(categorieNonConfig)
    }
  }, [categories])

  const fetchData = () => {
    console.debug('session : ', user._session)
    dispatch(
      FetchCategory.action({
        session: user?._session,
        id_client: user?._description.r_acteur,
      }),
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <HomeBar navigation={navigation} />
      <FlatList
        onRefresh={fetchData}
        loading={fetchCategoryLoading}
        showsVerticalScrollIndicator={false}
        style={tailwind('flex-1')}
        data={[]}
        renderItem={() => <View />}
        ListHeaderComponent={() => (
          <View
            onLayout={event => {
              setViewWidth(event.nativeEvent.layout.width - 30)
            }}
            style={tailwind('flex-1 p-4')}
          >
            <UserProfil />
            <View>
              {fetchCategoryLoading && <ServiceListPlaceholder />}
              {!fetchCategoryLoading && fetchCategoryError && (
                <ErrorView
                  onRetryPress={fetchData}
                  errorMessage="Erreur lors de la récupération des categories. Veuillez réessayer."
                />
              )}
            </View>
            {!fetchCategoryLoading && !fetchCategoryError && categories && (
              <>
                <ServicesList
                  viewSize={viewWidth}
                  listKey={Math.random()}
                  title="Categories configurées"
                  data={categoriesConfigure}
                />
                <ServicesList
                  viewSize={viewWidth}
                  listKey={Math.random()}
                  title="Categories non configurées"
                  data={categoriesNonConfigure}
                />
              </>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default HomeScreen
