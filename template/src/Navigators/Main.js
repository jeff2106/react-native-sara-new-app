import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer, StartupContainer } from '@/Containers'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
        swipeEdgeWidth: 0,
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={ExampleContainer}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
