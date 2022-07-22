import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { useTheme } from '@/Theme'
import AddMobileMoneyWizard from '@/Containers/AddMobileMoney/sections/AddMobileMoneyWizard'

const AddMobileMoney = ({ navigation }) => {
  const dispatch = useDispatch()

  const { Images } = useTheme()

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        hasBack={true}
        title="Ajout Mobile Money / Wallet"
        navigation={navigation}
      />
      <View style={[tailwind('flex-1 w-full bg-white mt-0')]}>
        <AddMobileMoneyWizard />
      </View>
    </SafeAreaView>
  )
}

export default AddMobileMoney
