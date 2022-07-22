import React, { useEffect, useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'
import { KeyboardAView } from '@/Components'
import { Checkbox } from 'native-base'
import DynamicForm from '@/Components/DynamicForm'

const Recapitulatif = ({ impotSelected, configuration }) => {
  const { width } = useWindowDimensions()

  const [fields, setFields] = useState([])

  useEffect(() => {
    let newFields = []
    if (configuration) {
      Object.values(configuration).map(parametre => newFields.push(parametre))
      setFields(newFields)
    }
  }, [impotSelected, configuration])

  return (
    <View style={[tailwind('flex-1 w-full'), { width }]}>
      <KeyboardAView>
        <View style={tailwind('p-4')}>
          <Text style={[tailwind('text-sm'), { fontFamily: 'Gilroy-Regular' }]}>
            Merci de vérifier l'ensemble des informations saisies avant la
            soumission.
          </Text>
          <Text
            style={[tailwind('text-sm mt-2'), { fontFamily: 'Gilroy-Bold' }]}
          >
            Si des informations sont incorrectes, veuillez vous retourner aux
            étapes précédentes et proceder aux corrections nécessaires.
          </Text>

          <View
            style={tailwind(
              'flex flex-row h-14 items-center mt-5 mb-1 p-2 bg-blueGray border-b border-white',
            )}
          >
            <Text
              style={[
                tailwind('flex-1 text-sm text-blueDark'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Informations du compte contribuable
            </Text>
          </View>

          <DynamicForm
            data={configuration}
            onDataChange={null}
            disabled={true}
            fields={fields}
          />

          <View
            style={tailwind(
              'flex flex-row h-14 items-center mt-5 mb-1 p-2 bg-blueGray border-b border-white',
            )}
          >
            <Text
              style={[
                tailwind('flex-1 text-sm text-blueDark'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Impôts à déclarer
            </Text>
          </View>

          {impotSelected.map((item, index) => (
            <View
              key={index}
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
                isChecked={true}
                accessibilityLabel="OK"
                colorScheme="primary"
                isDisabled={true}
              />
            </View>
          ))}
        </View>
      </KeyboardAView>
    </View>
  )
}

Recapitulatif.propTypes = {}

Recapitulatif.defaultProps = {}

export default Recapitulatif
