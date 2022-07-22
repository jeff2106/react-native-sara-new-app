import React from 'react'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { default as Image } from 'react-native-fast-image'
import { ButtonText } from '@/Components/index'
import { useTheme } from '@/Theme'

const ErrorView = ({ message, onBackPress }) => {
  const { Images } = useTheme()

  return (
    <View
      style={tailwind('flex flex-col p-4 pb-10 justify-center items-center')}
    >
      <Image source={Images.empty} style={tailwind('h-32 w-32 mb-5')} />
      <Text
        style={[
          tailwind('text-center text-base'),
          { fontFamily: 'Gilroy-Regular' },
        ]}
      >
        {message || ''}
      </Text>

      <ButtonText onPress={onBackPress || null}>Retour</ButtonText>
    </View>
  )
}

ErrorView.propTypes = {}

ErrorView.defaultProps = {}

export default ErrorView
