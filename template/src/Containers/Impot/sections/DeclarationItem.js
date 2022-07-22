import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'
import { Button } from '@/Components'

const DeclarationItem = ({ data, onPress }) => {
  return (
    <View
      style={[
        tailwind('rounded-sm mb-4'),
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
      <View
        style={tailwind(
          'bg-blueGray p-4 items-center justify-center rounded-t-md',
        )}
      >
        <Text
          style={[
            tailwind('font-bold text-base text-gray-900 text-center'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {data.r_libelle_service}
        </Text>
      </View>
      <View style={tailwind('p-4')}>
        <View style={tailwind('flex-row justify-between mb-2')}>
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
        <View style={tailwind('flex-row justify-between mb-2')}>
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
        <View style={tailwind('flex-row justify-between mb-2')}>
          <Text
            style={[
              tailwind('font-bold text-sm text-gray-900'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Date limite:
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 ml-2'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {data.r_date_limite}
          </Text>
        </View>
        <Button onPress={onPress} style={tailwind('mt-5')}>
          Démarrer la déclaration
        </Button>
      </View>
    </View>
  )
}

DeclarationItem.propTypes = {
  data: PropTypes.any,
}

DeclarationItem.defaultProps = {
  data: {},
}

export default DeclarationItem
