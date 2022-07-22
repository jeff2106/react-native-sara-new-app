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
} from 'react-native'
import { tailwind } from '@/tailwind'
import { navigate } from '@/Navigators/Root'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import Accordion from 'react-native-collapsible/Accordion'
import AddItem from '@/Containers/PaymentMethod/sections/AddItem'
import PaymentMethodPlaceholder from '@/Containers/PaymentMethod/sections/PaymentMethodPlaceholder'
import FetchTypeMoyenPaiement from '@/Store/PaymentMethod/FetchTypeMoyenPaiement'
import FetchSupportPaiement from '@/Store/PaymentMethod/FetchSupportPaiement'
import SupportPaymentItem from '@/Containers/PaymentMethod/sections/SupportPaymentItem'
import HomeBar from '@/Containers/Home/sections/HomeBar'
import { Config } from '@/Config'

const PaymentMethodScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const typeMoyenPaiement = useSelector(state => state.paymentMethod.item)
  const typeMoyenPaiementLoading = useSelector(
    state => state.paymentMethod.fetchTypeMoyenPaiement.loading,
  )
  const typeMoyenPaiementError = useSelector(
    state => state.paymentMethod.fetchTypeMoyenPaiement.error,
  )
  const supportPaiement = useSelector(
    state => state.paymentMethod.supportPaiements,
  )

  const [typeMoyenPayments, setTypeMoyenPayments] = useState([])

  useEffect(() => {
    if (typeMoyenPaiement) {
      setTypeMoyenPayments(typeMoyenPaiement)
    }
  }, [typeMoyenPaiement])

  useEffect(() => {
    if (supportPaiement) {
      let newTypeMoyenPaiements = []
      let tempTypeMoyenPaiements = typeMoyenPayments.slice()
      tempTypeMoyenPaiements.forEach(tMoyenPaiement => {
        let filterResult = supportPaiement.filter(
          item =>
            tMoyenPaiement.id ===
            item.r_moyen_paiement.r_type_moyen_paiement.id,
        )
        newTypeMoyenPaiements.push({ ...tMoyenPaiement, items: filterResult })
      })
      setTypeMoyenPayments(newTypeMoyenPaiements)
    }
  }, [supportPaiement])

  const fetchData = () => {
    dispatch(FetchTypeMoyenPaiement.action()).then(() =>
      dispatch(FetchSupportPaiement.action({ id: r_acteur })),
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [activeSections, setActiveSections] = useState([])

  const addPaymentMethod = content => {
    switch (content.r_code) {
      case Config.CODE_COMPTE_BANCAIRE:
        navigate('AddBankAccount', { data: JSON.stringify(content) })
        break
      case Config.CODE_CARTE_BANCAIRE:
        navigate('AddCreditCard')
        break
      case Config.CODE_MOBILE_MONEY:
        navigate('AddMobileMoney', { data: JSON.stringify(content) })
        break
    }
  }

  const renderHeader = (content, index, isActive) => (
    <View
      style={[
        tailwind(
          'flex-row w-full p-4 rounded-md bg-blueGray items-center justify-between mt-2',
        ),
      ]}
    >
      <View style={tailwind('flex-1 flex-row items-center mr-2')}>
        <Image
          source={{ uri: content.r_image_url }}
          style={tailwind('h-12 w-12 mr-2')}
          resizeMode="contain"
        />
        <Text
          numberOfLines={1}
          style={[tailwind('text-base'), { fontFamily: 'Gilroy-Bold' }]}
        >
          {content.r_libelle}
        </Text>
        <View
          style={tailwind(
            'ml-2 bg-white rounded-full items-center justify-center',
          )}
        >
          <Text
            style={[
              tailwind(
                'text-primary p-1 pr-2 pl-2 font-bold text-xs text-center',
              ),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {content.items ? content.items.length : 0}
          </Text>
        </View>
      </View>

      <View style={tailwind('flex-row items-center')}>
        <View
          style={[tailwind('rounded-full bg-gray-400'), { marginStart: 10 }]}
        >
          {!isActive && (
            <Icon
              color={Colors.white}
              name="chevron-down"
              style={{ margin: 2 }}
              size={16}
            />
          )}
          {isActive && (
            <Icon
              color={Colors.white}
              name="chevron-up"
              style={{ margin: 2 }}
              size={16}
            />
          )}
        </View>
      </View>
    </View>
  )

  const renderContent = (content, index, isActive) => {
    return (
      <>
        {content.items &&
          content.items.map(item => {
            return <SupportPaymentItem key={item.id} {...item} />
          })}
        <AddItem item={content} onPress={() => addPaymentMethod(content)} />
      </>
    )
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <HomeBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tailwind('flex-1')}
        refreshControl={
          <RefreshControl
            refreshing={typeMoyenPaiementLoading}
            onRefresh={fetchData}
          />
        }
      >
        <View style={tailwind('flex-1 p-4')}>
          <Text
            style={[
              tailwind('font-bold text-xl mb-4'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Moyens de paiement
          </Text>
          {typeMoyenPaiementLoading && <PaymentMethodPlaceholder />}
          {!typeMoyenPaiementLoading && typeMoyenPayments && (
            <Accordion
              sections={typeMoyenPayments}
              activeSections={activeSections}
              renderSectionTitle={() => <View />}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={setActiveSections}
              touchableComponent={TouchableOpacity}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PaymentMethodScreen
