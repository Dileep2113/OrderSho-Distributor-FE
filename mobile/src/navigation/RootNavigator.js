import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import useAuthStore from '../store/authStore'
import LoginScreen from '../screens/LoginScreen'
import DashboardScreen from '../screens/DashboardScreen'
import UsersScreen from '../screens/UsersScreen'
import UserDetailScreen from '../screens/UserDetailScreen'
import SettingsScreen from '../screens/SettingsScreen'
import AboutScreen from '../screens/AboutScreen'
import Header from '../components/Header'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Users" component={UsersScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  )
}

export default function RootNavigator() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="App" component={AppDrawer} />
      ) : (
        <Stack.Screen name="Auth" component={LoginScreen} />
      )}
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
    </Stack.Navigator>
  )
}
