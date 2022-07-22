import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import DynamicForm from '@/Components/DynamicForm'
import { Button, KeyboardAView } from '@/Components'
import { navigate } from '@/Navigators/Root'

const ConfigurationsScreen = ({ navigation, configuration }) => {
  const goToUpdateConfigurationScreen = () => {
    navigate('ImpotUpdateConfigScreenNews', {
      data: JSON.stringify(configuration),
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <KeyboardAView style={tailwind('flex-1')}>
        <View style={tailwind('flex-1 rounded-sm p-4')}>
          <View
            style={tailwind(
              'flex flex-row items-center mb-2 p-2 bg-graySection border-b border-white rounded-md',
            )}
          >
            <Text
              style={[
                tailwind('flex-1 p-2 text-sm text-blueDark'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Informations du compte contribuable
            </Text>
          </View>
          <View style={tailwind('flex p-2')}>
            <DynamicForm disabled={true} fields={configuration?.r_champs} />
          </View>

          <View
            style={tailwind(
              'flex flex-row items-center p-2 bg-graySection rounded-t-md',
            )}
          >
            <Text
              style={[
                tailwind('flex-1 p-2 text-sm text-blueDark'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Impôts à déclarer
            </Text>
          </View>

          {configuration?.r_service?.map((item, index) => (
            <View
              key={index}
              style={[
                tailwind(
                  'flex flex-row items-center p-2 pt-4 pb-4 border-gray-200 border',
                ),
                index % 2 === 0 ? tailwind('') : tailwind('bg-grayLight'),
              ]}
            >
              <Text
                style={[
                  tailwind('flex-1 text-sm mr-5'),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                {item.r_libelle}
              </Text>
            </View>
          ))}
        </View>
      </KeyboardAView>
      <View style={tailwind('p-2 pl-4 pr-4')}>
        <Button onPress={goToUpdateConfigurationScreen}>
          Modifier la configuration
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default ConfigurationsScreen
