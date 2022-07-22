import React, { useState, useRef, useEffect } from 'react'
import { View, FlatList, Animated } from 'react-native'
import { tailwind } from '@/tailwind'
import NextButton from '@/Components/Wizard/NextButton'
import PrevButton from '@/Components/Wizard/PrevButton'
import WizardHeader from '@/Components/Wizard/WizardHeader'
import { isValidEmail } from '@/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorToast } from '@/Components/Alert'
import RegisterUser from '@/Store/Auth/RegisterUser'
import { navigateAndSimpleReset } from '@/Navigators/Root'
import EntrepriseStep1 from '@/Containers/Auth/Register/RegistrationEnterprise/sections/EntrepriseStep1'
import EntrepriseStep2 from '@/Containers/Auth/Register/RegistrationEnterprise/sections/EntrepriseStep2'
import moment from 'moment'

const RegistrationEntrepriseWizard = ({ data }) => {
  const dispatch = useDispatch()

  const registerLoading = useSelector(state => state.auth.register.loading)

  const [value, setValue] = useState({})

  const onDataChange = change => {
    setValue(change)
  }

  const steps = [
    {
      icon: 'account',
      title: "Identification de l'entreprise",
      component: <EntrepriseStep1 data={value} onDataChange={onDataChange} />,
    },
    {
      icon: 'lock',
      title: "Identification de l'administrateur",
      component: <EntrepriseStep2 data={value} onDataChange={onDataChange} />,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollX = useRef(new Animated.Value(0)).current
  const slideRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const isValid: boolean = () => {
    switch (currentIndex) {
      case 0:
        return !!(
          isValidEmail(value.p_email_acteur) &&
          value.p_contact_acteur &&
          value.p_raison_social &&
          value.p_localisation &&
          value.file
        )
      case 1:
        return !!(
          value.p_genre !== undefined &&
          value.p_nom_acces &&
          value.p_prenom_acces &&
          value.p_date_naissance &&
          value.p_contact_acces &&
          isValidEmail(value.p_email_acces)
        )
      default:
        return true
    }
  }

  const initRegister = () => {
    dispatch(
      RegisterUser.action({
        registerData: {
          p_type_entite: 2,
          p_type_acteur: 1,
          p_nom_acteur: value.p_raison_social,
          p_email_acteur: value.p_email_acteur,
          p_contact_acteur: value.p_contact_acteur,
          p_indicatif_pays_acteur: value.p_indicatif_pays_acteur,
          p_code_pays_acteur: value.p_code_pays_acteur,
          p_nom_acces: value.p_nom_acces,
          p_prenom_acces: value.p_prenom_acces,
          p_email_acces: value.p_email_acces,
          p_contact_acces: value.p_contact_acces,
          p_indicatif_pays: value.p_indicatif_pays,
          p_code_pays: value.p_code_pays,
          p_date_naissance: moment(value.p_date_naissance).format('DD/MM/YYYY'),
          p_genre: value.p_genre,
          p_raison_social: value.p_raison_social,
          p_localisation: value.p_localisation,
          p_procuration_url: '',
          p_type_piece: 0,
          p_mdp_acces: '',
          p_sigle: '',
          p_forme_juridique: '',
          p_numero_contribuable: '',
          p_numero_rcm: '',
          p_numepiece: '',
          p_numero_compte: '',
        },
        file: value.file,
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
          navigateAndSimpleReset('RegistrationEntrepriseDone')
        }
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
      slideRef.current.scrollToIndex({ index: currentIndex + 1 })
    }
    if (currentIndex === 1) {
      initRegister()
    }
  }

  useEffect(() => {
    isValid()
  }, [value])

  return (
    <View style={tailwind('flex-1 justify-center w-full')}>
      <View style={{ flex: 1 }}>
        <WizardHeader current={currentIndex} data={steps} />
        <FlatList
          horizontal={true}
          data={steps}
          renderItem={({ item }) => item.component}
          showsVerticalScrollIndicator={false}
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
        <View
          style={[
            { flex: 0.11 },
            tailwind('flex-row p-1 pr-4 pl-4 pb-2 justify-between'),
          ]}
        >
          <View style={tailwind('flex flex-1')}>
            {currentIndex !== 0 && <PrevButton onPress={goToPrev} />}
          </View>
          <View style={tailwind('p-4')} />
          <View style={tailwind('flex flex-1')}>
            <NextButton
              onPress={goToNext}
              isDisabled={!isValid()}
              isLoading={registerLoading}
            >
              {currentIndex === 1 ? 'Soumettre' : 'Suivant'}
            </NextButton>
          </View>
        </View>
      )}
    </View>
  )
}

RegistrationEntrepriseWizard.propTypes = {}

RegistrationEntrepriseWizard.defaultProps = {}

export default RegistrationEntrepriseWizard
