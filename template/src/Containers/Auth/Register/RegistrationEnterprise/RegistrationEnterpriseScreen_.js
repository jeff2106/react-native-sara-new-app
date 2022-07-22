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

const RegistrationEnterprise = props => {
  const dispatch = useDispatch()

  const registerLoading = useSelector(state => state.auth.register.loading)

  const [step, setStep] = useState(0)
  const [isDisabledStepOne, setDisabledStepOne] = useState(true)
  const [isDisabledStepTwo, setDisabledStepTwo] = useState(true)
  const [isValidPassword, setValidPassword] = useState(false)

  const [nomEntreprise, setNomEntreprise] = useState('')
  const [emailEntreprise, setEmailEntreprise] = useState('')
  const [countryEntreprise, setCountryEntreprise] = useState('')
  const [isValidEmailEntreprise, setValidEmailEntreprise] = useState(false)
  const [contactEntreprise, setContactEntreprise] = useState('')

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
      nomEntreprise.length > 0 &&
      isValidEmailEntreprise &&
      contactEntreprise.length > 0
    ) {
      setDisabledStepOne(false)
    } else {
      setDisabledStepOne(true)
    }
  }, [
    nomEntreprise,
    emailEntreprise,
    contactEntreprise,
    isValidEmailEntreprise,
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
  const goToIdentificationEntreprise = () => {
    setStep(0)
  }

  const initRegister = () => {
    if (!isValidPassword) {
      showErrorToast('Erreur', 'Les mots de passe ne correspondent pas')
      return
    }
    dispatch(
      RegisterUser.action({
        p_type_acteur: '1',
        p_type_entite: '2',
        p_nom_acteur: nomEntreprise,
        p_nom_acces: nom,
        p_prenom_acces: prenom,
        p_email_acteur: emailEntreprise,
        p_email_acces: email,
        p_contact_acteur: contactEntreprise,
        p_indicatif_pays_entreprise: countryEntreprise.indicatif.slice(1),
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
        title="Enregistrement entreprise"
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
                <Icon name="office-building" color={Colors.white} size={64} />
              </View>
            </View>
            <Text
              style={[
                tailwind('mt-2 font-light text-black text-lg'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Identification de l'entreprise
            </Text>
            <Text
              style={[
                tailwind('font-light text-gray-500 text-base mb-5'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Renseignez les informations relatives à l'entreprise.
            </Text>
            <TextInput
              value={nomEntreprise}
              onChangeText={setNomEntreprise}
              label="Nom de l'entreprise"
              placeholder="Nom de l'entreprise"
              returnKeyType="next"
            />
            <TextInput
              type="email"
              value={emailEntreprise}
              onChangeText={setEmailEntreprise}
              label="Email de l'entreprise"
              placeholder="Email de l'entreprise"
              returnKeyType="next"
              onValidChange={setValidEmailEntreprise}
            />
            <PhoneInput
              value={contactEntreprise}
              onChangeText={setContactEntreprise}
              onCountryChange={setCountryEntreprise}
              label="Contact de l'entreprise"
              placeholder="Contact de l'entreprise"
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
                onPress={goToIdentificationEntreprise}
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

export default RegistrationEnterprise
