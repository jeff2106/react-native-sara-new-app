import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { launchImageLibrary } from 'react-native-image-picker'
import { default as Image } from 'react-native-fast-image'
import { Button } from '@/Components'
import ButtonOuline from '@/Components/ButtonOutline'
import UpdateProfilPicture from '@/Store/Auth/UpdateProfilPicture'
import { showErrorToast, showSucessToast } from '@/Components/Alert'
import DeleteProfilPicture from '@/Store/Auth/DeleteProfilPicture'

const AccountUpdateProfilImage = ({ navigation }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const [userData, setUserdata] = useState(user._description)
  useEffect(() => {
    setUserdata(user._description)
  }, [user])

  const updateProfilPictureLoading = useSelector(
    state => state.auth.updateProfilPicture.loading,
  )
  const deleteProfilPictureLoading = useSelector(
    state => state.auth.deleteProfilPicture.loading,
  )

  const session = user._session

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
        includeBase64: false,
      },
      onPickImageFromGallerie,
    )
  }

  const updatePhoto = () => {
    dispatch(
      UpdateProfilPicture.action({
        acteur: userData?.r_acteur,
        particulier: userData?.r_particulier,
        session: session,
        file: image,
      }),
    ).then(response => {
      if (response.meta && response.meta.requestStatus === 'rejected') {
        if (response.payload && response.payload.message) {
          showErrorToast('Erreur', response?.payload?.message)
        } else {
          showErrorToast('Erreur', 'Erreur inconnue, veuillez réessayer')
        }
      } else if (response.meta && response.meta.requestStatus === 'fulfilled') {
        if (response.payload?._status === 1) {
          setImage(null)
          showSucessToast(
            'Succès',
            'votre photo de profil a été mise à jour avec succès',
          )
        }
      }
    })
  }

  const deletePhoto = () => {
    dispatch(
      DeleteProfilPicture.action({
        particulier: userData?.r_particulier,
        session: session,
      }),
    ).then(response => {
      if (response.meta && response.meta.requestStatus === 'rejected') {
        if (response.payload && response.payload.message) {
          showErrorToast('Erreur', response?.payload?.message)
        } else {
          showErrorToast('Erreur', 'Erreur inconnue, veuillez réessayer')
        }
      } else if (response.meta && response.meta.requestStatus === 'fulfilled') {
        if (response.payload?._status === 1) {
          showSucessToast(
            'Succès',
            'votre photo de profil a été mise à jour avec succès',
          )
        }
      }
    })
  }
  console.log('ok', userData?.r_image_url)
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Modification de la photo"
        hasBack={true}
        navigation={navigation}
      />
      <ScrollView style={tailwind('flex-1')}>
        <View style={tailwind('flex-1 p-6')}>
          <View style={tailwind('mt-5 mb-5 items-center')}>
            <TouchableOpacity onPress={pickImageFromGallerie}>
              {!image && !userData?.r_image_url && (
                <View
                  style={tailwind(
                    'rounded-full bg-grayDark w-44 h-44 items-center justify-center',
                  )}
                >
                  <Icon color={Colors.white} size={100} name="account" />
                </View>
              )}
              {userData?.r_image_url && !image && (
                <Image
                  source={{ uri: userData?.r_image_url }}
                  resizeMode="cover"
                  style={tailwind('w-44 h-44 rounded-full')}
                />
              )}
              {image && (
                <Image
                  source={image}
                  resizeMode="cover"
                  style={tailwind('w-44 h-44 rounded-full')}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={tailwind('mt-2')}>
            <TouchableOpacity
              onPress={pickImageFromGallerie}
              style={tailwind(
                'h-14 bg-blueGray rounded-sm flex-row justify-center items-center',
              )}
            >
              <Icon name="cloud-upload" size={18} color={Colors.primary} />
              <Text
                style={[
                  tailwind('text-base text-primary ml-1'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                Charger une photo
              </Text>
            </TouchableOpacity>
          </View>
          {/*<View style={tailwind('mt-3')}>
            <TouchableOpacity
              onPress={deletePhoto}
              style={tailwind(
                'h-14 bg-blueGray rounded-sm flex-row justify-center items-center',
              )}
            >
              <Icon name="trash-can" size={18} color={Colors.primary} />
              <Text
                style={[
                  tailwind('text-base text-primary ml-1'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                Supprimer la photo
              </Text>
            </TouchableOpacity>
          </View>*/}
        </View>
      </ScrollView>
      <View style={tailwind('absolute bottom-5 p-4 w-full')}>
        <Button
          onPress={updatePhoto}
          disabled={!image}
          loading={updateProfilPictureLoading}
          style={tailwind('w-full')}
        >
          Sauvegarder
        </Button>
        <ButtonOuline
          onPress={() => navigation.goBack()}
          style={tailwind('w-full mt-4')}
        >
          Annuler
        </ButtonOuline>
      </View>
    </SafeAreaView>
  )
}

export default AccountUpdateProfilImage
