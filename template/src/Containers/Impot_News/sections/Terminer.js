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
        Félicitation ! vous avez terminé la configuration du service.
      </Text>

      <Text
        style={[
          tailwind('text-sm mb-10 text-center'),
          { fontFamily: 'Gilroy-Regular' },
        ]}
      >
        Vous recevrez un mail de confirmation de notre part. Vous pouvez
        maintenant accéder au service.
      </Text>

      <View>
        {/* <Button onPress={() => navigateAndSimpleReset('ImpotService')}>
          Accéder au service
        </Button>*/}
        <Button onPress={() => navigateAndSimpleReset('Main')}>
          Accéder au service
        </Button>
      </View>
    </View>
  )
}

Terminer.propTypes = {}

Terminer.defaultProps = {}

export default Terminer
