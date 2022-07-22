import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import { useTheme } from '@/Theme'
import { default as Image } from 'react-native-fast-image'
import { navigate } from '@/Navigators/Root'

const ServiceItem = ({ id, r_libelle, r_image_url, r_code, style }) => {
  const { Images } = useTheme()
  //console.log("======> Image", r_image_url)
  const goToCompagnie = () => {
    navigate('CompanyListNews', {
      data: { category: { id, r_libelle, r_image_url, r_code } },
    })
  }

  return (
    <TouchableOpacity
      onPress={goToCompagnie}
      style={[tailwind('h-28 mb-2 pl-1 pr-1 '), { ...style }]}
    >
      <View
        style={[
          tailwind('h-28 items-center justify-center bg-white rounded-sm'),
        ]}
      >
        <View style={tailwind('')}>
          <Image
            source={{ uri: r_image_url }}
            style={{ width: 52, height: 52 }}
          />
        </View>
        <Text
          numberOfLines={1}
          style={[
            tailwind('text-xs mt-1 w-full text-center px-1'),
            { fontFamily: 'Gilroy-Medium' },
          ]}
        >
          {r_libelle}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

ServiceItem.propTypes = {}

ServiceItem.defaultProps = {}

export default ServiceItem
