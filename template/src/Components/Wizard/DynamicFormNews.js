import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import {
  DateInput,
  DocumentSelect,
  TextInput,
  MonetaireInputNews,
} from '@/Components'
import { tailwind } from '@/tailwind'
import NumberInput from '@/Components/NumberInput'
import _ from 'lodash'
import MonetaireInput from '@/Components/MonetaireInput'
import calculateFormValue from '@/Services/utils/calculateFormValue'
import CalculeInput from '@/Components/CalculeInputNews'
import PickerInputDynamic from '@/Components/PickerInputDynamic'

const DynamicFormNews = ({ onDataChange, fields = [], disabled }) => {
  const [sortedFields, setSortedFields] = useState([])

  useEffect(() => {
    let newFields = fields && fields.length > 0 ? fields.slice() : []
    newFields?.sort((a, b) => {
      return a.r_rang - b.r_rang
    })

    let groupedField = _.groupBy(newFields, item => item?.r_libelle_groupe)
    setSortedFields(groupedField)
  }, [fields])

  const onChange = (field, value) => {
    let newData = fields.slice()
    const index = newData.findIndex(x => x.r_code === field.r_code)
    newData[index] = { ...field, r_valeur: value }
    newData.forEach((item, i) => {
      if (item.r_type === 'calculer') {
        newData[i] = {
          ...item,
          r_valeur: calculateFormValue(item.r_formule, newData),
        }
      }
    })
    onDataChange(newData)
  }

  const onFileSelect = (field, file) => {
    let newData = fields.slice()
    const index = newData.findIndex(x => x.r_code === field.r_code)
    newData[index] = { ...field, file: file }
    onDataChange(newData)
  }

  return (
    <View style={tailwind('flex')}>
      {Object.entries(sortedFields).map((item, index) => (
        <View style={tailwind('mb-5')} key={index}>
          {item[0] !== 'null' && (
            <View
              style={tailwind(
                'flex flex-row items-center mb-2 p-2 bg-graySection border-b border-white rounded-md',
              )}
            >
              <Text
                style={[
                  tailwind('flex-1 p-1 text-sm text-blueDark text-center'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                {item[0]}
              </Text>
            </View>
          )}
          {item[1].map(parametre => {
            switch (parametre?.r_type) {
              case 'text':
                return (
                  <TextInput
                    key={parametre.id}
                    value={parametre?.r_valeur}
                    onChangeText={value => onChange(parametre, value)}
                    label={parametre.r_libelle}
                    placeholder={parametre.r_libelle}
                    autoCapitalize="characters"
                    disabled={disabled}
                    errorMessage={parametre?.r_error}
                    taille={parametre?.r_taille}
                  />
                )
              case 'double':
                return (
                  <NumberInput
                    key={parametre.id}
                    value={parametre?.r_valeur}
                    onChangeText={(value, rawValue) => {
                      onChange(parametre, value)
                    }}
                    label={parametre.r_libelle}
                    placeholder={parametre.r_libelle}
                    keyboardType="numeric"
                    disabled={disabled}
                    errorMessage={parametre?.r_error}
                    min={parametre?.r_valeur_min}
                    max={parametre?.r_valeur_max}
                    taille={parametre?.r_taille}
                  />
                )
              case 'date':
                return (
                  <DateInput
                    key={parametre.id}
                    label={parametre.r_libelle}
                    placeholder={parametre.r_libelle}
                    value={
                      parametre?.r_valeur
                        ? new Date(parametre?.r_valeur)
                        : new Date()
                    }
                    onChange={value => onChange(parametre, value.toString())}
                    maximumDate={new Date()}
                    disabled={disabled}
                  />
                )
              case 'monetaire':
                return (
                  <MonetaireInputNews
                    key={parametre.id}
                    value={parametre?.r_valeur}
                    onChangeText={(value, rawValue) => {
                      onChange(parametre, value)
                    }}
                    label={parametre.r_libelle}
                    placeholder={parametre.r_libelle}
                    keyboardType="numeric"
                    disabled={disabled}
                    errorMessage={parametre?.r_error}
                    min={parametre?.r_valeur_min}
                    max={parametre?.r_valeur_max}
                    taille={parametre?.r_taille}
                  />
                )
              case 'calculer':
                return (
                  <CalculeInput
                    key={parametre.id}
                    value={parametre?.r_valeur}
                    label={parametre.r_libelle}
                    min={parametre?.r_valeur_min}
                    max={parametre?.r_valeur_max}
                    errorMessage={parametre?.r_error}
                  />
                )
              case 'file':
                return (
                  <DocumentSelect
                    key={parametre.id}
                    label={parametre.r_libelle}
                    placeholder={parametre.r_libelle}
                    onFileSelect={value => onFileSelect(parametre, value)}
                    selectedFile={parametre?.r_valeur?.file}
                    disabled={disabled}
                  />
                )
              case 'select':
                return (
                  <PickerInputDynamic
                    key={parametre.id}
                    label={parametre.r_libelle}
                    placeholder={parametre.r_libelle}
                    onOptionChange={value => onChange(parametre, value)}
                    options={parametre?.r_options ? parametre.r_options : []}
                    propsDisplay="r_libelle"
                    propsValue="r_valeur"
                    disabled={disabled}
                    value={parametre?.r_valeur}
                  />
                )
              default:
                return (
                  <TextInput
                    key={parametre.id}
                    value={parametre?.r_valeur}
                    onChangeText={value => onChange(parametre, value)}
                    label={parametre.r_libelle}
                    placeholder={parametre.r_libelle}
                    autoCapitalize="characters"
                    disabled={disabled}
                    errorMessage={parametre?.r_error}
                    taille={parametre?.r_taille}
                  />
                )
            }
          })}
        </View>
      ))}
    </View>
  )
}

DynamicFormNews.propTypes = {}

DynamicFormNews.defaultProps = {}

export default DynamicFormNews
