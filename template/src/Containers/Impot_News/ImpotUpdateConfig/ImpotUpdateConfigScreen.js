import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { Button, NavBar } from '@/Components'
import SelectionImpotUpdate from '@/Containers/Impot_News/ImpotUpdateConfig/sections/SelectionImpotUpdate'
import UpdateConfig from '@/Store/Impot/UpdateConfig'
import { showErrorToast } from '@/Components/Alert'
import FetchFournisseursConfigures from '@/Store/Auth/FetchFournisseursConfigures'
import { replace } from '@/Navigators/Root'

const ImpotUpdateConfigScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const configuration = JSON.parse(route.params.data)

  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const updateConfigLoading = useSelector(
    state => state.impot.updateConfig.loading,
  )
  const fetchFournisseursConfiguresLoading = useSelector(
    state => state.auth.fetchFournisseursConfigures.loading,
  )

  const [impotSelected, setImpotSelected] = useState(configuration.r_service)

  const updateConfiguration = () => {
    dispatch(
      UpdateConfig.action({
        p_session: user_session,
        p_client: r_acteur,
        p_fournisseur: configuration.r_fournisseur.id,
        p_param_formulaire_saisi_service: impotSelected,
      }),
    ).then(response => {
      if (response.meta && response.meta.requestStatus === 'rejected') {
        if (response.payload && response.payload.message) {
          showErrorToast('Erreur', response?.payload?.message)
        } else {
          showErrorToast('Erreur', 'Erreur inconnue, veuillez réessayer')
        }
      } else if (response.meta && response.meta.requestStatus === 'fulfilled') {
        //
        dispatch(
          FetchFournisseursConfigures.action({
            session: user_session,
            acteur: r_acteur,
          }),
        ).then(() => {
          replace('ImpotUpdateConfigDone')
        })
      }
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        hasBack={true}
        title="Modifier la configuration"
        navigation={navigation}
      />
      <View style={[tailwind('flex-1 w-full bg-white mt-0')]}>
        <SelectionImpotUpdate
          fournisseur={configuration?.r_fournisseur}
          value={impotSelected}
          isVisible={false}
          onDataChange={setImpotSelected}
        />
      </View>
      <View style={tailwind('p-2 pl-4 pr-4')}>
        <Button
          disabled={updateConfigLoading || fetchFournisseursConfiguresLoading}
          loading={updateConfigLoading || fetchFournisseursConfiguresLoading}
          onPress={updateConfiguration}
        >
          Sauvegarder les modifications
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default ImpotUpdateConfigScreen
