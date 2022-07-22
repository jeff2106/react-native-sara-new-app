import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import { useTheme } from '@/Theme'
import { Checkbox, Radio } from 'native-base'
import { Colors } from '@/Theme/Variables'
import { MaskedText } from 'react-native-mask-text'
import Icon from 'react-native-vector-icons/AntDesign'

const PaymentSucceedItem = ({ data, onChange }) => {
  const { Images } = useTheme()

  return (
    <TouchableOpacity
      onPress={() => onChange(data)}
      style={tailwind('bg-blueGray p-2 mb-2 rounded-sm')}
    >
      <View
        style={tailwind(
          'flex-row bg-blueGray p-2 items-center mb-2 rounded-sm',
        )}
      >
        <View style={tailwind('flex-1')}>
          <Text
            style={[
              tailwind('text-lg text-gray-900'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            {data?.r_service}
          </Text>

          <View style={tailwind('flex-row mt-1')}>
            <Text
              style={[
                tailwind('text-sm text-gray-900'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              {data?.r_periode}
            </Text>
          </View>
          <View style={tailwind('flex-row mt-1')}>
            <Text
              style={[
                tailwind('text-xs text-gray-900 '),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              {data?.r_date_limite} à 10h20
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon size={16} color={Colors.grayDark} name="rightcircle" />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={[
            tailwind('text-lg text-primary ml-2 mr-5 text-right'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          <MaskedText
            type="currency"
            options={{
              suffix: ' FCFA',
              decimalSeparator: ',',
              groupSeparator: '.',
              precision: 0,
              groupSize: 3,
            }}
            numberOfLines={1}
          >
            {data?.r_montant}
          </MaskedText>
        </Text>
      </View>
    </TouchableOpacity>
  )
}

PaymentSucceedItem.propTypes = {}

PaymentSucceedItem.defaultProps = {}

export default PaymentSucceedItem
