import React, { useEffect } from 'react'
import { View, ImageBackground } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@/Theme'
import InitStartup from '@/Store/Startup/Init'
import { Brand } from '@/Components'

const IndexStartupContainer = () => {
  const { Layout, Fonts, Images } = useTheme()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitStartup.action())
  }, [dispatch])

  return (
    <View style={[Layout.fill]}>
      <ImageBackground
        source={Images.background}
        style={[
          {
            flex: 1,
            padding: 20,
            paddingVertical: 40,
            overflow: 'hidden', // prevent image overflow the container
          },
          Layout.colCenter,
        ]}
        imageStyle={{
          resizeMode: 'cover',
          height: 300, // the image height
          top: undefined,
        }}
      >
        <Brand />
      </ImageBackground>
    </View>
  )
}

export default IndexStartupContainer
