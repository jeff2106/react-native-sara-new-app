import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text, Keyboard, Platform } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { replace } from '@/Navigators/Root'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from '@/Components'
import KeyboardAView from '@/Components/KeyboardAView'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import RNOtpVerify from 'react-native-otp-verify'
import VerifDeclarationOTP from '@/Store/Impot/VerifDeclarationOTP'

const DeclarationOTP = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { verificationId, session } = route.params

  const verifDeclarationOTPLoading = useSelector(
    state => state.impot.verifDeclarationOTP.loading,
  )

  const [codeOTP, setCodeOTP] = useState('')

  const otpHandler = message => {
    const otp = /(\d{5})/g.exec(message)[1]
    if (otp) {
      setCodeOTP(otp)
      RNOtpVerify.removeListener()
    }
  }

  useEffect(() => {
    if (codeOTP?.length === 5) {
      onCodeComplete(codeOTP)
    }
  }, [codeOTP])

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return
    }

    RNOtpVerify.getHash().then(console.log).catch(console.log)

    RNOtpVerify.getOtp()
      .then(p => {
        RNOtpVerify.addListener(otpHandler)
      })
      .catch(p => console.log(p))

    return () => RNOtpVerify.removeListener()
  }, [])

  const onCodeComplete = code => {
    dispatch(
      VerifDeclarationOTP.action({
        p_session: session,
        p_id_otp: verificationId,
        p_code: codeOTP,
      }),
    ).then(response => {
      if (response.meta && response.meta.requestStatus === 'rejected') {
        if (response.payload && response.payload.message) {
          showErrorToast('Erreur', response?.payload?.message)
        } else {
          showErrorToast('Erreur', 'Erreur inconnue, veuillez réessayer')
        }
      } else if (response.meta && response.meta.requestStatus === 'fulfilled') {
        if (response.payload?._status === 1) {
          showSucessToast(
            'Succès',
            'Votre déclaration a été sauvegardée avec succès',
          )
          replace('DeclarationDone')
        }
      }
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar title="Validation OTP" hasBack={true} navigation={navigation} />
      <KeyboardAView>
        <View style={tailwind('flex-1 p-6')}>
          <Text
            style={[
              tailwind('mt-2 font-light text-gray-500 text-base mb-5'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Un Code OTP de validation a été envoyé à votre adresse email et
            votre numéro de téléphone, merci de le renseigner pour continuer.
          </Text>

          <OTPInputView
            style={tailwind('w-full h-12')}
            pinCount={5}
            code={codeOTP}
            onCodeChanged={setCodeOTP}
            keyboardType="numeric"
            autoFocusOnLoad={true}
            codeInputFieldStyle={tailwind(
              'bg-white rounded-md border-2 flex-row items-center border-gray-300 text-black flex-grow font-bold',
            )}
            codeInputHighlightStyle={tailwind(
              'bg-white rounded-md border-2 flex-row items-center border-primary flex-grow font-bold',
            )}
            onCodeFilled={() => Keyboard.dismiss()}
          />

          <View
            style={tailwind(
              'flex-row mt-8 justify-center items-center flex-wrap',
            )}
          >
            <Text
              style={[
                tailwind('text-xs text-gray-500'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Vous n'avez pas reçu de code ?
            </Text>
            <Text> </Text>
            <TouchableOpacity>
              <Text
                style={[
                  tailwind('text-xs text-primary'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                Renvoyer le code
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={tailwind(
              'flex-row mt-8 justify-center items-center flex-wrap',
            )}
          >
            <Button
              disabled={!verifDeclarationOTPLoading}
              loading={verifDeclarationOTPLoading}
            >
              Terminer
            </Button>
          </View>
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default DeclarationOTP
