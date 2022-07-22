import React from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { tailwind } from '@/tailwind'
import { Button } from '@/Components'
import { Colors } from '@/Theme/Variables'
import Icon from 'react-native-vector-icons/Feather'
import { navigateAndSimpleReset } from '@/Navigators/Root'

const Terminer = ({}) => {
  const { width } = useWindowDimensions()

  return (
    <View style={[tailwind('flex-1 w-full p-4 items-center'), { width }]}>
      <Icon
        style={tailwind('mt-5')}
        name="check-circle"
        size={100}
        color={Colors.primary}
      />

      <Text
        style={[
          tailwind('text-2xl mb-5 mt-5 text-center'),
          { fontFamily: 'Gilroy-Bold' },
        ]}
      >
        Félicitation !.
      </Text>

      <Text
        style={[
          tailwind('text-sm mb-10 text-center'),
          { fontFamily: 'Gilroy-Regular' },
        ]}
      >
        Le moyen de paiement a été ajouté avec succès.
      </Text>

      <View>
        <Button onPress={() => navigateAndSimpleReset('Main')}>
          Terminer
        </Button>
      </View>
    </View>
  )
}

Terminer.propTypes = {}

Terminer.defaultProps = {}

export default Terminer
