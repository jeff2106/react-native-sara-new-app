import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text, Keyboard, Platform } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { navigateAndSimpleReset } from '@/Navigators/Root'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from '@/Components'
import KeyboardAView from '@/Components/KeyboardAView'
import RegisterOTP from '@/Store/Auth/RegisterOTP'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import LoginUser from '@/Store/Auth/LoginUser'
import RNOtpVerify from 'react-native-otp-verify'

const OTPValidation = props => {
  const dispatch = useDispatch()

  const { verificationId, email, password } = props.route.params

  const registerOTPLoading = useSelector(
    state => state.auth.registerOTP.loading,
  )
  const loginLoading = useSelector(state => state.auth.login.loading)

  const [codeOTP, setCodeOTP] = useState('')

  const initLogin = () => {
    dispatch(
      LoginUser.action({
        p_login: email,
        p_mdp: password,
        p_canal: 'MOBILE',
      }),
    ).then(response => {
      if (response.meta && response.meta.requestStatus === 'rejected') {
        showErrorToast('Erreur', response?.payload?.message)
      } else if (response.meta && response.meta.requestStatus === 'fulfilled') {
        if (response.payload?._status === 1) {
          navigateAndSimpleReset('Tab')
        } else {
          showErrorToast(
            'Erreur',
            "Erreur inconnue lors de la connexion, veuillez réessayer depuis l'écran de connexion",
          )
        }
      }
    })
  }

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
      RegisterOTP.action({
        p_id_otp: verificationId,
        p_code: code,
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
            'La vérification de votre compte a été effectuée avec succès',
          )
          initLogin()
        }
      }
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Validation OTP"
        hasBack={true}
        navigation={props.navigation}
      />
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
              disabled={!registerOTPLoading || !loginLoading}
              loading={registerOTPLoading || loginLoading}
            >
              Terminer
            </Button>
          </View>
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default OTPValidation
