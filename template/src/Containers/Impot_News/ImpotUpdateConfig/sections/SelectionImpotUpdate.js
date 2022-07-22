import React, { useEffect, useState } from 'react'
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import { ErrorView, KeyboardAView } from '@/Components'
import { Checkbox } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import Accordion from 'react-native-collapsible/Accordion'
import { useDispatch, useSelector } from 'react-redux'
import FetchServiceByFournisseurIdGroupByFamille from '@/Store/Service/FetchServiceByFournisseurIdGroupByFamille'
import SelectionImpotPlaceholder from '@/Containers/Impot/sections/SelectionImpotPlaceholder'

const SelectionImpotUpdate = ({
  value,
  onDataChange,
  fournisseur,
  isVisible,
}) => {
  //console.log("====> fournisseur", fournisseur)
  const { width } = useWindowDimensions()
  const dispacth = useDispatch()
  const user = useSelector(state => state.auth.item)
  const serviceByFournisseurIdGroupByFamille = useSelector(
    state => state.service.serviceByFournisseurIdGroupByFamille,
  )
  const serviceByFournisseurIdGroupByFamilleLoading = useSelector(
    state => state.service.fetchServiceByFournisseurIdGroupByFamille.loading,
  )
  const serviceByFournisseurIdGroupByFamilleError = useSelector(
    state => state.service.fetchServiceByFournisseurIdGroupByFamille.error,
  )

  const fetchData = () => {
    dispacth(
      FetchServiceByFournisseurIdGroupByFamille.action({
        fournisseurId: fournisseur.id,
        session: user?._session,
      }),
    )
  }

  const [activeSections, setActiveSections] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    if (
      !serviceByFournisseurIdGroupByFamilleError &&
      !serviceByFournisseurIdGroupByFamilleLoading &&
      Array.isArray(serviceByFournisseurIdGroupByFamille)
    ) {
      let newData = serviceByFournisseurIdGroupByFamille.slice()
      let newFamilles = []
      newFamilles = newData.map((famille, indexFamille) => {
        let newServices = []
        newServices = famille.services.map((item, index) => {
          const findIndex = value.findIndex(el => el.r_code === item.r_code)
          if (findIndex !== -1) {
            return {
              ...item,
              r_selected: true,
            }
          } else {
            return item
          }
        })
        return { ...famille, services: newServices }
      })

      setData(newFamilles)
    }
  }, [
    serviceByFournisseurIdGroupByFamille,
    serviceByFournisseurIdGroupByFamilleError,
    serviceByFournisseurIdGroupByFamilleLoading,
  ])

  useEffect(() => {
    fetchData()
  }, [])

  const OnSelectionChange = (item, sectionIndex) => {
    let dataToSave = [...data]
    const updatedServices = dataToSave[sectionIndex].services.map(x =>
      x.id === item.id ? { ...x, r_selected: !item.r_selected } : x,
    )
    const updatedData = dataToSave.map((sec, secIndex) =>
      secIndex === sectionIndex ? { ...sec, services: updatedServices } : sec,
    )
    setData(updatedData)

    let selected = []
    updatedData.forEach(section => {
      selected.push(...section.services.filter(v => v.r_selected === true))
    })
    onDataChange(selected)
  }

  const SectionHeader = ({ section, active }) => {
    return (
      <View
        style={tailwind(
          'flex flex-row h-14 items-center p-2 bg-blueGray border-b border-white',
        )}
      >
        <Text
          style={[
            tailwind('flex-1 text-sm text-blueDark'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {section.r_libelle}
        </Text>

        <View
          style={tailwind(
            'flex flex-row bg-white rounded-full h-5 w-5 items-center justify-center',
          )}
        >
          {active && (
            <Icon color={Colors.gray_900} size={18} name="chevron-up" />
          )}
          {!active && (
            <Icon color={Colors.gray_900} size={18} name="chevron-down" />
          )}
        </View>
      </View>
    )
  }

  const SectionItem = ({ section, sectionIndex }) => {
    const vSectionIndex = sectionIndex

    return data[vSectionIndex].services.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => OnSelectionChange(item, vSectionIndex)}
      >
        <View
          style={[
            tailwind('flex flex-row items-center p-2 pt-4 pb-4'),
            index % 2 === 0
              ? tailwind('')
              : tailwind('bg-primary bg-opacity-5'),
          ]}
        >
          <Text
            style={[
              tailwind('flex-1 text-sm mr-5'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {item.r_libelle}
          </Text>

          <Checkbox
            value={item.r_selected}
            isChecked={item.r_selected}
            accessibilityLabel="OK"
            colorScheme="primary"
            onChange={() => OnSelectionChange(item, vSectionIndex)}
          />
        </View>
      </TouchableOpacity>
    ))
  }

  return (
    <View style={[tailwind('flex-1 w-full'), { width }]}>
      <KeyboardAView>
        <View style={tailwind('p-4')}>
          <Text style={[tailwind('text-sm'), { fontFamily: 'Gilroy-Regular' }]}>
            La liste ci-dessous vous permet de sélectionner les impôts dont vous
            êtes rédevables. Pour cela, il vous suffit de cocher la case
            correspondant à l'impôt et enregistrer vos modifications en bas de
            page.
          </Text>
          <Text
            style={[tailwind('text-sm mt-2'), { fontFamily: 'Gilroy-Bold' }]}
          >
            Attention : merci de cocher uniquement la liste des impôts qui vous
            concerne.
          </Text>
        </View>
        <View>
          {serviceByFournisseurIdGroupByFamilleLoading && (
            <SelectionImpotPlaceholder />
          )}
          {!serviceByFournisseurIdGroupByFamilleLoading &&
            serviceByFournisseurIdGroupByFamilleError && (
              <ErrorView
                onRetryPress={fetchData}
                errorMessage="Erreur lors de la récupération des impôts, veuillez réessayer."
              />
            )}
          {!serviceByFournisseurIdGroupByFamilleLoading &&
            !serviceByFournisseurIdGroupByFamilleError &&
            data.length > 0 && (
              <Accordion
                containerStyle={tailwind('flex flex-1 p-4')}
                keyExtractor={(item, indexAccordion) => indexAccordion}
                sections={data}
                activeSections={activeSections}
                onChange={setActiveSections}
                renderSectionTitle={() => <></>}
                renderHeader={(section, index, isActive) =>
                  section?.services.length > 0 ? (
                    <SectionHeader section={section} active={isActive} />
                  ) : (
                    <Text style={{ height: 0 }} />
                  )
                }
                renderContent={(content, index, isActive, sections) => (
                  <SectionItem section={content} sectionIndex={index} />
                )}
              />
            )}
        </View>
      </KeyboardAView>
    </View>
  )
}

SelectionImpotUpdate.propTypes = {}

SelectionImpotUpdate.defaultProps = {
  isVisible: true,
}

export default SelectionImpotUpdate
