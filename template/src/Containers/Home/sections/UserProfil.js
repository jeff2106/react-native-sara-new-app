import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@/Theme'
import { Colors } from '@/Theme/Variables'
import { navigate } from '@/Navigators/Root'
import { default as Image } from 'react-native-fast-image'

const UserProfil = ({}) => {
  const { Images } = useTheme()

  const user = useSelector(state => state.auth.item)

  const [userData, setUserdata] = useState(user._description)
  useEffect(() => {
    setUserdata(user._description)
  }, [user])

  return (
    <TouchableOpacity
      onPress={() => navigate('Account')}
      style={[
        tailwind(
          'flex-row w-full p-4 rounded-sm bg-blueGray mt-2 items-center justify-between',
        ),
      ]}
    >
      <View style={tailwind('flex-row items-center')}>
        {userData?.r_type_entite?.toLowerCase().localeCompare('particulier') ===
          0 && (
          <View>
            {!userData?.r_image_url && (
              <View
                style={tailwind(
                  'h-14 w-14 rounded-md items-center justify-center bg-grayDark',
                )}
              >
                <Icon name="account" color={Colors.white} size={35} />
              </View>
            )}
            {userData?.r_image_url && (
              <Image
                source={{ uri: userData?.r_image_url }}
                resizeMode="cover"
                style={tailwind('h-14 w-14 rounded-md bg-grayDark')}
              />
            )}
          </View>
        )}
        {userData?.r_type_entite?.toLowerCase().localeCompare('particulier') !==
          0 && (
          <View
            style={tailwind(
              'h-14 w-14 rounded-md items-center justify-center bg-grayDark',
            )}
          >
            <Icon name="office-building" color={Colors.white} size={35} />
            <View
              style={tailwind(
                'h-7 w-7 absolute -bottom-2 -right-3 rounded-full bg-white items-center justify-center',
              )}
            >
              <Icon name="account" color={Colors.grayDark} size={22} />
            </View>
          </View>
        )}
        <View style={tailwind('flex-1 ml-5')}>
          <Text
            numberOfLines={1}
            style={[tailwind('text-base'), { fontFamily: 'Gilroy-Bold' }]}
          >
            {userData?.r_nom_particulier} {userData?.r_prenom_particulier}
          </Text>
          {userData?.r_nom_acteur && (
            <Text
              numberOfLines={1}
              style={[tailwind('text-xs'), { fontFamily: 'Gilroy-Bold' }]}
            >
              {userData?.r_nom_acteur}
            </Text>
          )}
          <Text
            numberOfLines={1}
            style={[tailwind('text-xs'), { fontFamily: 'Gilroy-Medium' }]}
          >
            Compte {userData?.r_type_entite?.toLowerCase()}
          </Text>
        </View>
        <View
          style={[
            tailwind('rounded-full bg-primary bg-opacity-25'),
            { marginStart: 10 },
          ]}
        >
          <Icon
            color={Colors.primary}
            name="chevron-right"
            style={{ margin: 2 }}
            size={16}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default UserProfil
