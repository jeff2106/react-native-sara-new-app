import React, { useState, useRef, useEffect } from 'react'
import { View, FlatList, Animated } from 'react-native'
import { tailwind } from '@/tailwind'
import NextButton from '@/Components/Wizard/NextButton'
import PrevButton from '@/Components/Wizard/PrevButton'
import WizardHeader from '@/Components/Wizard/WizardHeader'
import { useDispatch, useSelector } from 'react-redux'
import Presentation from '@/Containers/Impot_News/DeclarationWizard/sections/Presentation'
import Formulaire from '@/Containers/Impot_News/DeclarationWizard/sections/Formulaire'
import FetchFormDeclaration from '@/Store/Impot/FetchFormDeclaration'
import Previsualisation from '@/Containers/Impot_News/DeclarationWizard/sections/Previsualisation'
import SaveFormDeclaration from '@/Store/Impot/SaveFormDeclaration'
import { replace } from '@/Navigators/Root'
import { showErrorToast } from '@/Components/Alert'

const DeclarationWizard = ({ service, configuration }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const saveFormDeclarationLoading = useSelector(
    state => state.impot.saveFormDeclaration.loading,
  )
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const [idFormulaire, setIdFormulaire] = useState()
  const [fields, setFields] = useState([])
  const [validation, setValidation] = useState(false)
  const [isValidForm, setValidForm] = useState(false)
  //console.log("configuration?.r_fournisseur?.id ===> ",configuration,idFormulaire,service?.id,service?.id_service,service?.id_fournisseur)
  const fetchFormData = () => {
    console.debug('user_session : ', user_session)
    dispatch(
      FetchFormDeclaration.action({
        service: service?.id_service,
        session: user_session,
        acteur: r_acteur,
      }),
    ).then(response => {
      if (response.meta && response.meta.requestStatus === 'fulfilled') {
        if (response.payload && response.payload.length > 0) {
          setFields([...response.payload[0]?.r_champs])
          setIdFormulaire(response.payload[0]?.id_formulaire)
        } else {
          setFields([])
        }
      }
    })
  }

  const saveFormData = () => {
    dispatch(
      SaveFormDeclaration.action({
        session: user_session,
        id_formulaire: idFormulaire ?? 0,
        id_client: r_acteur,
        id_acteur: service?.id_fournisseur,
        id_impot_adeclarer: service?.id,
        fields: fields,
      }),
    ).then(response => {
      if (response.meta && response.meta.requestStatus === 'fulfilled') {
        if (response.payload) {
          replace('DeclarationOTP', {
            verificationId: response.payload,
            session: user_session,
          })
        }
      } else if (response.meta && response.meta.requestStatus === 'rejected') {
        if (response.payload && response.payload.message) {
          showErrorToast('Erreur', response?.payload?.message)
        } else {
          showErrorToast('Erreur', 'Erreur inconnue, veuillez réessayer')
        }
      }
    })
  }

  const onFieldChange = value => {
    setFields(value)
  }

  const WizardControl = () => (
    <View>
      {currentIndex !== 3 && (
        <View style={tailwind('flex-row justify-between')}>
          <View style={tailwind('flex flex-1')}>
            {currentIndex !== 0 && <PrevButton onPress={goToPrev} />}
          </View>
          <View style={tailwind('p-4')} />
          <View style={tailwind('flex flex-1')}>
            <NextButton
              onPress={goToNext}
              isLoading={saveFormDeclarationLoading}
              isDisabled={!isValid()}
            >
              {currentIndex === 2 ? 'Soumettre' : 'Suivant'}
            </NextButton>
          </View>
        </View>
      )}
    </View>
  )

  const steps = [
    {
      title: 'Présentation',
      component: (
        <Presentation
          configuration={configuration}
          service={service}
          control={<WizardControl />}
        />
      ),
    },
    {
      title: 'Formulaire',
      component: (
        <Formulaire
          service={service}
          configuration={configuration}
          fetchData={fetchFormData}
          fields={fields}
          onFieldChange={onFieldChange}
          control={<WizardControl />}
        />
      ),
    },
    {
      title: 'Prévisualisation',
      component: (
        <Previsualisation
          service={service}
          configuration={configuration}
          fields={fields}
          validation={validation}
          onValidationChange={setValidation}
          control={<WizardControl />}
        />
      ),
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollX = useRef(new Animated.Value(0)).current
  const slideRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const goToPrev = () => {
    if (currentIndex > 0) {
      slideRef.current.scrollToIndex({ index: currentIndex - 1 })
    }
  }

  const goToNext = () => {
    if (currentIndex <= steps.length - 1) {
      if (currentIndex === 2) {
        saveFormData()
        return
      }
      slideRef.current.scrollToIndex({ index: currentIndex + 1 })
    }
  }

  const formValidation = () => {
    let valid = true
    fields.forEach(field => {
      if (field?.r_obligatoire) {
        if (
          field?.r_valeur === null ||
          field.r_valeur === undefined ||
          field?.r_valeur?.length <= 0
        ) {
          valid = false
        }
      }
      if (field.r_type === 'monetaire') {
        if (
          field.r_valeur_min !== null &&
          parseInt(field?.r_valeur, 10) < field?.r_valeur_min
        ) {
          valid = false
        }
        if (
          field.r_valeur_max !== null &&
          parseInt(field?.r_valeur, 10) > field?.r_valeur_max
        ) {
          valid = false
        }
      }
    })
    setValidForm(valid)
  }

  const isValid: boolean = () => {
    switch (currentIndex) {
      case 0:
        return true
      case 1:
        return isValidForm
      case 2:
        return validation
      default:
        return true
    }
  }

  useEffect(() => {
    formValidation()
  }, [fields])

  useEffect(() => {
    fetchFormData()
  }, [])

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
    </View>
  )
}

DeclarationWizard.propTypes = {}

DeclarationWizard.defaultProps = {}

export default DeclarationWizard
