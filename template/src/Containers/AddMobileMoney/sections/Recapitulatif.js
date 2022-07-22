import React, { useEffect, useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'
import { KeyboardAView } from '@/Components'

const Recapitulatif = ({ data }) => {
  const { width } = useWindowDimensions()

  const [fields, setFields] = useState(data)

  useEffect(() => {
    setFields(data)
  }, [data])

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
              'flex flex-row h-12 items-center mt-5 mb-1 p-2 bg-blueGray rounded-sm border-b border-white',
            )}
          >
            <Text
              style={[
                tailwind('flex-1 text-sm text-blueDark text-center'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Informations du Wallet
            </Text>
          </View>

          <View style={tailwind('p-2 mb-5')}>
            <View style={tailwind('mt-2')}>
              <Text
                style={[
                  tailwind('text-sm text-blueDark'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                Opérateur
              </Text>
              <Text
                style={[
                  tailwind('text-base text-blueDark mt-1'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                {data.r_operateur?.r_name}
              </Text>
              <View style={tailwind('w-full h-0.5 bg-blueGray mt-2')} />
            </View>
            <View style={tailwind('mt-2')}>
              <Text
                style={[
                  tailwind('text-sm text-blueDark'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                Nom et prénoms du titulaire
              </Text>
              <Text
                style={[
                  tailwind('text-base text-blueDark mt-1'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                {data?.r_nom_prenoms}
              </Text>
              <View style={tailwind('w-full h-0.5 bg-blueGray mt-2')} />
            </View>
            <View style={tailwind('mt-2')}>
              <Text
                style={[
                  tailwind('text-sm text-blueDark'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                Numéro de téléphone
              </Text>
              <Text
                style={[
                  tailwind('text-base text-blueDark mt-1'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                +{data?.r_indicatif_pays} {data?.r_numero}
              </Text>
              <View style={tailwind('w-full h-0.5 bg-blueGray mt-2')} />
            </View>
          </View>
        </View>
      </KeyboardAView>
    </View>
  )
}

Recapitulatif.propTypes = {}

Recapitulatif.defaultProps = {}

export default Recapitulatif
