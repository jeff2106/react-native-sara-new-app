import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import TextInput from '@/Components/TextInput'
import { Button, ButtonText } from '@/Components'
import { navigate } from '@/Navigators/Root'
import KeyboardAView from '@/Components/KeyboardAView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { default as Image } from 'react-native-fast-image'
import { useTheme } from '@/Theme'
import ResetPasswordInit from '@/Store/Auth/ResetPasswordInit'
import { showErrorToast } from '@/Components/Alert'
import ResetPasswordVerifOTP from '@/Store/Auth/ResetPasswordVerifOTP'
import ResetPasswordModifPassword from '@/Store/Auth/ResetPasswordModifPassword'
import RNOtpVerify from 'react-native-otp-verify'

const ForgotPassword = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { Images } = useTheme()

  const { userEmail } = route.params

  const resetPasswordInitLoading = useSelector(
    state => state.auth.resetPasswordInit.loading,
  )
  const resetPasswordVerifOTPLoading = useSelector(
    state => state.auth.resetPasswordVerifOTP.loading,
  )
  const resetPasswordModifPasswordLoading = useSelector(
    state => state.auth.resetPasswordModifPassword.loading,
  )

  const [step, setStep] = useState(0)
  const [email, setEmail] = useState(userEmail)
  const [isValidEmail, setValidEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [otpId, setOtpId] = useState()
  const [codeOtp, setCodeOtp] = useState()
  const [accesId, setAccesId] = useState('')

  const goToOTPForm = () => {
    setStep(1)
  }

  const goToPasswordReset = () => {
    setStep(2)
  }

  const goToSuccess = () => {
    setStep(3)
  }

  const onCodeComplete = (code, idOtp) => {
    initVerifPasswordOTP(code, idOtp)
  }

  const otpHandler = message => {
    console.debug(message)
    const otp = /(\d{5})/g.exec(message)[1]
    if (otp) {
      setCodeOtp(otp)
      RNOtpVerify.removeListener()
    }
  }

  useEffect(() => {
    if (otpId && codeOtp?.length === 5) {
      onCodeComplete(codeOtp, otpId)
    }
  }, [otpId, codeOtp])

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

  const initResetPassword = () => {
    dispatch(ResetPasswordInit.action({ p_login: email })).then(response => {
      if (response.meta && response.meta.requestStatus === 'rejected') {
        if (response.payload && response.payload.message) {
          showErrorToast('Erreur', response?.payload?.message)
        } else {
          showErrorToast('Erreur', 'Erreur inconnue, veuillez réessayer')
        }
      } else if (response.meta && response.meta.requestStatus === 'fulfilled') {
        if (response.payload?._status === 1) {
          setOtpId(response.payload._description)
          goToOTPForm()
        }
      }
    })
  }

  const initVerifPasswordOTP = (code, idOtp) => {
    dispatch(
      ResetPasswordVerifOTP.action({ p_id_otp: idOtp, p_code: code }),
    ).then(response => {
      if (response.meta && response.meta.requestStatus === 'rejected') {
        if (response.payload && response.payload.message) {
          showErrorToast('Erreur', response?.payload?.message)
        } else {
          showErrorToast('Erreur', 'Erreur inconnue, veuillez réessayer')
        }
      } else if (response.meta && response.meta.requestStatus === 'fulfilled') {
        if (response.payload?._status === 1) {
          setAccesId(response.payload._description)
          goToPasswordReset()
        }
      }
    })
  }

  const initModifPassword = () => {
    if (
      password.length < 0 ||
      passwordConfirm.length < 0 ||
      password.localeCompare(passwordConfirm) !== 0
    ) {
      showErrorToast('Erreur', 'Les mots de passe ne correspondent pas')
      return
    }

    dispatch(
      ResetPasswordModifPassword.action({
        p_idacces: accesId,
        p_mdp: password,
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
          goToSuccess()
        }
      }
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Mot de passe oublié"
        hasBack={true}
        navigation={navigation}
      />
      <KeyboardAView>
        {step !== 3 && (
          <View style={tailwind('justify-center items-center mb-6')}>
            <View
              style={tailwind(
                'h-24 w-24 rounded-full bg-primary items-center justify-center',
              )}
            >
              <Icon name="lock" color={Colors.white} size={60} />
            </View>
          </View>
        )}
        {step === 0 && (
          <View style={tailwind('flex-1 p-6')}>
            <Text
              style={[
                tailwind(' font-light text-gray-500 text-base mb-5'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Entrez votre adresse e-mail, nous vous enverrons un code OTP de
              validation pour la réinitialisation de votre mot de passe.
            </Text>
            <TextInput
              onChangeText={setEmail}
              label="Adresse e-mail"
              placeholder="Adresse e-mail"
              keyboardType="email-address"
              type="email"
              returnKeyType="next"
              value={email}
              onValidChange={setValidEmail}
            />
            <View style={tailwind('flex-row mt-5')}>
              <ButtonText
                onPress={() => navigation.goBack()}
                iconLeft="chevron-left"
              >
                Retour
              </ButtonText>
              <View style={tailwind('m-2')} />
              <Button
                style={tailwind('flex-1')}
                loading={resetPasswordInitLoading}
                disabled={!isValidEmail || resetPasswordInitLoading}
                onPress={initResetPassword}
              >
                Suivant
              </Button>
            </View>
          </View>
        )}
        {step === 1 && (
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
              code={codeOtp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={setCodeOtp}
              keyboardType="numeric"
              autoFocusOnLoad={true}
              codeInputFieldStyle={tailwind(
                'bg-white rounded-md border-2 flex-row items-center border-gray-300 text-black flex-grow',
              )}
              codeInputHighlightStyle={tailwind(
                'bg-white rounded-md border-2 flex-row items-center border-primary flex-grow',
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
                disabled={!resetPasswordVerifOTPLoading}
                loading={resetPasswordVerifOTPLoading}
              >
                Terminer
              </Button>
            </View>
          </View>
        )}
        {step === 2 && (
          <View style={tailwind('flex-1 p-6')}>
            <Text
              style={[
                tailwind(' font-light text-gray-500 text-base mb-5'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Entrez votre nouveau mot de passe
            </Text>
            <TextInput
              onChangeText={setPassword}
              label="Mot de passe"
              placeholder="Mot de passe"
              returnKeyType="next"
              value={password}
              type="password"
            />
            <TextInput
              onChangeText={setPasswordConfirm}
              label="Mot de passe (confirmation)"
              placeholder="Mot de passe (confirmation)"
              returnKeyType="next"
              value={passwordConfirm}
              type="password"
            />
            <View style={tailwind('flex-row mt-5')}>
              <ButtonText
                onPress={() => navigate('Login')}
                iconLeft="chevron-left"
              >
                Retour
              </ButtonText>
              <View style={tailwind('m-2')} />
              <Button
                style={tailwind('flex-1')}
                loading={resetPasswordModifPasswordLoading}
                disabled={
                  !password ||
                  !passwordConfirm ||
                  resetPasswordModifPasswordLoading
                }
                onPress={initModifPassword}
              >
                Suivant
              </Button>
            </View>
          </View>
        )}
        {step === 3 && (
          <View style={tailwind('flex-1 p-4')}>
            <View
              style={[
                tailwind('w-full p-4 rounded-md bg-white'),
                { elevation: 1 },
              ]}
            >
              <View style={tailwind('items-center justify-center mt-5')}>
                <Image
                  style={tailwind('w-32 h-32')}
                  source={Images.done}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    tailwind(
                      'font-light text-gray-500 text-base mb-12 mt-12 text-center',
                    ),
                    { fontFamily: 'Gilroy-SemiBold' },
                  ]}
                >
                  Votre mot de passe a été modifié avec succès. Vous pouvez vous
                  connecter depuis l'écran de connexion
                </Text>
                <View style={tailwind('mt-5 mb-5 flex-row')}>
                  <Button onPress={() => navigate('Login')}>Terminer</Button>
                </View>
              </View>
            </View>
          </View>
        )}
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default ForgotPassword
