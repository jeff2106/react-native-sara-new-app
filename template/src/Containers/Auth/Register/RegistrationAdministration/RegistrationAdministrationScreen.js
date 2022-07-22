import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import TextInput from '@/Components/TextInput'
import { Button, ButtonText, PhoneInput } from '@/Components'
import { navigate } from '@/Navigators/Root'
import KeyboardAView from '@/Components/KeyboardAView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import RegisterUser from '@/Store/Auth/RegisterUser'

const RegistrationAdministration = props => {
  const dispatch = useDispatch()

  const registerLoading = useSelector(state => state.auth.register.loading)

  const [step, setStep] = useState(0)
  const [isDisabledStepOne, setDisabledStepOne] = useState(true)
  const [isDisabledStepTwo, setDisabledStepTwo] = useState(true)
  const [isValidPassword, setValidPassword] = useState(false)

  const [nomAdministration, setNomAdministration] = useState('')
  const [emailAdministration, setEmailAdministration] = useState('')
  const [isValidEmailAdministration, setValidEmailAdministration] =
    useState(false)
  const [contactAdministration, setContactAdministration] = useState('')
  const [countryAdministration, setCountryAdministration] = useState('')

  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [isValidEmail, setValidEmail] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  useEffect(() => {
    if (
      password.length > 0 &&
      passwordConfirm.length > 0 &&
      password.localeCompare(passwordConfirm) === 0
    ) {
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
  }, [password, passwordConfirm])

  useEffect(() => {
    if (
      nomAdministration.length > 0 &&
      isValidEmailAdministration &&
      contactAdministration.length > 0
    ) {
      setDisabledStepOne(false)
    } else {
      setDisabledStepOne(true)
    }
  }, [
    nomAdministration,
    emailAdministration,
    contactAdministration,
    isValidEmailAdministration,
  ])

  useEffect(() => {
    if (
      nom.length > 0 &&
      prenom.length > 0 &&
      isValidEmail &&
      phone.length > 0 &&
      password.length > 0 &&
      passwordConfirm.length > 0
    ) {
      setDisabledStepTwo(false)
    } else {
      setDisabledStepTwo(true)
    }
  }, [nom, prenom, email, phone, password, passwordConfirm, isValidEmail])

  const goToIdentificationGestionnaire = () => {
    setStep(1)
  }
  const goToIdentificationAdministration = () => {
    setStep(0)
  }

  const initRegister = () => {
    if (!isValidPassword) {
      showErrorToast('Erreur', 'Les mots de passe ne correspondent pas')
      return
    }
    dispatch(
      RegisterUser.action({
        p_type_entite: '3',
        p_type_acteur: '1',
        p_nom_acteur: nomAdministration,
        p_nom_acces: nom,
        p_prenom_acces: prenom,
        p_email_acteur: emailAdministration,
        p_email_acces: email,
        p_contact_acteur: contactAdministration,
        p_indicatif_pays_administration:
          countryAdministration.indicatif.slice(1),
        p_contact_acces: phone,
        p_indicatif_pays: country.indicatif.slice(1),
        p_mdp_acces: password,
        p_date_naissance: '11/11/1111',
        p_code_pays: country.code,
        p_sigle: '',
        p_raison_social: '',
        p_forme_juridique: '',
        p_numero_contribuable: '',
        p_numero_rcm: '',
        p_type_piece: '0',
        p_genre: '0',
        p_numepiece: '',
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
          showSucessToast('Succès', 'Enregistrement effectué avec succès')
          navigate('OTPValidation', {
            verificationId: response.payload?._description,
            email,
            password,
          })
        }
      }
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <NavBar
        title="Enregistrement adminstration"
        hasBack={true}
        navigation={props.navigation}
      />
      <KeyboardAView>
        {step === 0 && (
          <View style={tailwind('flex-1 p-6 pt-0')}>
            <View style={tailwind('justify-center items-center mb-6')}>
              <View
                style={tailwind(
                  'h-28 w-28 rounded-full bg-primary bg-opacity-80 items-center justify-center',
                )}
              >
                <Icon name="home-city" color={Colors.white} size={64} />
              </View>
            </View>
            <Text
              style={[
                tailwind('mt-2 font-light text-black text-lg'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Identification de l'administration
            </Text>
            <Text
              style={[
                tailwind('font-light text-gray-500 text-base mb-5'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Renseignez les informations relatives à l'administration publique.
            </Text>
            <TextInput
              value={nomAdministration}
              onChangeText={setNomAdministration}
              label="Nom de l'administration"
              placeholder="Nom de l'administration"
              returnKeyType="next"
            />
            <TextInput
              value={emailAdministration}
              onChangeText={setEmailAdministration}
              label="Email de l'administration"
              placeholder="Email de l'administration"
              returnKeyType="next"
              type="email"
              onValidChange={setValidEmailAdministration}
            />
            <PhoneInput
              value={contactAdministration}
              onChangeText={setContactAdministration}
              onCountryChange={setCountryAdministration}
              label="Contact de l'administration"
              placeholder="Contact de l'administration"
              returnKeyType="done"
            />
            <Button
              disabled={isDisabledStepOne}
              onPress={goToIdentificationGestionnaire}
            >
              Suivant
            </Button>
          </View>
        )}
        {step === 1 && (
          <View style={tailwind('flex-1 p-6 pt-0')}>
            <View style={tailwind('justify-center items-center mb-6')}>
              <View
                style={tailwind(
                  'h-28 w-28 rounded-full bg-primary bg-opacity-80 items-center justify-center',
                )}
              >
                <Icon name="account" color={Colors.white} size={64} />
              </View>
            </View>
            <Text
              style={[
                tailwind('mt-2 font-light text-black text-lg'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Identification de l'administrateur
            </Text>
            <Text
              style={[
                tailwind('font-light text-gray-500 text-base mb-5'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Renseignez les informations relatives à l'administrateur du
              compte.
            </Text>
            <TextInput
              value={nom}
              onChangeText={setNom}
              label="Nom"
              placeholder="Nom"
              returnKeyType="next"
            />
            <TextInput
              value={prenom}
              onChangeText={setPrenom}
              label="Prénoms"
              placeholder="Prénoms"
              returnKeyType="next"
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              label="Adresse e-mail"
              placeholder="Adresse e-mail"
              keyboardType="email-address"
              type="email"
              returnKeyType="next"
              onValidChange={setValidEmail}
            />
            <PhoneInput
              value={phone}
              onChangeText={setPhone}
              onCountryChange={setCountry}
              label="Numéro de téléphone"
              placeholder="Numéro de téléphone"
              keyboardType="number-pad"
              returnKeyType="next"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              label="Mot de passe"
              placeholder="Mot de passe"
              returnKeyType="next"
              secureTextEntry={true}
            />
            <TextInput
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              label="Mot de passe (confirmation)"
              placeholder="Mot de passe (confirmation)"
              returnKeyType="done"
              secureTextEntry={true}
            />
            <View style={tailwind('flex-row')}>
              <ButtonText
                onPress={goToIdentificationAdministration}
                iconLeft="chevron-left"
              >
                Retour
              </ButtonText>
              <View style={tailwind('m-2')} />
              <Button
                disabled={isDisabledStepTwo || registerLoading}
                style={tailwind('mb-2')}
                onPress={initRegister}
              >
                Suivant
              </Button>
            </View>
          </View>
        )}
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default RegistrationAdministration
