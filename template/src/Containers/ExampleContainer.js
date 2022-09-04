import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand, ToastCustom, Button } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import _getUser from '@/Store/Users/_getUser'
import { showInfoToast, showSucessToast } from '@/Components/Toast'

const ExampleContainer = () => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [userId, setUserId] = useState('9')
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFetchOneQuery()
  const _uidata = useSelector(state => state.Users.item)
  const _loading = useSelector(state => state.Users._getUser.loading)
  const _error = useSelector(state => state.Users._getUser.error)
  const _init_get_user = () => {
    dispatch(
      _getUser.action({
        id: userId,
      }),
    )
  }
  useEffect(() => {
    fetchOne(userId)
    _init_get_user()
  }, [fetchOne, userId])

  const onChangeTheme = ({ theme, darkMode }) => {
    dispatch(changeTheme({ theme, darkMode }))
  }

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand />
        {_loading && <ActivityIndicator />}
        {_error !== null ? (
          <Text style={Fonts.textRegular}>{error}</Text>
        ) : (
          <Text
            style={[Fonts.textRegular, Fonts.textCenter]}
            onPress={() => {
              showInfoToast('bien', 'mo')
            }}
          >
            Je suis un faux utilisateur, mon nom est : {_uidata.name}
          </Text>
        )}
      </View>
      <View
        style={[
          Layout.row,
          Layout.rowHCenter,
          Gutters.smallHPadding,
          Gutters.largeVMargin,
          Common.DFLT_BG,
        ]}
      >
        <Text
          style={[Layout.fill, Fonts.textCenter, Fonts.textSmall, Common.WH_C]}
        >
          Entrez un id utilisateur
        </Text>
        <TextInput
          onChangeText={setUserId}
          editable={!isLoading}
          keyboardType={'number-pad'}
          maxLength={1}
          value={userId}
          selectTextOnFocus
          style={[Layout.fill, Common.textInput]}
        />
      </View>
      <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>Mode :</Text>

      <TouchableOpacity
        style={[Common.button.rounded, Common.DFLT_BG, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: null })}
      >
        <Text style={[Fonts.textRegular, Common.WH_C]}>Auto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          Common.button.outlineRounded,
          Common.B_null,
          Common.DFLT_BG,
          Gutters.regularBMargin,
        ]}
        onPress={() => onChangeTheme({ darkMode: true })}
      >
        <Text style={[Fonts.textRegular, Common.WH_C]}>Sombre</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          Common.button.outline,
          Common.B_null,
          Common.DFLT_BG,
          Gutters.regularBMargin,
        ]}
        onPress={() => onChangeTheme({ darkMode: false })}
      >
        <Text style={[Fonts.textRegular, Common.WH_C]}>Claire</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ExampleContainer
