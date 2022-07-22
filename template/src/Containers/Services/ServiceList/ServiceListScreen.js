import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, FlatList, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigate } from '@/Navigators/Root'
import { useTheme } from '@/Theme'
import ServiceItem from './sections/ServiceItem'
import { default as Image } from 'react-native-fast-image'

const ServiceList = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { data } = route.params

  const onServicePress = service => {
    let routeName

    switch (service.type) {
      case 'facture':
        routeName = 'ServiceFactureForm'
        break
      case 'recharge':
        routeName = 'ServiceRechargeForm'
        break
      case 'demande':
        routeName = 'ServiceDemandeForm'
        break
    }

    if (routeName) {
      navigate(routeName, { data: { ...data, service } })
    }
  }

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <NavBar hasBack={true} title="Services" navigation={navigation} />
      <View style={tailwind('flex-1 p-4')}>
        <View
          style={[
            tailwind('w-full flex-row p-4 rounded-md bg-white mb-5'),
            { elevation: 1 },
          ]}
        >
          <View
            style={tailwind(
              'h-16 w-16 rounded-md border-2 border-gray-200 items-center justify-center',
            )}
          >
            <Image
              source={{ uri: data.company.logo }}
              style={tailwind('h-14 w-14')}
              resizeMode="contain"
            />
          </View>
          <View style={tailwind('m-1 flex-1')}>
            <Text
              style={[
                tailwind('font-bold text-gray-900 text-base'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              {data.company.name}
            </Text>
            <Text
              style={[
                tailwind('text-gray-500 text-sm'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              {data.company.fullName}
            </Text>
          </View>
        </View>
        <View
          style={[tailwind('w-full p-4 rounded-md bg-white'), { elevation: 1 }]}
        >
          <Text
            style={[
              tailwind('font-bold text-gray-900 text-base'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Sélectionnez un service
          </Text>
          <View style={tailwind('flex-row flex-wrap mt-5')}>
            <FlatList
              contentContainerStyle={tailwind('flex justify-between')}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={data.company.services}
              renderItem={({ item }) => (
                <ServiceItem data={item} onPress={() => onServicePress(item)} />
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ServiceList
