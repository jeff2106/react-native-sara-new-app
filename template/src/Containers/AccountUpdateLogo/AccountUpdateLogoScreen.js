import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { Button } from '@/Components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { launchImageLibrary } from 'react-native-image-picker'
import { default as Image } from 'react-native-fast-image'
import { useTheme } from '@/Theme'

const AccountUpdatePassword = ({ navigation }) => {
  const dispatch = useDispatch()

  const { Images } = useTheme()

  const [image, setImage] = useState(null)

  const onPickImageFromGallerie = response => {
    if (!response.didCancel && response.assets && response.assets.length > 0) {
      setImage(response.assets[0])
    }
  }

  const pickImageFromGallerie = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        includeBase64: true,
      },
      onPickImageFromGallerie,
    )
  }

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <NavBar
        title="Modification du logo"
        hasBack={true}
        navigation={navigation}
      />
      <ScrollView style={tailwind('flex-1')}>
        <View style={tailwind('flex-1 p-6')}>
          <Text
            style={[
              tailwind('font-light text-gray-500 text-base mb-5'),
              { fontFamily: 'Gilroy-SemiBold' },
            ]}
          >
            Recommandation: Sélectionner un logo de bonne qualité avec les
            dimensions minimales de 500x500.
          </Text>
          <View style={tailwind('mt-5 mb-10 items-center')}>
            <TouchableOpacity onPress={pickImageFromGallerie}>
              <View
                style={tailwind(
                  'rounded-md bg-white w-52 h-52 items-center justify-center',
                )}
              >
                {!image && (
                  <>
                    <Icon color={Colors.text} size={50} name="cloud-upload" />
                    <Text
                      style={[
                        tailwind(
                          'font-light text-gray-500 text-base mb-5 flex-wrap text-center',
                        ),
                        { fontFamily: 'Gilroy-Bold' },
                      ]}
                    >
                      Charger un logo
                    </Text>
                  </>
                )}
                {image && (
                  <Image
                    source={image}
                    resizeMode="contain"
                    style={tailwind('w-52 h-52')}
                  />
                )}
                <View
                  style={tailwind(
                    'absolute bottom-0 right-0 h-10 w-10 bg-gray-200 rounded-md m-2 justify-center items-center',
                  )}
                >
                  <Icon name="image-edit" size={24} color={Colors.primary} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <Button onPress={() => navigation.goBack()}>Sauvegarder</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountUpdatePassword
