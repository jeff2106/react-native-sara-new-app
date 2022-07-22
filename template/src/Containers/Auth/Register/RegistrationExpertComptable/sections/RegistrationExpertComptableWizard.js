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
import { navigate, navigateAndSimpleReset } from '@/Navigators/Root'
import ExpertComptableStep1 from '@/Containers/Auth/Register/RegistrationExpertComptable/sections/ExpertComptableStep1'
import ExpertComptableStep2 from '@/Containers/Auth/Register/RegistrationExpertComptable/sections/ExpertComptableStep2'
import moment from 'moment'

const RegistrationExpertComptableWizard = () => {
  const dispatch = useDispatch()

  const registerLoading = useSelector(state => state.auth.register.loading)

  const [value, setValue] = useState({})

  const onDataChange = change => {
    setValue(change)
  }

  const steps = [
    {
      icon: 'account',
      title: "Identification de l'expert",
      component: (
        <ExpertComptableStep1 data={value} onDataChange={onDataChange} />
      ),
    },
    {
      icon: 'office-building',
      title: 'Identification du cabinet',
      component: (
        <ExpertComptableStep2 data={value} onDataChange={onDataChange} />
      ),
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
          value.p_civilite !== undefined &&
          value.p_nom &&
          value.p_prenom &&
          isValidEmail(value.p_email) &&
          value.p_contact &&
          new Date().getFullYear() -
            new Date(value.p_date_naissance).getFullYear() >=
            21
        )
      case 1:
        return !!(
          value.p_numero_compte &&
          value.p_raison_sociale &&
          value.p_localisation
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
          p_type_acteur: 6,
          p_nom_acteur: value.p_raison_sociale,
          p_email_acteur: value.p_email,
          p_contact_acteur: value.p_contact,
          p_indicatif_pays_acteur: value.p_indicatif_pays,
          p_code_pays_acteur: value.p_code_pays,
          p_nom_acces: value.p_nom,
          p_prenom_acces: value.p_prenom,
          p_email_acces: value.p_email,
          p_contact_acces: value.p_contact,
          p_indicatif_pays: value.p_indicatif_pays,
          p_code_pays: value.p_code_pays,
          p_date_naissance: moment(value.p_date_naissance).format('DD/MM/YYYY'),
          p_genre: value.p_civilite,
          p_raison_social: value.p_raison_sociale,
          p_localisation: value.p_localisation,
          p_numero_compte: value.p_numero_compte,
          p_procuration_url: 'OK',
          p_type_piece: 0,
          p_mdp_acces: '',
          p_sigle: '',
          p_forme_juridique: '',
          p_numero_contribuable: '',
          p_numero_rcm: '',
          p_numepiece: '',
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
          navigateAndSimpleReset('RegistrationExpertComptableDone')
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

RegistrationExpertComptableWizard.propTypes = {}

RegistrationExpertComptableWizard.defaultProps = {}

export default RegistrationExpertComptableWizard
