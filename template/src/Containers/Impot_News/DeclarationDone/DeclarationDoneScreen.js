import React from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'
import { Button } from '@/Components'
import { Colors } from '@/Theme/Variables'
import Icon from 'react-native-vector-icons/Feather'
import { pop } from '@/Navigators/Root'

const DeclarationDoneScreen = ({ navigation }) => {
  const { width } = useWindowDimensions()

  const goBack = () => {
    pop(2)
  }

  return (
    <View
      style={[tailwind('flex-1 w-full p-4 items-center bg-white'), { width }]}
    >
      <Icon
        style={tailwind('mt-28')}
        name="check-circle"
        size={100}
        color={Colors.primary}
      />

      <Text
        style={[
          tailwind('text-2xl mt-5 text-center'),
          { fontFamily: 'Gilroy-Bold' },
        ]}
      >
        Félicitation !
      </Text>

      <Text
        style={[
          tailwind('text-base mb-10 text-center p-4'),
          { fontFamily: 'Gilroy-Regular' },
        ]}
      >
        Vous avez terminé votre déclaration. Cliquez sur le bouton ci-dessous
        pour consulter vos déclarations.
      </Text>

      <View>
        <Button onPress={goBack}>Consulter mes déclarations</Button>
      </View>
    </View>
  )
}

DeclarationDoneScreen.propTypes = {}

DeclarationDoneScreen.defaultProps = {}

export default DeclarationDoneScreen
