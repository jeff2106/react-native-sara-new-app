import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { Button, ButtonText } from '@/Components'
import { navigate } from '@/Navigators/Root'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { Colors } from '@/Theme/Variables'
import Services from '@/Containers/AccountUpdateRole/sections/Services'
import Authorization from '@/Containers/AccountUpdateRole/sections/Authorization'
import { FlatList } from 'react-native-gesture-handler'

const AccountUpdateRole = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const categoriesData = [
    {
      id: 1,
      name: 'Gros facturiers', //libelle
      image: '',
      selected: false, //coche
      providers: [
        // fournisseurs
        {
          id: 1,
          name: 'CI-Energie',
          selected: false,
          services: [
            {
              id: 1,
              name: 'Energie compteur à carte',
              selected: false,
            },
            {
              id: 2,
              name: 'Facture PostPaid',
              selected: false,
            },
          ],
        },
        {
          id: 2,
          name: 'SODECI',
          selected: false,
          services: [
            {
              id: 4,
              name: 'Facture PostPaid',
              selected: false,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Transport',
      image: '',
      selected: false,
      providers: [
        {
          id: 1,
          name: 'SOTRA',
          selected: false,
          services: [
            {
              id: 1,
              name: 'Ticket MonBus',
              selected: false,
            },
            {
              id: 2,
              name: 'Abonnement Mensuelle Monbus',
              selected: false,
            },
            {
              id: 3,
              name: 'Abonnement Mensuelle Express',
              selected: false,
            },
          ],
        },
      ],
    },
  ]
  const [categories, setCategories] = useState(categoriesData)

  const authorizationsData = [
    {
      id: 1,
      libelle: 'Paiements',
      coche: false,
      sousModules: [
        {
          id: 1001,
          libelle: 'Paiement',
          coche: false,
          fonctionnalites: [
            {
              id: 2001,
              libelle: 'Effectuer un paiement',
              coche: false,
            },
          ],
        },
        {
          id: 1002,
          libelle: 'Liste des paiements',
          coche: false,
          fonctionnalites: [
            {
              id: 2002,
              libelle: 'Visualiser',
              coche: false,
            },
            {
              id: 2003,
              libelle: 'Télécharger',
              coche: false,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      libelle: 'Paramétrage',
      coche: false,
      sousModules: [
        {
          id: 1005,
          libelle: 'Compte',
          coche: false,
          fonctionnalites: [
            {
              id: 2005,
              libelle: 'Modifier le logo',
              coche: false,
            },
            {
              id: 2006,
              libelle: 'Modifier les informations',
              coche: false,
            },
          ],
        },
        {
          id: 1006,
          libelle: 'Gestion des roles',
          coche: false,
          fonctionnalites: [
            {
              id: 2007,
              libelle: 'Ajouter rôle',
              coche: false,
            },
            {
              id: 2008,
              libelle: 'Modifier rôle',
              coche: false,
            },
          ],
        },
        {
          id: 1007,
          libelle: 'Gestion des tiers',
          coche: false,
          fonctionnalites: [
            {
              id: 2009,
              libelle: 'Ajouter un tiers',
              coche: false,
            },
            {
              id: 2010,
              libelle: 'Modifier un tiers',
              coche: false,
            },
            {
              id: 2011,
              libelle: 'Supprimer un tiers',
              coche: false,
            },
          ],
        },
        {
          id: 1008,
          libelle: 'Moyens de paiement',
          coche: false,
          fonctionnalites: [
            {
              id: 2012,
              libelle: 'Ajouter un moyen de paiement',
              coche: false,
            },
            {
              id: 2010,
              libelle: 'Modifier un moyen de paiement',
              coche: false,
            },
            {
              id: 2011,
              libelle: 'Supprimer un moyen de paiement',
              coche: false,
            },
          ],
        },
      ],
    },
  ]
  const [authorizations, setAuthorizations] = useState(authorizationsData)

  const [role] = useState(route.params.role)
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <NavBar title="Edition du rôle" hasBack={true} navigation={navigation} />
      <View style={tailwind('flex-1 p-6')}>
        <SegmentedControl
          tintColor={Colors.primary}
          fontStyle={tailwind('font-bold text-gray-600')}
          activeFontStyle={tailwind('font-bold text-white')}
          appearance="light"
          values={['Services', 'Habilitations']}
          selectedIndex={selectedTabIndex}
          onChange={event => {
            setSelectedTabIndex(event.nativeEvent.selectedSegmentIndex)
          }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[]}
          renderItem={() => <View />}
          ListFooterComponent={() => (
            <View style={tailwind('flex-1')}>
              {selectedTabIndex === 0 && (
                <Services
                  navigation={navigation}
                  data={categories}
                  onUpdate={setCategories}
                />
              )}
              {selectedTabIndex === 1 && (
                <Authorization
                  navigation={navigation}
                  data={authorizations}
                  onUpdate={setAuthorizations}
                />
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default AccountUpdateRole
