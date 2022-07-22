import React from 'react'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { useTheme } from '@/Theme'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import SuiviOperationItemPaiement from '@/Containers/Paiements/sections/SuiviOperationItemPaiement'
import { navigate } from '@/Navigators/Root'
import FetchPayment from '@/Store/Impot/FetchPayment'
import FetchPaymentSuccess from '@/Store/Impot/FetchPaymentSuccess'
import FetchPaymentReject from '@/Store/Impot/FetchPaymentReject'
import { useDispatch, useSelector } from 'react-redux'

const SuiviOperationPaiement = ({}) => {
  const { Images } = useTheme()

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session
  const fetchPaymentPendingCount = useSelector(
    state => state.impot.paymentEnattente,
  )
  const fetchPaymentSuccessCount = useSelector(
    state => state.impot.paymentSuccess,
  )
  const fetchPaymentRejectCount = useSelector(
    state => state.impot.paymentReject,
  )

  const fetchPaymentReject = code => {
    dispatch(
      FetchPaymentReject.action({
        user_session: user_session,
        r_acteur: 518,
        p_statut: 2,
      }),
    )
  }

  const fetchPaymentWaiting = code => {
    dispatch(
      FetchPayment.action({
        user_session: user_session,
        r_acteur: 518,
        p_statut: 0,
      }),
    )
  }

  const fetchPaymentSuccess = code => {
    dispatch(
      FetchPaymentSuccess.action({
        user_session: user_session,
        r_acteur: 518,
        p_statut: 1,
      }),
    )
  }

  React.useEffect(() => {
    fetchPaymentSuccess()
    fetchPaymentWaiting()
    fetchPaymentReject()
  }, [])

  return (
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
          title={'Paiement\nDirect'}
          value={fetchPaymentPendingCount?.length}
          color="bg-primary"
          icon={<Icon size={20} color={Colors.white} name="money-bill" />}
          onPress={() => navigate('WaitingForPaymentList')}
        />
        <SuiviOperationItemPaiement
          title={'Paiements\nen attente'}
          value={fetchPaymentRejectCount?.length}
          color="bg-grayDash"
          icon={
            <MaterialCommunityIcons
              size={26}
              color={Colors.white}
              name="reload"
            />
          }
        />
        <SuiviOperationItemPaiement
          title={'Paiements\neffectués'}
          value={fetchPaymentSuccessCount?.length}
          color="bg-green"
          icon={
            <MaterialCommunityIcons
              size={26}
              color={Colors.white}
              name="check-circle"
            />
          }
          onPress={() => navigate('PaymentSucceedListScreen')}
        />
      </View>
    </View>
  )
}

SuiviOperationPaiement.propTypes = {}

SuiviOperationPaiement.defaultProps = {}

export default SuiviOperationPaiement
