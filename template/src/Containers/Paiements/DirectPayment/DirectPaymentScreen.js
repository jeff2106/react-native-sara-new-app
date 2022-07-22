import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, Text, View, Dimensions, Platform } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import {
  SearchTextInput,
  Button,
} from '@/Containers/Paiements/DirectPayment/components/'
import FilterPaymentCompleted from '@/Containers/Paiements/DirectPayment/sections/FilterPaymentDirect'

const DirectPayment = ({ navigation }) => {
  const dispatch = useDispatch()
  const [dataFilter, setDataFilter] = useState('')
  const user = useSelector(state => state.auth.item)
  const { height, width } = Dimensions.get('window')
  const _GetData = data => {
    setDataFilter(data)
    console.log(data)
  }
  const _GetTextSearch = data => {
    console.log(data)
  }
  console.log(Platform.OS)
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar navigation={navigation} hasBack={true} title="Paiements Direct" />
      <View style={tailwind('flex-1 p-4')}>
        <View style={{ height: height / 4.3 }}>
          <FilterPaymentCompleted
            onChange={_GetData}
            onChangeText={_GetTextSearch}
          />
        </View>
        {Platform.OS === 'android' && <Text />}

        <View style={[tailwind('flex-row')]}>
          <SearchTextInput
            style={[
              tailwind(' w-9/12 items-center justify-center  h-12 pl-2  '),
            ]}
            placeholder="Saisissez la référence ..."
            withIcon={false}
          />

          <Button
            style={[tailwind(' w-24  ')]}
            onPress={() => alert('tout va')}
          >
            <Text>Verifier</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DirectPayment
