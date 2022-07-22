import React from 'react'
import { View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import { default as Image } from 'react-native-fast-image'
import { ButtonText } from '@/Components/index'
import { useTheme } from '@/Theme'

const ErrorView = ({ errorMessage, onRetryPress, showImage }) => {
  const { Images } = useTheme()

  return (
    <View
      style={tailwind('flex flex-col p-4 pb-10 justify-center items-center')}
    >
      {showImage && (
        <Image source={Images.error} style={tailwind('h-32 w-32 mb-5')} />
      )}
      <Text
        style={[
          tailwind('text-center text-base'),
          { fontFamily: 'Gilroy-Regular' },
        ]}
      >
        {errorMessage || 'Erreur lors de la récupération des données.'}
      </Text>

      <ButtonText onPress={onRetryPress || null}>
        Appuyer ici pour réessayer
      </ButtonText>
    </View>
  )
}

ErrorView.propTypes = {}

ErrorView.defaultProps = {
  showImage: true,
}

export default ErrorView
