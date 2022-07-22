import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import TextInput from '@/Components/TextInput'
import { Button } from '@/Components'
import KeyboardAView from '@/Components/KeyboardAView'
import UpdatePassword from '@/Store/Auth/UpdatePassword'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import { navigateAndSimpleReset } from '@/Navigators/Root'

const AccountUpdatePassword = ({ navigation }) => {
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [validationMessage, setValidationMessage] = useState('')

  const user = useSelector(state => state.auth.item)
  const { r_acces, r_login } = user._description || {}
  const user_session = user?._session

  const updatePasswordLoading = useSelector(
    state => state.auth.updatePassword.loading,
  )

  useEffect(() => {
    if (newPasswordConfirm?.length > 0 && password.length > 0) {
      if (newPassword?.length >= 6 && newPasswordConfirm?.length >= 6) {
        if (newPassword?.localeCompare(newPasswordConfirm) === 0) {
          setIsValidPassword(true)
          setValidationMessage(undefined)
        } else {
          setIsValidPassword(false)
          setValidationMessage('Les mots de passe ne corespondent pas')
        }
      } else {
        setIsValidPassword(false)
        setValidationMessage(
          'La longueur minimale autorisée pour le mot de passe est de six (6) caractères.',
        )
      }
    } else {
      setIsValidPassword(false)
    }
  }, [newPassword, newPasswordConfirm])

  const initUpdatePassword = () => {
    dispatch(
      UpdatePassword.action({
        p_session: user_session,
        p_login: r_login,
        p_id_acces: r_acces,
        p_mdp_old: password,
        p_mdp_new: newPasswordConfirm,
      }),
    ).then(response => {
      if (response.meta && response.meta.requestStatus === 'rejected') {
        if (response.payload && response.payload.message) {
          showErrorToast('Erreur', response?.payload?.message)
        } else {
          showErrorToast(
            'Erreur',
            'Erreur lors de la mise à jour de votre mot de passe',
          )
        }
      } else if (response.meta && response.meta.requestStatus === 'fulfilled') {
        if (response.payload?._status === 1) {
          showSucessToast(
            'Succès',
            'Votre mot de passe a été modifié avec succès',
          )
          navigateAndSimpleReset('Auth')
        }
      }
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Modification du mot de passe"
        hasBack={true}
        navigation={navigation}
      />
      <KeyboardAView>
        <View style={tailwind('flex-1 p-6')}>
          <TextInput
            onChangeText={setPassword}
            value={password}
            label="Ancien mot de passe"
            placeholder="Ancien mot de passe"
            returnKeyType="next"
            type="password"
          />
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            label="Nouveau mot de passe"
            placeholder="Mot de passe"
            returnKeyType="next"
            type="password"
          />
          <TextInput
            value={newPasswordConfirm}
            onChangeText={setNewPasswordConfirm}
            label="Confirmation du mot de passe"
            placeholder="Mot de passe (confirmation)"
            returnKeyType="done"
            type="password"
          />
          {!isValidPassword && (
            <Text style={[tailwind('text-xs font-medium mt-1 text-red-600')]}>
              {validationMessage}
            </Text>
          )}
          <Button
            style={tailwind('mt-5')}
            loading={updatePasswordLoading}
            disabled={updatePasswordLoading || !isValidPassword}
            onPress={initUpdatePassword}
          >
            Sauvegarder
          </Button>
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default AccountUpdatePassword
