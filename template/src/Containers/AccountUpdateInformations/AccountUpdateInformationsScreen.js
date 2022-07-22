import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import TextInput from '@/Components/TextInput'
import { Button, PhoneInput, PickerInput } from '@/Components'
import KeyboardAView from '@/Components/KeyboardAView'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import UpdateParticulier from '@/Store/Auth/UpdateParticulier'

const AccountUpdateInformations = ({ navigation }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)

  const updateParticulierLoading = useSelector(
    state => state.auth.updateParticulier.loading,
  )

  const [userData, setUserData] = useState(user._description)

  useEffect(() => {
    setUserData(user._description)
  }, [user._description])

  const civiliteData = [
    {
      label: 'Monsieur',
      value: 1,
    },
    {
      label: 'Madame',
      value: 2,
    },
    {
      label: 'Mademoiselle',
      value: 3,
    },
  ]

  const [p_genre, setCivilite] = useState(userData?.r_genre)
  const [p_nom, setNom] = useState(userData?.r_nom_particulier)
  const [p_prenom, setPrenom] = useState(userData?.r_prenom_particulier)
  const [p_email, setEmail] = useState(userData?.r_email_particulier)
  const [p_mobile, setPhone] = useState(userData?.r_contact_particulier)
  const [p_code_pays_residence, setCodePays] = useState(
    userData?.r_code_pays_residence,
  )
  const [p_indicatif_pays, setIndicatifPays] = useState(
    userData?.r_indicatif_pays,
  )

  const updateData = () => {
    dispatch(
      UpdateParticulier.action({
        p_session: user?._session,
        p_nom,
        p_prenom,
        p_mobile,
        p_email,
        p_genre,
        p_indicatif_pays,
        p_code_pays_residence,
        p_id_acteur: user?._description?.r_particulier,
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
            'Vos informations ont été mises à jour avec succès',
          )
        }
      }
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Modification des informations"
        hasBack={true}
        navigation={navigation}
      />
      <KeyboardAView>
        <View style={tailwind('flex-1 p-6')}>
          <PickerInput
            label="Civilité"
            placeholder="Civilité"
            value={p_genre}
            options={civiliteData}
            onOptionChange={value => setCivilite(value.value)}
          />
          <TextInput
            value={p_nom}
            onChangeText={setNom}
            label="Nom"
            placeholder="Nom"
            returnKeyType="next"
          />
          <TextInput
            value={p_prenom}
            onChangeText={setPrenom}
            label="Prénoms"
            placeholder="Prénoms"
            returnKeyType="next"
          />
          <TextInput
            value={p_email}
            onChangeText={setEmail}
            label="Adresse e-mail"
            placeholder="Adresse e-mail"
            keyboardType="email-address"
            returnKeyType="next"
            disabled={true}
          />
          <PhoneInput
            defaultCountryCode={p_code_pays_residence}
            value={p_mobile}
            onChangeText={setPhone}
            onCountryChange={selectedCountry => {
              setCodePays(selectedCountry?.code)
              setIndicatifPays(selectedCountry.indicatif?.slice(1))
            }}
            label="Numéro de téléphone"
            placeholder="Numéro de téléphone"
            returnKeyType="next"
          />
          <Button
            loading={updateParticulierLoading}
            disabled={updateParticulierLoading}
            style={tailwind('mt-5')}
            onPress={updateData}
          >
            Sauvegarder
          </Button>
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default AccountUpdateInformations
