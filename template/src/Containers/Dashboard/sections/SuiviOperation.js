import React from 'react'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { useTheme } from '@/Theme'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import SuiviOperationItem from '@/Containers/Dashboard/sections/SuiviOperationItem'
import { navigate } from '@/Navigators/Root'
import FetchPayment from '@/Store/Impot/FetchPayment'
import FetchPaymentSuccess from '@/Store/Impot/FetchPaymentSuccess'
import FetchPaymentReject from '@/Store/Impot/FetchPaymentReject'
import { useDispatch, useSelector } from 'react-redux'

const SuiviOperation = ({onUpdate}) => {
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
        r_acteur: r_acteur,
        p_statut: 2,
      }),
    )
  }

  const fetchPaymentWaiting = code => {
    dispatch(
      FetchPayment.action({
        user_session: user_session,
        r_acteur: r_acteur,
        p_statut: 0,
      }),
    )
  }

  const fetchPaymentSuccess = code => {
    dispatch(
      FetchPaymentSuccess.action({
        user_session: user_session,
        r_acteur: r_acteur,
        p_statut: 1,
      }),
    )
  }

  React.useEffect(() => {
    fetchPaymentSuccess()
    fetchPaymentWaiting()
    fetchPaymentReject()
  }, [ onUpdate && onUpdate])

  return (
    <View style={[tailwind('w-full rounded-md bg-blueGray mb-8 p-4')]}>
      <Text
        style={[
          tailwind('font-bold text-xl mb-4'),
          { fontFamily: 'Gilroy-Bold' },
        ]}
      >
        Suivi des opérations
      </Text>
      <SuiviOperationItem
        title={'En attente\nde paiement'}
        value={fetchPaymentPendingCount?.length}
        color="bg-primary"
        icon={<Icon size={20} color={Colors.white} name="money-bill" />}
        onPress={() => navigate('WaitingForPaymentList')}
      />

      {/*
          <SuiviOperationItem
          title={"En attente\nd'approbation"}
          value={0}
          color="bg-yellowSky"
          icon={
            <MaterialCommunityIcons
              size={26}
              color={Colors.white}
              name="playlist-check"
            />
            }
          />
       */}
      <SuiviOperationItem
        title={'Paiements\nterminés'}
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
      <SuiviOperationItem
        title={'Paiements\néchoués'}
        value={fetchPaymentRejectCount?.length}
        color="bg-error"
        icon={
          <MaterialCommunityIcons size={26} color={Colors.white} name="close" />
        }
      />
    </View>
  )
}

SuiviOperation.propTypes = {}

SuiviOperation.defaultProps = {}

export default SuiviOperation
