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

const Services = ({ data, onUpdate, navigation }) => {
  const { Images } = useTheme()

  const [services, setServices] = useState(data)
  const [activeSections, setActiveSections] = useState([])
  const [isAllSelected, setAllSelected] = useState(false)

  const onCategorieSelect = (isSelected, categorie, index) => {
    let newState = services.slice()
    newState[index].providers.map(provider => {
      provider.selected = isSelected
      provider.services.map(service => {
        service.selected = isSelected
      })
    })
    newState[index].selected = isSelected
    setServices(newState)
  }

  const onProviderSelect = (isSelected, section, index, categorieIndex) => {
    let newState = services.slice()
    newState[categorieIndex].providers[index].selected = isSelected
    newState[categorieIndex].providers[index].services.map(service => {
      service.selected = isSelected
    })
    setServices(newState)
  }

  const onserviceSelect = (
    isSelected,
    service,
    serviceIndex,
    categorieIndex,
    providerIndex,
  ) => {
    let newState = services.slice()
    newState[categorieIndex].providers[providerIndex].services[
      serviceIndex
    ].selected = isSelected
    setServices(newState)
  }

  const onAllSelect = isSelected => {
    let newState = services.slice()
    newState.map(categorie => {
      categorie.providers.map(provider => {
        provider.services.map(service => {
          service.selected = isSelected
        })
        provider.selected = isSelected
      })
      categorie.selected = isSelected
    })
    setAllSelected(isSelected)
    setServices(newState)
  }

  const renderSectionTitle = (section, index, isActive) => <View />

  const renderHeader = (section, index, isActive, categorieIndex) => (
    <View
      style={[
        tailwind('flex-row h-14 p-4 bg-gray-200 items-center justify-between'),
      ]}
    >
      <View style={tailwind('flex-row items-center')}>
        <Checkbox
          colorScheme="primary"
          value={section.selected}
          isChecked={section.selected}
          onChange={isSelected =>
            onProviderSelect(
              isSelected,
              section,
              index.split(',')[2],
              categorieIndex,
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
          {section.name}
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

  const renderContent = (provider, providerIndex, isActive, categorieIndex) => {
    return provider.services.map((service, serviceIndex) => (
      <View
        key={serviceIndex}
        style={tailwind(
          'flex-row p-4 pl-8 bg-gray-100 items-center m-1 rounded',
        )}
      >
        <Checkbox
          colorScheme="primary"
          value={provider}
          isChecked={service.selected}
          onChange={isSelected =>
            onserviceSelect(
              isSelected,
              service,
              serviceIndex,
              categorieIndex,
              providerIndex.split(',')[2],
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
          {service.name}
        </Text>
      </View>
    ))
  }

  return (
    <View style={tailwind('flex-1')}>
      <Text
        style={[
          tailwind('font-light text-gray-500 text-base mt-5 mb-5'),
          { fontFamily: 'Gilroy-Bold' },
        ]}
      >
        Sélectionnez les services autorisés pour ce rôle.
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
            Autoriser tous les services
          </Text>
        </View>
      </View>

      {services.map((categorie, index) => (
        <View key={index} style={tailwind('bg-white rounded mb-5')}>
          <View style={tailwind('flex-row items-center p-2')}>
            <Checkbox
              colorScheme="primary"
              value={categorie.selected}
              isChecked={categorie.selected}
              onChange={isSelected =>
                onCategorieSelect(isSelected, categorie, index)
              }
              accessibilityLabel="This is a dummy checkbox"
            />
            <Text
              style={[
                tailwind('font-bold text-base ml-2 text-gray-700'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              {categorie.name}
            </Text>
          </View>
          <View style={tailwind('')}>
            <Accordion
              keyExtractor={(item, indexAccordion) =>
                `${item.name},${item.id},${indexAccordion}`
              }
              sections={categorie.providers}
              activeSections={activeSections}
              onChange={setActiveSections}
              renderSectionTitle={renderSectionTitle}
              renderHeader={(provider, providerIndex, isActive) =>
                renderHeader(provider, providerIndex, isActive, index)
              }
              renderContent={(provider, providerIndex, isActive) =>
                renderContent(provider, providerIndex, isActive, index)
              }
            />
          </View>
        </View>
      ))}

      <Button onPress={() => navigation.goBack()}>Sauvegarder</Button>
    </View>
  )
}

Services.propTypes = {}

Services.defaultProps = {}

export default Services
