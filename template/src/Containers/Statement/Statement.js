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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import { default as FlatList } from '@/Components/FlatList'
import HomeBar from '@/Containers/Home/sections/HomeBar'
import FetchCategory from '@/Store/Category/FetchCategory'
import SuiviOperation from '@/Containers/Dashboard/sections/SuiviOperation'
import SuiviOperationItemPaiement from '@/Containers/Paiements/sections/SuiviOperationItemPaiement'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FetchDeclarationsPending from '@/Store/Statement/statement_getPending'
import FetchDeclarationsHorsDelai from '@/Store/Statement/statement_getRejected'
import FetchDeclarationsSucceed from '@/Store/Statement/statement_getSucceed'

const Statement = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.item)
  const Loading = useSelector(
    state => state.Statement.getStatementSucceed.loading,
  )
  const { r_acteur } = user._description || {}
  const user_session = user?._session
  const [countSucceed, setCountSucceed] = useState(0)
  const [countHorsDelai, setCountHorsDelai] = useState(0)
  const [countPending, setCountPending] = useState(0)

  const fetchDataDeclarationHorsDelai = () => {
    dispatch(
      FetchDeclarationsHorsDelai.action({
        p_session: user_session,
        p_id_acteur: r_acteur,
        p_date_debut: '*',
        p_date_fin: '*',
        p_id_fournisseur: 0,
        p_categorie_fournisseur: 0,
      }),
    ).then(r => {
      setCountHorsDelai(r.payload.length)
    })
  }

  const fetchDataPending = () => {
    dispatch(
      FetchDeclarationsPending.action({
        p_session: user_session,
        p_id_acteur: r_acteur,
        p_date_debut: '*',
        p_date_fin: '*',
        p_id_fournisseur: 0,
        p_categorie_fournisseur: 0,
      }),
    ).then(r => {
      setCountPending(r.payload.length)
    })
  }

  const fetchDeclarationsSucceed = () => {
    dispatch(
      FetchDeclarationsSucceed.action({
        p_session: user_session,
        p_id_acteur: r_acteur,
        p_date_debut: '*',
        p_date_fin: '*',
        p_id_fournisseur: 0,
        p_categorie_fournisseur: 0,
      }),
    ).then(r => {
      setCountSucceed(r.payload.length)
    })
  }

  useEffect(() => {
    fetchDataDeclarationHorsDelai()
    fetchDataPending()
    fetchDeclarationsSucceed()
  }, [])

  const reload = () => {
    fetchDataDeclarationHorsDelai()
    fetchDataPending()
    fetchDeclarationsSucceed()
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
            Mes déclaration
          </Text>
          <View style={[tailwind('w-full rounded-md bg-blueGray mb-8 p-4')]}>
            <SuiviOperationItemPaiement
              title={'Déclarations\nen attente'}
              value={countPending ?? 0}
              color="bg-grayDash"
              icon={
                <MaterialCommunityIcons
                  size={26}
                  color={Colors.white}
                  name="reload"
                />
              }
              onPress={() => navigate('StatementPendingScreen')}
            />
            <SuiviOperationItemPaiement
              title={'Déclarations\nhors délais'}
              value={countHorsDelai ?? 0}
              color="bg-primary"
              icon={<AntDesign size={20} color={Colors.white} name="warning" />}
              onPress={() => navigate('TransactionOutOfTimeScreen')}
            />

            <SuiviOperationItemPaiement
              title={'Déclarations\neffectués'}
              value={countSucceed ?? 0}
              color="bg-green"
              icon={
                <MaterialCommunityIcons
                  size={26}
                  color={Colors.white}
                  name="check-circle"
                />
              }
              onPress={() => navigate('StatementSuccedScreen')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Statement
