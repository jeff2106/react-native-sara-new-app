import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import { useTheme } from '@/Theme'
import { Checkbox, Radio } from 'native-base'
import { Colors } from '@/Theme/Variables'
import { MaskedText } from 'react-native-mask-text'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const WaitingItemPayment = ({ data, onChange, value, onPress }) => {
  const { Images } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tailwind('flex-row bg-blueGray p-2 items-center mb-2 rounded-sm')}
    >
      <View style={tailwind('flex-1')}>
        <Text
          style={[
            tailwind('text-base text-gray-900'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {data?.r_service}
        </Text>

        <View style={tailwind('flex-row mt-4')}>
          <Text
            style={[
              tailwind('text-sm text-gray-700'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Code impôt:
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 ml-2'),
              { fontFamily: 'Gilroy-Medium' },
            ]}
          >
            {data?.r_code_service}
          </Text>
        </View>
        <View style={tailwind('flex-row')}>
          <Text
            style={[
              tailwind('text-sm text-gray-700'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Période:
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 ml-2'),
              { fontFamily: 'Gilroy-Medium' },
            ]}
          >
            {data?.r_periode}
          </Text>
        </View>
        <View style={tailwind('flex-row')}>
          <Text
            style={[
              tailwind('text-sm text-gray-700'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Montant:
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 ml-2'),
              { fontFamily: 'Gilroy-Medium' },
            ]}
          >
            <MaskedText
              type="currency"
              options={{
                suffix: ' FCFA',
                decimalSeparator: ',',
                groupSeparator: '',
                precision: 0,
                groupSize: 3,
              }}
              numberOfLines={1}
            >
              {data?.r_montant}
            </MaskedText>
          </Text>
        </View>

        <View style={tailwind('flex-row')}>
          <Text
            style={[
              tailwind('text-sm text-gray-700'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            Date de création:
          </Text>
          <Text
            style={[
              tailwind('text-sm text-gray-900 ml-2'),
              { fontFamily: 'Gilroy-Medium' },
            ]}
          >
            {data?.r_date}
          </Text>
        </View>
        <View style={tailwind('flex-row justify-between')}>
          <View style={tailwind('flex-row')}>
            <Text
              style={[
                tailwind('text-sm text-gray-700'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              Date limite:
            </Text>
            <Text
              style={[
                tailwind('text-sm text-gray-900 ml-2'),
                { fontFamily: 'Gilroy-Medium' },
              ]}
            >
              {data?.r_date_limite}
            </Text>
          </View>
          <View style={tailwind('justify-center items-center flex-row ')}>
            {data.r_statut == 'FAILED' ? (
              <Text
                style={[
                  tailwind('text-sm text-gray-900 ml-2 text-red-400 mr-2'),
                  { fontFamily: 'Gilroy-bold' },
                ]}
              >
                {data.r_statut}
              </Text>
            ) : (
              <Text
                style={[
                  tailwind('text-sm text-gray-900 ml-2 text-green mr-2'),
                  { fontFamily: 'Gilroy-bold' },
                ]}
              >
                {data.r_statut}
              </Text>
            )}
            <FontAwesome
              size={20}
              color={data.r_statut == 'FAILED' ? 'red' : 'green'}
              name="circle"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

WaitingItemPayment.propTypes = {}

WaitingItemPayment.defaultProps = {}

export default WaitingItemPayment
