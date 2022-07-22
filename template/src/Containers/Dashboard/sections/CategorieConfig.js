import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import UserProfil from '@/Containers/Home/sections/UserProfil'
import { MaskedText } from 'react-native-mask-text'
import { navigate } from '@/Navigators/Root'
import { useSelector, useDispatch } from 'react-redux'

const CategoryConfig = ({children}) => {
  const supportPaiement = useSelector(
    state => state.paymentMethod.supportPaiements,
  )
  const fournisseursConfigures = useSelector(
    state => state.auth.fournisseursConfigures,
  )

  return (
    <View style={[tailwind('w-full bg-blueGray rounded-md mb-4 p-2 pt-2')]}>
      {children}
    </View>
  )
}

CategoryConfig.propTypes = {}

CategoryConfig.defaultProps = {}

export default CategoryConfig
