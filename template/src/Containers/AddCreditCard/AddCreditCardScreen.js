import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { useTheme } from '@/Theme'
import AddCreditCardWizard from '@/Containers/AddCreditCard/sections/AddCreditCardWizard'

const AddBankAccount = ({ navigation }) => {
  const dispatch = useDispatch()

  const { Images } = useTheme()

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        hasBack={true}
        title="Ajout carte de crédit"
        navigation={navigation}
      />
      <View style={[tailwind('flex-1 w-full bg-white mt-0')]}>
        <AddCreditCardWizard />
      </View>
    </SafeAreaView>
  )
}

export default AddBankAccount
