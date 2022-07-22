import React from 'react'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { useTheme } from '@/Theme'
import { Checkbox, Radio } from 'native-base'
import { Colors } from '@/Theme/Variables'
import { MaskedText } from 'react-native-mask-text'

const WaitingItem = ({ data, onChange, value }) => {
  const { Images } = useTheme()

  return (
    <View
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
      </View>
      <Radio.Group
        name="myRadioGroup"
        value={value}
        onChange={() =>
          onChange({
            id: data?.id,
            reference: data?.r_reference,
          })
        }
      >
        <Radio value={data.id} my="1">
          {' '}
        </Radio>
      </Radio.Group>
    </View>
  )
}

WaitingItem.propTypes = {}

WaitingItem.defaultProps = {}

export default WaitingItem
