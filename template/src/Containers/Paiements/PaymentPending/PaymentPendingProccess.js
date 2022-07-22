import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { Button, EmptyView, ErrorView } from '@/Components'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import { navigateAndSimpleReset, replace } from '@/Navigators/Root'
import FetchPaymentRequest from '@/Store/Impot/FetchPaymentRequest'
import WaitingForPaymentPlaceholder from '@/Containers/Dashboard/WaitingForPayment/sections/WaitingForPaymentPlaceholder'

const PaymentPendingProccess = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [Uri, setUri] = React.useState()
  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const { dataFormDync, data } = route?.params

  const isLoadingGetPaymentRequest = useSelector(
    state => state.impot?.fetchPaymentRequest?.loading,
  )
  const Get_PaymentRequest = useSelector(
    state => state.impot?.R_fetchPaymentRequest,
  )
  const p_param_formulaire_valeur = dataFormDync?._description?.r_champs.find(
    r => r?.r_valeur[0]?.r_payable === true,
  )
  console.log(';:', dataFormDync?._description?.id)

  const FetchPaymentRequests = code => {
    dispatch(
      FetchPaymentRequest.action({
        p_session: user_session,
        p_reference: dataFormDync?.reference_op,
        p_id_formulaire: dataFormDync?._description?.id,
        p_id_declaration: data?.service?.r_formulaire_saisi,
        p_id_service: data?.service?.id_service,
        p_client: r_acteur,
        p_fournisseur: data.configuration?.id_fournisseur,
        p_description: `Paiement initié par l'acteur ( ${user?._description?.r_nom_acteur} )`,
        p_canal: 'Mobile',
        p_param_formulaire_valeur: p_param_formulaire_valeur?.r_valeur,
      }),
    ).then(async r => {
      console.log('=====>', r)
      if (typeof r?.payload?._link !== 'undefined') {
        setUri(await r?.payload?._link)
      } else {
        const text = await r?.payload
        showErrorToast(text)
      }
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

  const reload = () => {
    if (typeof p_param_formulaire_valeur !== 'undefined') {
      FetchPaymentRequests()
    } else {
      showErrorToast('Montant invalide ou inconnu!')
    }
  }
  useEffect(() => {
    if (typeof p_param_formulaire_valeur !== 'undefined') {
      FetchPaymentRequests()
    } else {
      showErrorToast('Montant invalide ou inconnu!')
    }
  }, [])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        navigation={navigation}
        hasBack={true}
        title="En cours de paiement"
      />
      <View style={tailwind('flex-1')}>
        {isLoadingGetPaymentRequest && (
          <View style={tailwind('self-center mt-5')}>
            <WaitingForPaymentPlaceholder />
          </View>
        )}

        {!isLoadingGetPaymentRequest && typeof Uri !== 'undefined' ? (
          <WebView shouldStartLoad={() => true} source={{ uri: `${Uri}` }} />
        ) : (
          !isLoadingGetPaymentRequest && (
            <ErrorView
              onRetryPress={() => reload()}
              errorMessage="Erreur lors de la récupération de l'URL de paiement"
            />
          )
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

export default PaymentPendingProccess
