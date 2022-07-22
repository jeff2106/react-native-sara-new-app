import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import { navigate } from '@/Navigators/Root'
import { Colors } from '@/Theme/Variables'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'

const TeledeclarationsScreen = ({ navigation, configuration }) => {
  console.log(configuration)
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <View style={tailwind('flex-1 p-4')}>
        <TouchableOpacity
          onPress={() =>
            navigate('ListeDeclarationAttente', {
              configuration: JSON.stringify(configuration),
            })
          }
          style={tailwind(
            'bg-blueGray p-2 flex-row items-center mb-2 rounded-md',
          )}
        >
          <View
            style={tailwind(
              'bg-primary h-12 w-12 rounded-full justify-center items-center',
            )}
          >
            <Feather color={Colors.white} size={24} name="loader" />
          </View>
          <Text
            style={[
              tailwind('flex-1 font-bold text-base text-gray-900 ml-2 mr-2'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Déclarations en attente
          </Text>
          <View style={tailwind('rounded-full bg-primary bg-opacity-25')}>
            <Icon
              color={Colors.primary}
              name="chevron-right"
              style={{ margin: 2 }}
              size={16}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigate('ListeDeclarationHorsDelais', {
              configuration: JSON.stringify(configuration),
            })
          }
          style={tailwind(
            'bg-blueGray p-2 flex-row items-center mb-2 rounded-md',
          )}
        >
          <View
            style={tailwind(
              'bg-error h-12 w-12 rounded-full justify-center items-center',
            )}
          >
            <Entypo color={Colors.white} size={24} name="back-in-time" />
          </View>
          <Text
            style={[
              tailwind('flex-1 font-bold text-base text-gray-900 ml-2 mr-2'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Déclarations en retard
          </Text>
          <View style={tailwind('rounded-full bg-primary bg-opacity-25')}>
            <Icon
              color={Colors.primary}
              name="chevron-right"
              style={{ margin: 2 }}
              size={16}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigate('ListeDeclarationEffectue', {
              configuration: JSON.stringify(configuration),
            })
          }
          style={tailwind(
            'bg-blueGray p-2 flex-row items-center mb-2 rounded-md',
          )}
        >
          <View
            style={tailwind(
              'bg-green h-12 w-12 rounded-full justify-center items-center',
            )}
          >
            <Feather color={Colors.white} size={24} name="loader" />
          </View>
          <Text
            style={[
              tailwind('flex-1 font-bold text-base text-gray-900 ml-2 mr-2'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Déclarations effectuées
          </Text>
          <View style={tailwind('rounded-full bg-primary bg-opacity-25')}>
            <Icon
              color={Colors.primary}
              name="chevron-right"
              style={{ margin: 2 }}
              size={16}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default TeledeclarationsScreen
