import React, { useState, useRef, useEffect } from 'react'
import { View, FlatList, Animated } from 'react-native'
import { tailwind } from '@/tailwind'
import NextButton from '@/Components/Wizard/NextButton'
import PrevButton from '@/Components/Wizard/PrevButton'
import WizardHeader from '@/Components/Wizard/WizardHeader'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorToast } from '@/Components/Alert'
import SaveConfigForm from '@/Store/Form/SaveConfigForm'
import { Config } from '@/Config'
import { isEmpty } from 'lodash'
import Terminer from '@/Containers/AddBankAccount/sections/Terminer'
import FormulaireMobileMoney from '@/Containers/AddMobileMoney/sections/FormulaireMobileMoney'
import Recapitulatif from '@/Containers/AddMobileMoney/sections/Recapitulatif'

const Wizard = ({ data }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const saveConfigFormLoading = useSelector(
    state => state.form.saveConfigForm.loading,
  )

  const [mobileMoney, setMobileMoney] = useState({})

  const onDataChange = (cle, value) => {
    const newCarteCredit = { ...mobileMoney }
    newCarteCredit[cle] = value
    setMobileMoney(newCarteCredit)
  }

  const onMultipleDataChange = values => {
    const newCompteBancaire = { ...mobileMoney }
    setMobileMoney({ ...newCompteBancaire, ...values })
  }

  const steps = [
    {
      title: 'Informations moyen de paiement',
      component: (
        <FormulaireMobileMoney
          data={mobileMoney}
          onMultipleDataChange={onMultipleDataChange}
          onDataChange={onDataChange}
        />
      ),
    },
    {
      title: 'Récapitulatif',
      component: <Recapitulatif data={mobileMoney} />,
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
        /*if (isEmpty(carteCredit.r_type_carte)) {
          return false
        }
        if (isEmpty(carteCredit.r_nom_prenoms)) {
          return false
        }
        if (
          carteCredit?.r_type_carte?.r_code === 'VISA'
            ? !REG_CARTE_VISA.test(carteCredit.r_numero_carte)
            : !REG_CARTE_MASTERCARD.test(carteCredit.r_numero_carte)
        ) {
          return false
        }
        if (!REG_NUMERO_CVV.test(carteCredit.r_numero_cvv)) {
          return false
        }
        if (!REG_DATE_LIMITE.test(carteCredit.r_date_limite)) {
          return false
        }*/
        return true
      default:
        return true
    }
  }

  useEffect(() => {
    isValid()
  }, [mobileMoney])

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
