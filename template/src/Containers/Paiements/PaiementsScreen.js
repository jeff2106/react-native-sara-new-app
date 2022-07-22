import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Dimensions,
} from 'react-native'
import { tailwind } from '@/tailwind'
import { navigate } from '@/Navigators/Root'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Colors } from '@/Theme/Variables'
import HomeBar from '@/Containers/Home/sections/HomeBar'
import { useTheme } from '@/Theme'
import SuiviOperationItemPaiement from '@/Containers/Paiements/sections/SuiviOperationItemPaiement'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FetchPaymentSuccess from '@/Store/Payment/PendingCountTransaction'
import CountPaymentPending from '@/Store/Payment/get_count_payment_pending2'
import TransacCompleted from '@/Store/Payment/Payment'

const PaiementsScreen = ({ navigation }) => {
  const { Images } = useTheme()

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session
  const Loading = useSelector(
    state => state.TransacPayment.getItemsCountPaymentPending.loading,
  )
  const [countSucceed, setCountSucceed] = useState([])
  const [countPending, setCountPending] = useState([])

  const fetchDatasuccess = () => {
    dispatch(
      FetchPaymentSuccess.action({
        p_session: user_session,
        p_id_acteur: r_acteur,
        p_statut: '*',
        p_id_fournisseur: 0,
        p_date_debut: 0,
        p_date_fin: 0,
      }),
    ).then(r => {
      //console.log('bine', r)
      let Tab = []
      for (const item in r.payload) {
        Tab.push(r.payload[item].r_param)
      }
      setCountSucceed(Tab[0].length)
    })
  }
  const CountDeclarationsSucceedData = () => {
    dispatch(
      CountPaymentPending.action({
        p_session: user_session,
        p_id_acteur: r_acteur,
        p_date_debut: '*',
        p_date_fin: '*',
        p_id_fournisseur: 0,
        p_categorie_fournisseur: 0,
      }),
    ).then(r => {
      setCountPending(r.payload?.length)
    })
  }

  useEffect(() => {
    fetchDatasuccess()
    CountDeclarationsSucceedData()
  }, [])

  const reload = () => {
    fetchDatasuccess()
    CountDeclarationsSucceedData()
  }
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <HomeBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tailwind('flex-1')}
        refreshControl={
          <RefreshControl refreshing={Loading} onRefresh={reload} />
        }
      >
        <View style={[tailwind('w-full  p-4')]}>
          <Text
            style={[
              tailwind('font-bold text-xl mb-4'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Mes paiements
          </Text>
          <View style={[tailwind('w-full rounded-md bg-blueGray mb-8 p-4')]}>
            <SuiviOperationItemPaiement
              title={'Paiements\nDirect'}
              value={0}
              color="bg-primary"
              icon={
                <FontAwesome5
                  size={20}
                  color={Colors.white}
                  name="money-bill"
                />
              }
              onPress={() => navigate('DirectPayment')}
            />
            <SuiviOperationItemPaiement
              title={'Paiements\nen attente'}
              value={countPending ?? 0}
              color="bg-grayDash"
              icon={
                <MaterialCommunityIcons
                  size={26}
                  color={Colors.white}
                  name="reload"
                />
              }
              onPress={() => navigate('PaymentPendingScreen')}
            />
            <SuiviOperationItemPaiement
              title={'Paiements\neffectués'}
              value={countSucceed ?? 0}
              color="bg-green"
              icon={
                <MaterialCommunityIcons
                  size={26}
                  color={Colors.white}
                  name="check-circle"
                />
              }
              onPress={() => navigate('PaymentSuccedScreen')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PaiementsScreen
