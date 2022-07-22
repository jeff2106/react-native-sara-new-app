import React, { useState, useRef, useEffect } from 'react'
import { View, FlatList, Animated } from 'react-native'
import { tailwind } from '@/tailwind'
import NextButton from '@/Components/Wizard/NextButton'
import PrevButton from '@/Components/Wizard/PrevButton'
import WizardHeader from '@/Components/Wizard/WizardHeader'
import IdentificationContribuable from '@/Containers/Impot/sections/IdentificationContribuable'
import SelectionImpot from '@/Containers/Impot/sections/SelectionImpot'
import Recapitulatif from '@/Containers/Impot/sections/Recapitulatif'
import Terminer from '@/Containers/Impot/sections/Terminer'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorToast } from '@/Components/Alert'
import SaveConfigForm from '@/Store/Form/SaveConfigForm'

const Wizard = ({ data }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const saveConfigFormLoading = useSelector(
    state => state.form.saveConfigForm.loading,
  )

  const fetchFournisseurConfigFormData = useSelector(state => state.form.item)

  const [configuration, setConfiguration] = useState([])
  const [impotSelected, setImpotSelected] = useState([])

  const onIdentificationChange = value => {
    setConfiguration(value)
  }

  const onSelectImpotChange = value => {
    setImpotSelected(value)
  }

  const steps = [
    {
      icon: 'card-account-details',
      title: 'Identification du contribuable',
      component: (
        <IdentificationContribuable
          fournisseur={data}
          onDataChange={onIdentificationChange}
        />
      ),
    },
    {
      icon: 'format-list-checks',
      title: 'Impôts à déclarer',
      component: (
        <SelectionImpot
          fournisseur={data}
          value={impotSelected}
          onValueChange={onSelectImpotChange}
        />
      ),
    },
    {
      icon: 'clipboard-list',
      title: 'Récapitulatif',
      component: (
        <Recapitulatif
          impotSelected={impotSelected}
          configuration={configuration}
        />
      ),
    },
    {
      icon: 'check-all',
      title: 'Terminer',
      component: <Terminer />,
    },
  ]

  //TODO: Rediriger vers l'écran de service après avoir recupérer la liste des config

  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollX = useRef(new Animated.Value(0)).current
  const slideRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const saveData = () => {
    let dataToSave = {
      founisseurId: data.id,
      acteurId: r_acteur,
      r_services: [],
      r_parametres: [],
    }

    Object.values(configuration).map(parametre =>
      dataToSave.r_parametres.push(parametre),
    )
    impotSelected.forEach(service => dataToSave.r_services.push(service))

    dispatch(
      SaveConfigForm.action({
        p_session: user_session,
        p_formulaire: fetchFournisseurConfigFormData.id_formulaire,
        p_client: r_acteur,
        p_fournisseur: data.id,
        p_param_formulaire_valeur: dataToSave.r_parametres,
        p_param_formulaire_saisi_service: dataToSave.r_services,
      }),
    ).then(response => {
      if (response.meta && response.meta.requestStatus === 'rejected') {
        if (response.payload && response.payload.message) {
          showErrorToast('Erreur', response?.payload?.message)
        } else {
          showErrorToast('Erreur', 'Erreur inconnue, veuillez réessayer')
        }
      } else if (response.meta && response.meta.requestStatus === 'fulfilled') {
        slideRef.current.scrollToIndex({ index: currentIndex + 1 })
      }
    })
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      slideRef.current.scrollToIndex({ index: currentIndex - 1 })
    }
  }

  const goToNext = () => {
    if (currentIndex < steps.length - 1) {
      if (currentIndex === 2) {
        saveData()
        return
      }
      slideRef.current.scrollToIndex({ index: currentIndex + 1 })
    }
  }

  const isValidForm = (fields: Array) => {
    /*if (fields.length <= 0) {
      return false
    }
    /*fields.forEach(field => {
      if (field.r_obligatoire) {
        if (field.r_valeur === undefined || field.r_valeur.length <= 0) {
          return false
        }
      }
    })*/
    return true
  }

  const isValid: boolean = () => {
    switch (currentIndex) {
      case 0:
        console.debug('isValidForm :', isValidForm(configuration))
        return isValidForm(configuration)
      case 1:
        return impotSelected.length > 0
      default:
        return true
    }
  }

  useEffect(() => {
    isValid()
  }, [configuration, impotSelected])

  useEffect(() => {
    isValid()
  }, [fetchFournisseurConfigFormData])

  return (
    <View style={tailwind('flex-1 justify-center w-full')}>
      <View style={{ flex: 1 }}>
        <WizardHeader current={currentIndex} data={steps} />
        <FlatList
          horizontal={true}
          data={steps}
          renderItem={({ item }) => item.component}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          onViewableItemsChanged={viewableItemsChanged}
          ref={slideRef}
        />
      </View>

      {currentIndex !== 3 && (
        <View style={tailwind('flex-row p-1 pr-4 pl-4 pb-2 justify-between')}>
          <View style={tailwind('flex flex-1')}>
            {currentIndex !== 0 && <PrevButton onPress={goToPrev} />}
          </View>
          <View style={tailwind('p-4')} />
          <View style={tailwind('flex flex-1')}>
            <NextButton
              onPress={goToNext}
              isLoading={saveConfigFormLoading}
              isDisabled={!isValid()}
            >
              {currentIndex === 2 ? 'Soumettre' : 'Suivant'}
            </NextButton>
          </View>
        </View>
      )}
    </View>
  )
}

Wizard.propTypes = {}

Wizard.defaultProps = {}

export default Wizard
