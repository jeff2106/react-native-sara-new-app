import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useTheme } from '../../hooks'
import { Brand } from '../../components'
import { setDefaultTheme } from '../../store/theme'
import { ApplicationScreenProps } from '../../../@types/navigation'
import { navigateAndSimpleReset } from '@/navigators/Root'

const Startup = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters } = useTheme()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('Main')
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  )
}

export default Startup
