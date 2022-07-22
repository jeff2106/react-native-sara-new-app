import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@/Theme'
import { Colors } from '@/Theme/Variables'

const SupportPaymentItem = ({
  onPress,
  id,
  r_alias,
  r_numero,
  r_moyen_paiement,
  style,
}) => {
  const { Images } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tailwind(
          'flex-row p-1 pl-2 pr-2 m-1 ml-2 rounded-md bg-white items-center justify-between',
        ),
        { elevation: 1 },
        style,
      ]}
    >
      <View style={tailwind('flex-1 flex-row items-center mr-2')}>
        <Image
          source={{ uri: r_moyen_paiement.r_image_url }}
          style={tailwind('h-12 w-12 mr-2')}
          resizeMode="contain"
        />
        <View style={tailwind('')}>
          <Text
            numberOfLines={1}
            style={[
              tailwind('text-xs font-bold text-gray-600'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            xxxx-xxxx-xxxx-xxxx-xxxx-{r_numero.slice(-4)}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              tailwind('text-sm text-gray-600'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {r_alias}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

SupportPaymentItem.propTypes = {}

SupportPaymentItem.defaultProps = {}

export default SupportPaymentItem
