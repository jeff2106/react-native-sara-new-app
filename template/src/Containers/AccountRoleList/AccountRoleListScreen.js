import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigate } from '@/Navigators/Root'
import RoleItem from '@/Containers/AccountRoleList/sections/RoleItem'
import FloatingActionButton from '@/Components/FloatingActionButton'
import FetchRole from '@/Store/Role/FetchRole'
import { showErrorToast } from '@/Components/Alert'
import RoleItemPlaceholder from '@/Containers/AccountRoleList/sections/RoleItemPlaceholder'
import { default as FlatList } from '@/Components/FlatList'

const AccountRoleList = ({ navigation }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const fetchRoleResponse = useSelector(state => state.role.item)
  const fetchRoleLoading = useSelector(state => state.role.fetchRole.loading)
  const fetchRoleError = useSelector(state => state.role.fetchRole.error)

  const initFetchActeur = () => {
    dispatch(FetchRole.action({ acteurId: user._description.r_acteur }))
  }

  useEffect(() => {
    initFetchActeur()
  }, [])

  useEffect(() => {
    if (fetchRoleError) {
      showErrorToast('Erreur', fetchRoleError.message)
    }
  }, [fetchRoleError])

  useEffect(() => {
    if (fetchRoleResponse) {
      console.debug('fetchRoleResponse', fetchRoleResponse)
    }
  }, [fetchRoleResponse])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar title="Liste des rôles" hasBack={true} navigation={navigation} />
      {fetchRoleLoading && (
        <View style={tailwind('flex-1 p-4')}>
          <RoleItemPlaceholder />
        </View>
      )}
      {!fetchRoleLoading && fetchRoleResponse && (
        <FlatList
          onRefresh={initFetchActeur}
          refreshing={fetchRoleLoading}
          contentContainerStyle={tailwind('flex-1 p-4')}
          data={fetchRoleResponse}
          renderItem={({ item }) => (
            <RoleItem
              onPress={() =>
                navigate('AccountUpdateRole', { role: { ...item } })
              }
              role={item}
            />
          )}
        />
      )}
      <FloatingActionButton onPress={() => navigate('AccountAddRole')} />
    </SafeAreaView>
  )
}

export default AccountRoleList
