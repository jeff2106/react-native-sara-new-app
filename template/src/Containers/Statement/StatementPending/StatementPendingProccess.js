import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { Button, EmptyView } from '@/Components'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import { navigateAndSimpleReset, replace } from '@/Navigators/Root'
import FetchPaymentRequest from '@/Store/Impot/FetchPaymentRequest'
import WaitingForPaymentPlaceholder from '@/Containers/Dashboard/WaitingForPayment/sections/WaitingForPaymentPlaceholder'

const StatementPendingProccess = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [Uri, setUri] = React.useState()
  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const isLoadingGetPaymentRequest = useSelector(
    state => state.impot?.fetchPaymentRequest?.loading,
  )
  const GetPaymentRequest = useSelector(
    state => state.impot?.R_fetchPaymentRequest,
  )


  const FetchPaymentRequests = code => {
    dispatch(
      FetchPaymentRequest.action({
        p_session: user_session,
        reference: route?.params?.data?.r_reference,
      }),
    ).then(async r => {
      setUri(await r?.payload?._link)
    })
  }

  /*
  const FetchPaymentRequests = code => {
      dispatch(
        FetchPaymentRequest.action({
          p_session: user_session,
          reference: '7G6JC1',
        }),
      )
    }
  */

  useEffect(() => {
    FetchPaymentRequests()
  }, [])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        navigation={navigation}
        hasBack={true}
        title="En cours de paiement"
      />
      <View style={tailwind('flex-1')}>
        {isLoadingGetPaymentRequest && <WaitingForPaymentPlaceholder />}

        {!isLoadingGetPaymentRequest && typeof Uri !== 'undefined' ? (
          <WebView shouldStartLoad={() => true} source={{ uri: `${Uri}` }} />
        ) : (
          !isLoadingGetPaymentRequest && <Text />
        )}
      </View>

      <View style={[tailwind('p-4  ')]}>
        <Button
          onPress={() => navigation.goBack()}
          disabled={isLoadingGetPaymentRequest}
        >
          Fermer
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default StatementPendingProccess
