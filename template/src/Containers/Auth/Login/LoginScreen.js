import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import TextInput from '@/Components/TextInput'
import { Button, ButtonText } from '@/Components'
import { navigate, navigateAndSimpleReset } from '@/Navigators/Root'
import KeyboardAView from '@/Components/KeyboardAView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import LoginUser from '@/Store/Auth/LoginUser'
import { showErrorToast } from '@/Components/Alert'
import ResetLogin from '@/Store/Auth/ResetLogin'
import { Checkbox } from 'native-base'
import SetEmail from '@/Store/Auth/SetEmail'

const Login = ({ navigation }) => {
  const dispatch = useDispatch()

  const loginLoading = useSelector(state => state.auth.login.loading)
  const savedEmail = useSelector(state => state.auth.email)

  useEffect(() => {
    dispatch(ResetLogin.action())
  }, [])

  const [rememberMe, setRememberMe] = useState(!!savedEmail)
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState(savedEmail || '')
  const [isValidEmail, setValidEmail] = useState(false)
  const [password, setPassword] = useState('')

  const goToEmail = () => {
    setStep(0)
  }

  const goToPassword = () => {
    setStep(1)
  }

  const goToForgotPassword = () => {
    navigate('ForgotPassword', { userEmail: email })
  }

  const initLogin = () => {
    if (rememberMe) {
      dispatch(SetEmail.action({ email }))
    } else {
      dispatch(SetEmail.action({ email: '' }))
    }

    dispatch(
      LoginUser.action({
        p_login: email,
        p_mdp: password,
        p_canal: 'MOBILE',
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
          navigateAndSimpleReset('Tab')
        } else {
          showErrorToast('Erreur', 'Erreur inconnue, veuillez réessayer.')
        }
      }
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar title="Connexion" hasBack={true} navigation={navigation} />
      <KeyboardAView>
        <View style={tailwind('justify-center items-center mb-6')}>
          <View
            style={tailwind(
              'h-24 w-24 rounded-full bg-primary items-center justify-center',
            )}
          >
            <Icon name="lock" color={Colors.white} size={56} />
          </View>
        </View>
        {step === 0 && (
          <View style={tailwind('flex-1 p-6')}>
            <Text
              style={[
                tailwind(' font-light text-gray-700 text-xl mb-5'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Connectez-vous pour profiter de nos services.
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
                disabled={!isValidEmail}
                onPress={goToPassword}
              >
                Suivant
              </Button>
            </View>
          </View>
        )}
        {step === 1 && (
          <View style={tailwind('flex-1 p-6')}>
            <View style={tailwind('mb-5 flex-row flex-wrap')}>
              <Text
                style={[
                  tailwind(' font-light text-gray-500 text-base'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                Entrez le mot de passe pour l'adresse{' '}
                <Text
                  style={[
                    tailwind(' font-light font-bold text-primary text-base'),
                    { fontFamily: 'Gilroy-Bold' },
                  ]}
                >
                  {' '}
                  {email}{' '}
                </Text>
                <Text
                  style={[
                    tailwind(' font-light text-gray-500 text-base'),
                    { fontFamily: 'Gilroy-Regular' },
                  ]}
                >
                  pour vous connecter.
                </Text>
              </Text>
            </View>
            <TextInput
              type="password"
              value={password}
              onChangeText={setPassword}
              label="Mot de passe"
              placeholder="Mot de passe"
              returnKeyType="done"
              max={50}
            />
            <View style={tailwind('flex flex-row items-center mt-2 mb-5')}>
              <Checkbox
                value={rememberMe}
                isChecked={rememberMe}
                accessibilityLabel="OK"
                colorScheme="primary"
                onChange={() => setRememberMe(!rememberMe)}
              />
              <Text
                style={[
                  tailwind('flex-1 text-sm ml-1 text-gray-500'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                Se souvenir de moi
              </Text>
            </View>
            <View style={tailwind('flex-1 justify-end')}>
              <TouchableOpacity onPress={goToForgotPassword}>
                <Text
                  style={[
                    tailwind(
                      'text-right font-light text-primary text-sm mt-1 mb-2',
                    ),
                    { fontFamily: 'Gilroy-Bold' },
                  ]}
                >
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tailwind('flex-row mt-5')}>
              <ButtonText onPress={goToEmail} iconLeft="chevron-left">
                Retour
              </ButtonText>
              <View style={tailwind('m-2')} />
              <Button
                style={tailwind('flex-1')}
                loading={loginLoading}
                disabled={loginLoading || !password}
                onPress={initLogin}
              >
                Se connecter
              </Button>
            </View>
          </View>
        )}
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default Login
