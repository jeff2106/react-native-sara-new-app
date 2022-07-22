import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { tailwind } from '@/tailwind'
import ServiceItem from '@/Containers/Home/sections/ServiceItem'
import { default as FlatList } from '@/Components/FlatList'
import { getRandomString } from 'native-base/lib/typescript/theme/tools'
import { Colors } from '@/Theme/Variables'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigate } from '@/Navigators/Root'
import HomeBar from "@/Containers/Home/sections/HomeBar";

const ServicesList = ({ title, data, viewSize, withAdd, isDashBoard }) => {

  return (
    <View style={[tailwind('w-full rounded-md mt-2')]}>
      <Text
        style={[tailwind('font-bold text-xl'), { fontFamily: 'Gilroy-Bold' }]}
      >
        {title}
      </Text>
      <View style={tailwind('flex-row flex-wrap mt-1 ')}>
        <FlatList
          listKey={Math.random()}
          showsVerticalScrollIndicator={false}
          data={data}
          numColumns={3}
          renderItem={({ item }) => (
            <ServiceItem
              style={{ width: viewSize / 3 }}
              key={item.id}
              {...item}
            />
          )}
        />
        {data?.length < 1 && (
          <View
            style={[
              tailwind(
                'h-28 w-4/12 ml-2  items-center justify-center bg-white',
              ),
            ]}
          >
            <TouchableOpacity
              onPress={() => navigate('HomeScreenNews')}
              style={[
                tailwind(
                  'bg-grayDash h-3/5 w-3/5  rounded-full items-center justify-center',
                ),
              ]}
            >
              <Icon size={40} color={Colors.white} name="add-sharp" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}


export default ServicesList
