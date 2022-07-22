import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'
import { Button } from '@/Components'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const DeclarationEffectueItem = ({
  data,
  onPress,
  btnText,
  btn_Status,
  isPayable,
}) => {
  console.log(isPayable)
  return (
    <View
      style={[
        tailwind('rounded-sm mb-4 '),
        {
          backgroundColor: Colors.white,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        },
      ]}
    >
      <View style={tailwind('bg-blueGray p-4  rounded-t-md')}>
        <Text
          style={[
            tailwind('font-bold text-base text-gray-900'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {data.r_libelle_service}
        </Text>
        <Text
          style={[
            tailwind('font-bold text-sm text-gray-900 '),
            { fontFamily: 'Gilroy-semibold' },
          ]}
        >
          {data.r_libelle_formulaire}
        </Text>
      </View>
      <View style={tailwind('p-4 bg-blueGray')}>
        <View style={tailwind('flex-row mb-2')}>
          <Text
            style={[
              tailwind('font-bold text-sm text-gray-900'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Code impôt:
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 ml-2'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {data.r_type_impot}
          </Text>
        </View>
        <View style={tailwind('flex-row  mb-2')}>
          <Text
            style={[
              tailwind('font-bold text-sm text-gray-900'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Période:
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 ml-2'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {data.r_periode}
          </Text>
        </View>
        <View style={tailwind('flex-row  mb-2')}>
          <Text
            style={[
              tailwind('font-bold text-sm text-gray-900'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Date de création:
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 ml-2'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {data?.r_date}
          </Text>
        </View>
        <View style={tailwind('flex-row  mb-2 w-full')}>
          <Text
            style={[
              tailwind('font-bold text-sm text-gray-900'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Date limite:
          </Text>
          <View style={tailwind('flex-row  mb-2 ')}>
            <Text
              style={[
                tailwind('text-sm text-gray-900 ml-2'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              {data.r_date_limite}
            </Text>
            {data?.r_statut === 3 && (
              <View style={tailwind('justify-center items-center flex-row ')}>
                <Text
                  style={[
                    tailwind('text-sm text-gray-900 ml-2 text-red-400 mr-2'),
                    { fontFamily: 'Gilroy-bold' },
                  ]}
                >
                  Refusée
                </Text>
                <FontAwesome size={20} color={'#F35A5A'} name="circle" />
              </View>
            )}
            {data?.r_statut === 2 && (
              <View style={tailwind('justify-center items-center flex-row ')}>
                <Text
                  style={[
                    tailwind('text-sm text-gray-900 ml-2 text-green mr-2'),
                    { fontFamily: 'Gilroy-bold' },
                  ]}
                >
                  Confirmer
                </Text>
                <FontAwesome size={20} color={'#34BE82'} name="circle" />
              </View>
            )}
            {data?.r_statut === 0 && (
              <View style={tailwind('justify-center items-center flex-row ')}>
                <Text
                  style={[
                    tailwind('text-sm text-gray-900 ml-2 text-gray-400 mr-2'),
                    { fontFamily: 'Gilroy-bold' },
                  ]}
                >
                  En attente{' '}
                </Text>
                <FontAwesome size={20} color={'#B0B4BF'} name="circle" />
              </View>
            )}
          </View>
        </View>
        {}
        <Button
          disabled={data.r_statut_formulaire > 1}
          onPress={onPress}
          style={tailwind('mt-5 ml-5 mr-5 ')}
        >
          {btnText}
        </Button>
      </View>
    </View>
  )
}

DeclarationEffectueItem.propTypes = {
  data: PropTypes.any,
  btnText: PropTypes.string,
  btn_Status: PropTypes.number,
}

DeclarationEffectueItem.defaultProps = {
  data: {},
  btnText: 'Consulter la déclaration',
  btn_Status: 0,
}

export default DeclarationEffectueItem
