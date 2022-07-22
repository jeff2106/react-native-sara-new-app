import React, { useEffect, useState } from 'react'
import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import { tailwind } from '@/tailwind'
import { useDispatch } from 'react-redux'

const Presentation = ({ service, configuration, control }) => {
  const { width } = useWindowDimensions()
  const dispatch = useDispatch()

  const [config, setConfig] = useState(configuration)
  const [services, setServices] = useState(service)

  useEffect(() => {
    setConfig(configuration)
  }, [configuration])

  /*
  {configs?.map(item => (
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
   */
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
      <View style={tailwind('flex mt-2')}>
        <Text
          style={[
            tailwind('text-sm text-blueDark'),
            { fontFamily: 'Gilroy-Regular' },
          ]}
        >
          Numero compte
        </Text>
        <Text
          style={[
            tailwind('text-base text-blueDark mt-1'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {services?.r_num_compte_contribuable}
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
          Numero de teledeclarant
        </Text>
        <Text
          style={[
            tailwind('text-base text-blueDark mt-1'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {services?.r_num_teledeclarant}
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
          {services?.r_periode}
        </Text>
        <View style={tailwind('w-full h-0.5 bg-blueGray mt-2')} />
      </View>

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
          {service.r_date_limite}
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
      </View>

      <View style={tailwind('bg-blueGray mt-4 p-2 mb-10')}>
        <Text
          style={[
            tailwind('text-sm text-blueDark mb-2'),
            { fontFamily: 'Gilroy-Regular' },
          ]}
        >
          {service.r_description_service}
        </Text>
        <Text
          style={[
            tailwind('text-base text-error'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          Attention: A lire avant de commencer la déclaration.
        </Text>
        <Text
          style={[
            tailwind('text-sm text-blueDark mt-2'),
            { fontFamily: 'Gilroy-Regular' },
          ]}
        >
          Vous avez jusqu'à 23h59 le jour de la date limite pour transmettre
          votre déclaration et émettre votre télépaiement. Si vous souhaitez
          payer par virement bancaire, merci d'anticiper votre déclaration et
          votre virement pour respecter les délais légaux. Sinon vous vous
          exposez à des pénalités en cas de déclaration et de paiement en
          retard.
        </Text>
      </View>
      <View style={tailwind('mb-10')}>{control}</View>
    </ScrollView>
  )
}

Presentation.propTypes = {}

Presentation.defaultProps = {}

export default Presentation
