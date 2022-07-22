import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native'
import { default as FlatList } from '@/Components/FlatList'
import { tailwind } from '@/tailwind'
import Dashboard from '@/Containers/Dashboard/sections/Dashboard'
import HomeBar from '@/Containers/Home/sections/HomeBar'
import SuiviOperation from '@/Containers/Dashboard/sections/SuiviOperation'
import FetchFournisseursConfigures from '@/Store/Auth/FetchFournisseursConfigures'
import FetchSupportPaiement from '@/Store/PaymentMethod/FetchSupportPaiement'
import DashboardPlaceholder from '@/Containers/Dashboard/sections/DashboardPlaceholder'
import SuiviOperationPlaceholder from '@/Containers/Dashboard/sections/SuiviOperationPlaceholder'
import FetchCategory from '@/Store/Category/FetchCategory'
import GetDetailsDashBoard from '@/Store/dashboard/getDetailsDashBoard'
import ServicesList from '@/Containers/Home/sections/ServicesList'
import CategoryConfig from '@/Containers/Dashboard/sections/CategorieConfig'

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { height, width } = Dimensions.get('window')
  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session
  console.log(user_session)
  const fetchFournisseursConfiguresLoading = useSelector(
    state => state.auth.fetchFournisseursConfigures.loading,
  )
  const fetchSupportPaiementLoading = useSelector(
    state => state.paymentMethod.fetchSupportPaiement.loading,
  )

  const fetchData = () => {
    dispatch(
      FetchFournisseursConfigures.action({
        session: user_session,
        acteur: r_acteur,
      }),
    )
    dispatch(FetchSupportPaiement.action({ id: r_acteur }))
  }
  const fetchDetailsDashBoard = () => {
    dispatch(
      GetDetailsDashBoard.action({
        p_session: user?._session,
      }),
    ).then(r => {
      //console.log('bine', r)
      console.log(r)
    })
  }
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

  const fetchDataCategory = () => {
    console.debug('session : ', user._session)
    dispatch(
      FetchCategory.action({
        session: user?._session,
        id_client: user?._description.r_acteur,
      }),
    )
  }

  //end

  useEffect(() => {
    fetchData()
    fetchDataCategory()
    fetchDetailsDashBoard()
  }, [])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <HomeBar navigation={navigation} />
      <View style={tailwind('flex-1 pl-4 pr-4')}>
        <FlatList
          onRefresh={fetchData}
          loading={
            fetchFournisseursConfiguresLoading &&
            fetchSupportPaiementLoading &&
            fetchCategoryLoading
          }
          style={tailwind('flex-1')}
          showsVerticalScrollIndicator={false}
          data={[]}
          renderItem={<></>}
          ListHeaderComponent={() => (
            <>
              {(fetchFournisseursConfiguresLoading ||
                fetchSupportPaiementLoading) && <DashboardPlaceholder />}

              {!fetchFournisseursConfiguresLoading &&
                !fetchSupportPaiementLoading && <Dashboard />}
              {(fetchFournisseursConfiguresLoading ||
                fetchSupportPaiementLoading) && <SuiviOperationPlaceholder />}

              {(fetchFournisseursConfiguresLoading || fetchCategoryLoading) && (
                <SuiviOperationPlaceholder />
              )}

              {!fetchFournisseursConfiguresLoading &&
                !fetchCategoryLoading &&
                categories && (
                  <CategoryConfig>
                    <ServicesList
                      withAdd={true}
                      viewSize={width}
                      listKey={Math.random()}
                      title="Fournisseurs de services configurés"
                      data={categoriesConfigure}
                    />
                  </CategoryConfig>
                )}
              {/*
              !fetchFournisseursConfiguresLoading && !fetchSupportPaiementLoading && <SuiviOperation />
              */}
            </>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default DashboardScreen
