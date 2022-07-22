import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { useTheme } from '@/Theme'
import AccountItem from '@/Containers/Account/sections/AccountItem'
import { navigate } from '@/Navigators/Root'
import { default as Image } from 'react-native-fast-image'
import Logout from '@/Store/Auth/Logout'
import { Config } from '@/Config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import RefreshControl from 'react-native/Libraries/Components/RefreshControl/RefreshControl'

const AccountScreen = props => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const [userData, setUserdata] = useState()
  useEffect(() => {
    setUserdata(user._description)
  }, [user])

  const [isEntreprise, setEntreprise] = useState(false)

  useEffect(() => {
    if (userData?.r_type_entite) {
      if (
        userData?.r_type_entite.includes('Entreprise') ||
        userData?.r_type_entite.includes('Administration')
      ) {
        setEntreprise(true)
      } else {
        setEntreprise(false)
      }
    }
  }, [userData?.r_type_entite, setEntreprise])

  const logout = () => {
    dispatch(Logout.action())
  }
  async function refresh() {
    setUserdata(await user._description)
  }
  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar navigation={props.navigation} title="Mon compte" hasBack={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tailwind('flex-1')}
        RefreshControl={refresh}
      >
        <View style={tailwind('flex-1 p-4')}>
          <View style={tailwind('p-2 rounded-sm bg-blueGray items-center p-4')}>
            {!userData?.r_image_url && (
              <View
                style={tailwind(
                  'flex h-16 w-16 rounded-full items-center justify-center bg-grayDark',
                )}
              >
                <Icon name="account" size={52} color={Colors.white} />
              </View>
            )}
            {userData?.r_image_url && (
              <Image
                source={{ uri: userData?.r_image_url }}
                style={tailwind('h-16 w-16 rounded-full')}
              />
            )}
            <Text
              numberOfLines={1}
              style={[tailwind('text-xl mt-2'), { fontFamily: 'Gilroy-Bold' }]}
            >
              {userData?.r_prenom_particulier} {userData?.r_nom_particulier}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                tailwind('text-sm text-gray-600'),
                { fontFamily: 'Gilroy-regular' },
              ]}
            >
              Compte {userData?.r_type_entite?.toLowerCase()}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                tailwind('text-sm text-gray-500'),
                { fontFamily: 'Gilroy-regular' },
              ]}
            >
              {userData?.r_email_particulier}
            </Text>
          </View>
          {/*{isEntreprise && (
            <View style={tailwind('mt-8')}>
              <Text
                style={[
                  tailwind('font-bold text-base mb-2'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                Gestion de la compagnie
              </Text>

              <View style={tailwind('p-2 rounded-md bg-white')}>
                <AccountItem
                  name="Modifier le logo"
                  icon="image-edit"
                  onPress={() => navigate('AccountUpdateLogo')}
                />
                <AccountItem
                  onPress={() => navigate('AccountUpdateEnterprise')}
                  name="Modifier les informations"
                  icon="briefcase-edit"
                />
              </View>
            </View>
          )}*/}

          {/*<View style={tailwind('mt-8')}>
            <Text
              style={[
                tailwind('font-bold text-base mb-2'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Gestion des utilisateurs tiers
            </Text>

            <View style={tailwind('rounded-md bg-blueGray')}>
              <AccountItem
                name="Gestion des rôles"
                icon="account-lock"
                onPress={() => navigate('AccountRoleList')}
              />
              <AccountItem
                name="Ajouter un utilisateur"
                icon="account-multiple-plus"
                onPress={() => navigate('AccountAddUser')}
              />
              <AccountItem
                name="Gestion des utilisateurs"
                icon="account-group"
                onPress={() => navigate('AccountManageUser')}
              />
            </View>
          </View>*/}

          <View style={tailwind('mt-8')}>
            <Text
              style={[
                tailwind('font-bold text-base mb-2'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Informations personnelles
            </Text>

            <View style={tailwind('rounded-sm bg-blueGray')}>
              <AccountItem
                name="Modifier ma photo de profil"
                icon="account"
                onPress={() => navigate('AccountUpdateProfilImage')}
              />
              <AccountItem
                name="Modifier mes informations"
                icon="account-edit"
                onPress={() => navigate('AccountUpdateInformations')}
              />
              <AccountItem
                name="Modifier mon mot de passe"
                icon="form-textbox-password"
                onPress={() => navigate('AccountUpdatePassword')}
              />
            </View>
          </View>

          <TouchableOpacity
            style={tailwind(
              'flex-row mt-8 p-2 bg-blueGray rounded-sm border-dashed border border-gray-300',
            )}
          >
            <Icon
              name="file-download-outline"
              size={32}
              color={Colors.primary}
            />
            <View style={tailwind('flex-1 ml-2')}>
              <Text
                style={[
                  tailwind('font-bold text-sm'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                Télécharger mes informations personnelles
              </Text>
              <Text
                style={[
                  tailwind('font-bold text-sm'),
                  { fontFamily: 'Gilroy-Light' },
                ]}
              >
                Cliquez ici pour télécharger vos informations personnelles.
              </Text>
            </View>
          </TouchableOpacity>

          <View style={tailwind('mt-8')}>
            <View style={tailwind('rounded-md bg-white')}>
              <AccountItem name="Déconnexion" icon="logout" onPress={logout} />

              <Text
                style={[
                  tailwind(
                    'flex-1 font-bold text-gray-400 text-xs text-center mt-5',
                  ),
                  { fontFamily: 'Gilroy-Regular' },
                ]}
              >
                GlobalPay version {Config.VERSION}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountScreen
