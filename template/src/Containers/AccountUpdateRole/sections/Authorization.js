import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@/Theme'
import { Colors } from '@/Theme/Variables'
import Accordion from 'react-native-collapsible/Accordion'
import { Checkbox } from 'native-base'
import { Button } from '@/Components'

const Authorization = ({ data, onUpdate, navigation }) => {
  const { Images } = useTheme()

  const [modules, setModules] = useState(data)
  const [activeSections, setActiveSections] = useState([])
  const [isAllSelected, setAllSelected] = useState(false)

  const onModuleSelect = (isSelected, module, index) => {
    let newState = modules.slice()
    newState[index].sousModules.map(sousModule => {
      sousModule.coche = isSelected
      sousModule.fonctionnalites.map(fonctionnalite => {
        fonctionnalite.coche = isSelected
      })
    })
    newState[index].coche = isSelected
    setModules(newState)
  }

  const onSousModuleSelect = (
    isSelected,
    sousModule,
    sousModuleIndex,
    moduleIndex,
  ) => {
    let newState = modules.slice()
    newState[moduleIndex].sousModules[sousModuleIndex].coche = isSelected
    newState[moduleIndex].sousModules[sousModuleIndex].fonctionnalites.map(
      fonctionnalite => {
        fonctionnalite.coche = isSelected
      },
    )
    setModules(newState)
  }

  const onFonctionnaliteSelect = (
    isSelected,
    fonctionnalite,
    fonctionnaliteIndex,
    moduleIndex,
    sousModuleIndex,
  ) => {
    let newState = modules.slice()
    newState[moduleIndex].sousModules[sousModuleIndex].fonctionnalites[
      fonctionnaliteIndex
    ].coche = isSelected
    setModules(newState)
  }

  const onAllSelect = isSelected => {
    let newState = modules.slice()
    newState.map(module => {
      module.sousModules.map(sousModule => {
        sousModule.fonctionnalites.map(service => {
          service.coche = isSelected
        })
        sousModule.coche = isSelected
      })
      module.coche = isSelected
    })
    setAllSelected(isSelected)
    setModules(newState)
  }

  const renderSectionTitle = () => <View />

  const renderHeader = (sousModule, sousModuleIndex, isActive, moduleIndex) => (
    <View
      style={[
        tailwind('flex-row h-14 p-4 bg-gray-200 items-center justify-between'),
      ]}
    >
      <View style={tailwind('flex-row items-center')}>
        <Checkbox
          colorScheme="primary"
          value={sousModule.coche}
          isChecked={sousModule.coche}
          onChange={isSelected =>
            onSousModuleSelect(
              isSelected,
              sousModule,
              sousModuleIndex.split(',')[2],
              moduleIndex,
            )
          }
          accessibilityLabel="This is a dummy checkbox"
        />
        <Text
          style={[
            tailwind('font-bold text-sm text-gray-600 ml-2'),
            { fontFamily: 'GilRoy-Bold' },
          ]}
        >
          {sousModule.libelle}
        </Text>
      </View>
      <View style={tailwind('p-1 rounded-full bg-gray-300')}>
        <Icon
          color={Colors.gray_500}
          size={16}
          name={isActive ? 'chevron-up' : 'chevron-down'}
        />
      </View>
    </View>
  )

  const renderContent = (
    sousModule,
    sousModuleIndex,
    isActive,
    moduleIndex,
  ) => {
    return sousModule.fonctionnalites.map(
      (fonctionnalite, fonctionnaliteIndex) => (
        <View
          key={fonctionnaliteIndex}
          style={tailwind(
            'flex-row p-4 pl-8 bg-gray-100 items-center m-1 rounded',
          )}
        >
          <Checkbox
            colorScheme="primary"
            value={fonctionnalite.coche}
            isChecked={fonctionnalite.coche}
            onChange={isSelected =>
              onFonctionnaliteSelect(
                isSelected,
                fonctionnalite,
                fonctionnaliteIndex,
                moduleIndex,
                sousModuleIndex.split(',')[2],
              )
            }
            accessibilityLabel="This is a dummy checkbox"
          />
          <Text
            numberOfLines={1}
            style={[
              tailwind('text-sm text-gray-700 ml-2'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {fonctionnalite.libelle}
          </Text>
        </View>
      ),
    )
  }

  return (
    <View style={tailwind('flex-1')}>
      <Text
        style={[
          tailwind('font-light text-gray-500 text-base mt-5 mb-5'),
          { fontFamily: 'Gilroy-Bold' },
        ]}
      >
        Sélectionnez les habilitations de ce rôle.
      </Text>

      <View style={tailwind('mb-2')}>
        <View style={tailwind('flex-row items-center mb-5')}>
          <Checkbox
            colorScheme="primary"
            isChecked={isAllSelected}
            onChange={isSelected => onAllSelect(isSelected)}
            accessibilityLabel="This is a dummy checkbox"
          />
          <Text
            style={[
              tailwind('font-bold text-xl ml-2 text-gray-700'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Donner toutes les habilitations
          </Text>
        </View>
      </View>

      {modules.map((module, index) => (
        <View key={index} style={tailwind('bg-white rounded mb-5')}>
          <View style={tailwind('flex-row items-center p-2')}>
            <Checkbox
              colorScheme="primary"
              value={module.coche}
              isChecked={module.coche}
              onChange={isSelected => onModuleSelect(isSelected, module, index)}
              accessibilityLabel="This is a dummy checkbox"
            />
            <Text
              style={[
                tailwind('font-bold text-base ml-2 text-gray-700'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              {module.libelle}
            </Text>
          </View>
          <View style={tailwind('')}>
            <Accordion
              keyExtractor={(item, indexAccordion) =>
                `${item.libelle},${item.id},${indexAccordion}`
              }
              sections={module.sousModules}
              activeSections={activeSections}
              onChange={setActiveSections}
              renderSectionTitle={renderSectionTitle}
              renderHeader={(sousModule, sousModuleIndex, isActive) =>
                renderHeader(sousModule, sousModuleIndex, isActive, index)
              }
              renderContent={(sousModule, sousModuleIndex, isActive) =>
                renderContent(sousModule, sousModuleIndex, isActive, index)
              }
            />
          </View>
        </View>
      ))}

      <Button onPress={() => navigation.goBack()}>Sauvegarder</Button>
    </View>
  )
}

Authorization.propTypes = {}

Authorization.defaultProps = {}

export default Authorization
