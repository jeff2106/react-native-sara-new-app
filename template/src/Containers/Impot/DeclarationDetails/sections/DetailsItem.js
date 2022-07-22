import React, { useEffect, useState } from 'react'
import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import { tailwind } from '@/tailwind'
import { useDispatch } from 'react-redux'
import DynamicForm from '@/Components/DynamicForm'
import { Checkbox } from 'native-base'
import { Button } from '@/Components'

const Previsualisation = ({ service, fields, configuration, onPress }) => {
  const { width } = useWindowDimensions()
  const dispatch = useDispatch()

  const [config, setConfig] = useState(configuration)

  useEffect(() => {
    setConfig(configuration)
  }, [configuration])

  return (
    <ScrollView style={[tailwind('flex-1 p-4 w-full'), { width }]}>
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
          Informations du compte contribuable
        </Text>
      </View>
      {config?.r_champs?.map(item => (
        <View key={item.id} style={tailwind('flex mt-2')}>
          <Text
            style={[
              tailwind('text-sm text-blueDark'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {item.r_libelle}
          </Text>
          <Text
            style={[
              tailwind('text-base text-blueDark mt-1'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {item.r_valeur}
          </Text>
          <View style={tailwind('w-full h-0.5 bg-blueGray mt-2')} />
        </View>
      ))}
      <View
        style={tailwind(
          'flex flex-row items-center mt-5 mb-2 p-2 bg-graySection border-b border-white rounded-md',
        )}
      >
        <Text
          style={[
            tailwind('flex-1 p-1 text-sm text-blueDark text-center'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          Informations clés sur l'impôt
        </Text>
      </View>
      <View style={tailwind('flex mt-2')}>
        <Text
          style={[
            tailwind('text-sm text-blueDark'),
            { fontFamily: 'Gilroy-Regular' },
          ]}
        >
          Code impôt
        </Text>
        <Text
          style={[
            tailwind('text-base text-blueDark mt-1'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {service.r_type_impot}
        </Text>
        <View style={tailwind('w-full h-0.5 bg-blueGray mt-2')} />
      </View>
      <View style={tailwind('flex mt-2')}>
        <Text
          style={[
            tailwind('text-sm text-blueDark'),
            { fontFamily: 'Gilroy-Regular' },
          ]}
        >
          Période
        </Text>
        <Text
          style={[
            tailwind('text-base text-blueDark mt-1'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {service.r_periode}
        </Text>
        <View style={tailwind('w-full h-0.5 bg-blueGray mt-2')} />
      </View>
      <View style={tailwind('flex mt-2')}>
        <Text
          style={[
            tailwind('text-sm text-blueDark'),
            { fontFamily: 'Gilroy-Regular' },
          ]}
        >
          Libellé impôt
        </Text>
        <Text
          style={[
            tailwind('text-base text-blueDark mt-1'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {service.r_libelle_service}
        </Text>
        <View style={tailwind('w-full h-0.5 bg-blueGray mt-2')} />
      </View>
      <View style={tailwind('flex mt-2')}>
        <Text
          style={[
            tailwind('text-sm text-blueDark'),
            { fontFamily: 'Gilroy-Regular' },
          ]}
        >
          Date limite
        </Text>
        <Text
          style={[
            tailwind('text-base text-blueDark mt-1'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {service.r_date_limite}
        </Text>
        <View style={tailwind('w-full h-0.5 bg-blueGray mt-2')} />
      </View>
      <View style={tailwind('flex flex-row items-center mt-2 mb-2 p-2')}>
        <Text
          style={[
            tailwind('flex-1 p-1 text-xl text-blueDark text-center'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          Résumé de la déclaration
        </Text>
      </View>
      <View style={tailwind('flex mt-2')}>
        <DynamicForm disabled={true} onDataChange={() => {}} fields={fields} />
      </View>
      <View style={tailwind('flex mt-2 mb-5')}>
        <Button onPress={onPress}>Modifier la déclaration</Button>
      </View>
    </ScrollView>
  )
}

Previsualisation.propTypes = {}

Previsualisation.defaultProps = {}

export default Previsualisation
