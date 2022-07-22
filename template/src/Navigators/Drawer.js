import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, AppState } from 'react-native'
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import Animated, { interpolateNode } from 'react-native-reanimated'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'
import {
  DashboardScreen,
  HomeScreen,
  PaymentMethodScreen,
  Statement,
  PaiementsScreen,
s} from '@/Containers'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { navigate } from '@/Navigators/Root'
import { Brand } from '@/Components'
import Logout from '@/Store/Auth/Logout'
import { useDispatch } from 'react-redux'

const Drawer = createDrawerNavigator()
const TabStack = createBottomTabNavigator()

const Screens = ({ navigation, style }) => {
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState
      setAppStateVisible(appState.current)
      if (appState.current === 'inactive') {
        navigation.closeDrawer()
      }
    })

    return () => {
      subscription.remove()
    }
  }, [navigation])

  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <TabStack.Navigator
        initialRouteName="Accueil"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            paddingTop: 2,
            backgroundColor: Colors.white,
            activeTintColor: Colors.primary,
            inactiveTintColor: Colors.gray_500,
          },
        }}
      >
        <TabStack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Accueil',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <TabStack.Screen
          name="Home"
          component={Statement}
          options={{
            tabBarLabel: 'Déclarations',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="notification" color={color} size={size} />
            ),
          }}
        />
        <TabStack.Screen
          name="PaiementsScreen"
          component={PaiementsScreen}
          options={{
            tabBarLabel: 'Paiements',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="creditcard" color={color} size={size} />
            ),
          }}
        />
      </TabStack.Navigator>
    </Animated.View>
  )
}

const DrawerContent = props => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(Logout.action())
  }

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={tailwind('flex-1 content-center')}
    >
      <View style={tailwind('flex-1')}>
        <View
          style={{
            flex: 0.5,
            margin: 10,
            justifyContent: 'center',
          }}
        >
          <Brand width="50%" height="50%" />
          <Text
            style={[
              tailwind('font-bold text-2xl mt-5'),
              {
                fontFamily: 'Gilroy-Black',
              },
            ]}
          >
            Global Pay
          </Text>
        </View>
        <View>
          <DrawerItem
            label="Accueil"
            labelStyle={{ color: Colors.gray_900, marginLeft: -20 }}
            style={styles.drawerItem}
            onPress={() => navigate('Home')}
            icon={() => (
              <MaterialCommunityIcons
                name="home"
                color={Colors.gray_900}
                size={24}
              />
            )}
          />
          <DrawerItem
            label="Tableau de bord"
            labelStyle={[
              tailwind('text-gray-900 text-xs'),
              { marginLeft: -20 },
            ]}
            style={styles.drawerItem}
            onPress={() => navigate('Dashboard')}
            icon={() => (
              <MaterialCommunityIcons
                name="history"
                color={Colors.gray_900}
                size={24}
              />
            )}
          />
          <DrawerItem
            label="Moyens de paiement"
            labelStyle={{ color: Colors.gray_900, marginLeft: -20 }}
            style={styles.drawerItem}
            onPress={() => navigate('PaymentMethod')}
            icon={() => (
              <MaterialIcons
                name="payments"
                color={Colors.gray_900}
                size={24}
              />
            )}
          />
          <DrawerItem
            label="Mon compte"
            labelStyle={{ color: Colors.gray_900, marginLeft: -20 }}
            style={styles.drawerItem}
            onPress={() => {
              props.navigation.closeDrawer()
              navigate('Account')
            }}
            icon={() => (
              <MaterialCommunityIcons
                name="account"
                color={Colors.gray_900}
                size={24}
              />
            )}
          />
          <View style={tailwind(' mt-12')}>
            <DrawerItem
              label="Déconnexion"
              style={styles.drawerItem}
              labelStyle={{ color: Colors.gray_900, marginLeft: -20 }}
              icon={() => (
                <MaterialCommunityIcons
                  name="logout"
                  color={Colors.gray_900}
                  size={24}
                />
              )}
              onPress={() => {
                props.navigation.closeDrawer()
                logout()
              }}
            />
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  )
}

export default () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0))
  const scale = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  })
  const borderRadius = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  })

  const animatedStyle = { borderRadius, transform: [{ scale }] }

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <Drawer.Navigator
        // hideStatusBar
        drawerType="slide"
        overlayColor={Colors.transparent}
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: Colors.transparent,
          activeTintColor: '#ff9758',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{ backgroundColor: Colors.transparent }}
        drawerContent={props => {
          setProgress(props.progress)
          return <DrawerContent {...props} />
        }}
      >
        <Drawer.Screen name="Screens">
          {props => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  drawerStyles: { flex: 1, width: '65%' },
  drawerItem: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 2,
  },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
})
