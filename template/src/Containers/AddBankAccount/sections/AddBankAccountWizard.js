import React, { useState, useRef, useEffect } from 'react'
import { View, FlatList, Animated } from 'react-native'
import { tailwind } from '@/tailwind'
import NextButton from '@/Components/Wizard/NextButton'
import PrevButton from '@/Components/Wizard/PrevButton'
import WizardHeader from '@/Components/Wizard/WizardHeader'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorToast } from '@/Components/Alert'
import SaveConfigForm from '@/Store/Form/SaveConfigForm'
import FormulaireCompteBancaire from '@/Containers/AddBankAccount/sections/FormulaireCompteBancaire'
import { isEmpty } from 'lodash'
import { Config } from '@/Config'
import Recapitulatif from '@/Containers/AddBankAccount/sections/Recapitulatif'
import Terminer from '@/Containers/AddBankAccount/sections/Terminer'

const Wizard = ({ data }) => {
  const dispatch = useDispatch()

  const REG_CODE_BANK = new RegExp(Config.REG_CODE_BANK)
  const REG_CODE_AGENCE = new RegExp(Config.REG_CODE_AGENCE)
  const REG_NUMERO_COMPTE = new RegExp(Config.REG_NUMERO_COMPTE)
  const REG_CLE_RIB = new RegExp(Config.REG_CLE_RIB)

  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const saveConfigFormLoading = useSelector(
    state => state.form.saveConfigForm.loading,
  )

  const [compteBancaire, setCompteBancaire] = useState({})

  const onDataChange = (cle, value) => {
    const newCompteBancaire = { ...compteBancaire }
    newCompteBancaire[cle] = value
    setCompteBancaire(newCompteBancaire)
  }

  const onMultipleDataChange = values => {
    const newCompteBancaire = { ...compteBancaire }
    setCompteBancaire({ ...newCompteBancaire, ...values })
  }

  const steps = [
    {
      title: 'Informations moyen de paiement',
      component: (
        <FormulaireCompteBancaire
          data={compteBancaire}
          onMultipleDataChange={onMultipleDataChange}
          onDataChange={onDataChange}
        />
      ),
    },
    {
      title: 'Récapitulatif',
      component: <Recapitulatif data={compteBancaire} />,
    },
    {
      icon: 'check-all',
      title: 'Terminer',
      component: <Terminer />,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollX = useRef(new Animated.Value(0)).current
  const slideRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const saveData = () => {
    let dataToSave = {
      acteurId: r_acteur,
    }

    dispatch(
      SaveConfigForm.action({
        p_session: user_session,
        p_client: r_acteur,
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

  const isValid: boolean = () => {
    switch (currentIndex) {
      case 0:
        if (isEmpty(compteBancaire.r_pays)) {
          return false
        }
        if (isEmpty(compteBancaire.r_banque)) {
          return false
        }
        if (isEmpty(compteBancaire.r_intitule)) {
          return false
        }
        if (!REG_CODE_BANK.test(compteBancaire.r_code_banque)) {
          return false
        }
        if (!REG_CODE_AGENCE.test(compteBancaire.r_code_agence)) {
          return false
        }
        if (!REG_NUMERO_COMPTE.test(compteBancaire.r_numero_compte)) {
          return false
        }
        if (!REG_CLE_RIB.test(compteBancaire.r_cle_rib)) {
          return false
        }
        return true
      default:
        return true
    }
  }

  useEffect(() => {
    isValid()
  }, [compteBancaire])

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

      {currentIndex !== 2 && (
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
              {currentIndex === 1 ? 'Soumettre' : 'Suivant'}
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
