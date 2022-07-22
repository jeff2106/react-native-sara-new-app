import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Colors } from '@/Theme/Variables'
import DashboardItem from '@/Containers/Dashboard/sections/DashboardItem'
import UserProfil from '@/Containers/Home/sections/UserProfil'
import { MaskedText } from 'react-native-mask-text'
import { navigate } from '@/Navigators/Root'
import { useSelector, useDispatch } from 'react-redux'
import FetchCategory from '@/Store/Category/FetchCategory'

const Dashboard = ({}) => {
  const supportPaiement = useSelector(
    state => state.paymentMethod.supportPaiements,
  )
  const dashboard = useSelector(state => state.Dashboard.item)

  const fournisseursConfigures = useSelector(
    state => state.auth.fournisseursConfigures,
  )

  return (
    <View style={[tailwind('w-full rounded-md pt-2 ')]}>
      <UserProfil />
      <View style={[tailwind('w-full rounded-md bg-blueGray mb-4 p-4 mt-4')]}>
        <Text
          style={[tailwind('font-bold text-xl'), { fontFamily: 'Gilroy-Bold' }]}
        >
          Tableau de bord
        </Text>
        <TouchableOpacity
          onPress={() => navigate('PaiementsScreen')}
          style={tailwind(
            'mt-2 flex-row justify-between bg-white rounded-md items-center p-3',
          )}
        >
          <View
            style={tailwind(
              'bg-blue h-14 w-14 rounded-full justify-center items-center',
            )}
          >
            <Icon size={20} color={Colors.white} name="money-bill" />
          </View>
          <View style={tailwind('flex-1 justify-center items-start ml-2')}>
            <MaskedText
              type="currency"
              options={{
                suffix: ' XOF',
                decimalSeparator: ',',
                groupSeparator: ' ',
                precision: 0,
                groupSize: 3,
              }}
              numberOfLines={1}
              style={[
                tailwind('text-xl text-blue ml-2'),
                { fontFamily: 'Gilroy-Black' },
              ]}
            >
              {dashboard[0]?.r_mtn_total_operations ?? 0}
            </MaskedText>
            <Text
              numberOfLines={2}
              style={[
                tailwind('flex-1 text-sm  text-primary ml-2'),
                { fontFamily: 'Gilroy-bold' },
              ]}
            >
              <Text
                style={[
                  tailwind('flex-1 text-xl   ml-2'),
                  { fontFamily: 'Gilroy-bold' },
                ]}
              >
                {dashboard[0]?.r_nbr_operations ?? 0}
              </Text>{' '}
              paiements
            </Text>
            <Text
              numberOfLines={2}
              style={[
                tailwind('flex-1 text-sm  ml-2'),
                { fontFamily: 'Gilroy-semibold' },
              ]}
            >
              Paiements du mois
            </Text>
          </View>
          <View
            style={[
              tailwind(
                'rounded-full bg-primary bg-opacity-25 w-5 h-5 items-center justify-center',
              ),
            ]}
          >
            <Icon
              color={Colors.primary}
              name="chevron-right"
              style={{ margin: 2 }}
              size={10}
            />
          </View>
        </TouchableOpacity>

        <View style={tailwind('mt-5')}>
          <View style={tailwind('justify-between')}>
            <DashboardItem
              onPress={() => navigate('Home')}
              title="Déclarations du mois"
              value={dashboard[0]?.r_nbr_declaration ?? 0}
              color="bg-purple"
              icon={
                <MaterialCommunityIcons
                  size={16}
                  color={Colors.white}
                  name="account-group"
                />
              }
            />
            <View style={tailwind('m-1')} />
            <DashboardItem
              onPress={() => navigate('HomeScreenNews')}
              title="Fournisseurs configurés"
              value={dashboard[0]?.r_nbr_fournisseur_config ?? 0}
              icon={
                <MaterialCommunityIcons
                  size={20}
                  color={Colors.white}
                  name="clock-time-eight"
                />
              }
            />
          </View>
          {/*
             <View style={tailwind('justify-between mt-2')}>

            <DashboardItem
              onPress={() => navigate('FournisseursConfigures')}
              title="Fournisseurs configurés"
              value={
                fournisseursConfigures ? fournisseursConfigures.length : '-'
              }
              color="bg-primary"
              icon={
                <FontAwesome size={16} color={Colors.white} name="building" />
              }
            />
          </View>
            */}
        </View>
      </View>
    </View>
  )
}

Dashboard.propTypes = {}

Dashboard.defaultProps = {}

export default Dashboard
