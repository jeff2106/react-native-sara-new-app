import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@/Theme'
import { Colors } from '@/Theme/Variables'
import { default as Image } from 'react-native-fast-image'

const UserItem = ({ user }) => {
  const { Images } = useTheme()

  return (
    <TouchableOpacity
      style={[
        tailwind(
          'flex-row w-full p-4 rounded-md bg-blueGray mt-2 items-center justify-between',
        ),
        { elevation: 1 },
      ]}
    >
      <View style={tailwind('flex-1 mr-5')}>
        <Text
          numberOfLines={1}
          style={[
            tailwind('text-base text-gray-500'),
            { fontFamily: 'Gilroy-Bold' },
          ]}
        >
          {`${user?.r_particulier.r_nom} ${user?.r_particulier.r_prenom}`}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            tailwind('text-xs text-gray-500'),
            { fontFamily: 'Gilroy-Medium' },
          ]}
        >
          {user?.r_profil?.r_libelle}
        </Text>
      </View>

      <View style={tailwind('flex-row items-center')}>
        <Image
          source={Images.user_placeholder}
          style={tailwind('h-12 w-12 rounded-full bg-primary')}
        />
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

UserItem.propTypes = {}

UserItem.defaultProps = {}

export default UserItem
