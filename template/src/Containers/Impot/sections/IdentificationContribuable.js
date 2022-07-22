import React, { useEffect, useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'
import { ButtonText, ErrorView, KeyboardAView } from '@/Components'
import { navigate } from '@/Navigators/Root'
import { useDispatch, useSelector } from 'react-redux'
import SelectionImpotPlaceholder from '@/Containers/Impot/sections/SelectionImpotPlaceholder'
import DynamicForm from '@/Components/DynamicForm'
import FetchFournisseurConfigForm from '@/Store/Form/FetchFournisseurConfigForm'

const IdentificationContribuable = ({ fournisseur, onDataChange }) => {
  const { width } = useWindowDimensions()
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const fetchFournisseurConfigFormData = useSelector(state => state.form.item)
  const fetchFournisseurConfigFormLoading = useSelector(
    state => state.form.fetchFournisseurConfigForm.loading,
  )
  const fetchFournisseurConfigFormError = useSelector(
    state => state.form.fetchFournisseurConfigForm.error,
  )

  const fetchData = () => {
    dispatch(
      FetchFournisseurConfigForm.action({
        acteur: fournisseur.id,
        session: user_session,
        client: r_acteur,
      }),
    )
  }

  const [fields, setFields] = useState([])

  const onFieldChange = value => {
    setFields(value)
    onDataChange(value)
  }

  useEffect(() => {
    if (
      fetchFournisseurConfigFormData &&
      fetchFournisseurConfigFormData.r_champ
    ) {
      setFields(fetchFournisseurConfigFormData.r_champ)
      onDataChange(fetchFournisseurConfigFormData.r_champ)
    }
  }, [fetchFournisseurConfigFormData])

  useEffect(() => {
    fetchData()
  }, [])

  const goToDemandeNTD = () => {
    navigate('ImpotDemandeNTD')
  }

  return (
    <View style={[tailwind('flex-1 p-4 w-full'), { width }]}>
      <KeyboardAView>
        {fetchFournisseurConfigFormLoading && <SelectionImpotPlaceholder />}
        {!fetchFournisseurConfigFormLoading &&
          fetchFournisseurConfigFormError && (
            <ErrorView
              errorMessage="Erreur lors de la récupération du formulaire, veuillez réessayer"
              onRetryPress={fetchData}
            />
          )}
        {!fetchFournisseurConfigFormLoading &&
          !fetchFournisseurConfigFormError &&
          fetchFournisseurConfigFormData && (
            <DynamicForm onDataChange={onFieldChange} fields={fields} />
          )}
        <Text
          style={[
            tailwind('text-sm text-center mt-5'),
            { fontFamily: 'Gilroy-Regular' },
          ]}
        >
          Vous n'avez pas de numéro de télédéclarant (NTD) ?
        </Text>
        <ButtonText onPress={goToDemandeNTD}>
          Faire une demande de NTD
        </ButtonText>
      </KeyboardAView>
    </View>
  )
}

IdentificationContribuable.propTypes = {}

IdentificationContribuable.defaultProps = {}

export default IdentificationContribuable
