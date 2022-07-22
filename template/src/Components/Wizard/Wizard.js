import React, { useState, useRef } from 'react'
import { View, FlatList, Animated } from 'react-native'
import Step1 from '@/Components/Wizard/Step1'
import Step2 from '@/Components/Wizard/Step2'
import Step3 from '@/Components/Wizard/Step3'
import { tailwind } from '@/tailwind'
import NextButton from '@/Components/Wizard/NextButton'
import PrevButton from '@/Components/Wizard/PrevButton'
import WizardHeader from '@/Components/Wizard/WizardHeader'

const Wizard = () => {
  const steps = [
    {
      title: 'Identification du contribuable',
      component: <Step1 />,
    },
    {
      title: 'Impôts à déclarer',
      component: <Step2 />,
    },
    {
      title: 'Récapitulatif',
      component: <Step3 />,
    },
    {
      title: 'Terminé',
      component: <Step3 />,
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
    if (currentIndex < steps.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 })
    }
  }

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

      <View style={{ flex: 0.1 }}>
        <View style={tailwind('flex-row p-1 pr-4 pl-4 justify-between')}>
          <View style={tailwind('flex flex-1')}>
            {currentIndex !== 0 && <PrevButton onPress={goToPrev} />}
          </View>
          <View style={tailwind('p-4')} />
          <View style={tailwind('flex flex-1')}>
            <NextButton onPress={goToNext}>Suivant</NextButton>
          </View>
        </View>
      </View>
    </View>
  )
}

Wizard.propTypes = {}

Wizard.defaultProps = {}

export default Wizard
