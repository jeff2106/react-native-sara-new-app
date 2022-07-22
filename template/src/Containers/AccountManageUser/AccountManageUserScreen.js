import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigate } from '@/Navigators/Root'
import UserItem from '@/Containers/AccountManageUser/sections/UserItem'
import FloatingActionButton from '@/Components/FloatingActionButton'
import UserListPlaceholder from '@/Containers/AccountManageUser/sections/UserListPlaceholder'
import FetchThirdUser from '@/Store/ThirdUser/FetchThirdUser'
import { default as FlatList } from '@/Components/FlatList'

const AccountManageUser = ({ navigation }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const fetchThirdUser = useSelector(state => state.thirdUser.item)
  const fetchThirdUserLoading = useSelector(
    state => state.thirdUser.fetchThirdUser.loading,
  )
  const fetchThirdUserError = useSelector(
    state => state.thirdUser.fetchThirdUser.error,
  )

  const fetchData = () => {
    dispatch(FetchThirdUser.action({ acteurId: r_acteur }))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SafeAreaView style={tailwind('h-full bg-white')}>
      <NavBar
        title="Liste des utilisateurs"
        hasBack={true}
        navigation={navigation}
      />
      {fetchThirdUserLoading && <UserListPlaceholder />}
      {!fetchThirdUserLoading && fetchThirdUser && (
        <FlatList
          contentContainerStyle={tailwind('flex-1 p-4')}
          data={fetchThirdUser}
          renderItem={({ item }) => <UserItem user={item} />}
          onRefresh={fetchData}
          refreshing={fetchThirdUserLoading}
        />
      )}
      <FloatingActionButton onPress={() => navigate('AccountAddUser')} />
    </SafeAreaView>
  )
}

export default AccountManageUser
