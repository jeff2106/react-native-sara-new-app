import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors } from '@/Theme/Variables'
import { Config } from '@/Config'

const AddItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tailwind('flex-row pt-1 pb-1 ml-2 rounded-md bg-white items-center'),
      ]}
    >
      <View
        style={tailwind(
          'h-12 flex-1 flex-row items-center justify-center items-center',
        )}
      >
        <Icon
          name="pluscircleo"
          size={18}
          style={tailwind('mr-1')}
          color={Colors.primary}
        />
        <View style={tailwind('items-center')}>
          <Text
            numberOfLines={1}
            style={[
              tailwind('text-base font-bold text-primary'),
              { fontFamily: 'Gilroy-Medium' },
            ]}
          >
            {item?.r_code === Config.CODE_COMPTE_BANCAIRE &&
              'Ajouter un compte'}
            {item?.r_code === Config.CODE_CARTE_BANCAIRE && 'Ajouter une carte'}
            {item?.r_code === Config.CODE_MOBILE_MONEY && 'Ajouter un compte'}
            {item?.r_code === Config.CODE_COUPON && 'Ajouter un coupon'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

AddItem.propTypes = {}

AddItem.defaultProps = {}

export default AddItem
