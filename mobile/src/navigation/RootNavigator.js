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
import ColorsScreen from '../screens/ColorsScreen'
import TypographyScreen from '../screens/TypographyScreen'
import ButtonsScreen from '../screens/ButtonsScreen'
import FormsScreen from '../screens/FormsScreen'
import TablesScreen from '../screens/TablesScreen'
import ChartsScreen from '../screens/ChartsScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import WidgetsScreen from '../screens/WidgetsScreen'
import IconsScreen from '../screens/IconsScreen'
import OrderCreateScreen from '../screens/OrderCreateScreen'
import OrderProcessScreen from '../screens/OrderProcessScreen'
import StockIncomingScreen from '../screens/StockIncomingScreen'
import StockOutgoingScreen from '../screens/StockOutgoingScreen'
import StockCurrentScreen from '../screens/StockCurrentScreen'
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
      <Drawer.Screen name="Create Order" component={OrderCreateScreen} />
      <Drawer.Screen name="Orders Process" component={OrderProcessScreen} />
      <Drawer.Screen name="Stock Incoming" component={StockIncomingScreen} />
      <Drawer.Screen name="Stock Outgoing" component={StockOutgoingScreen} />
      <Drawer.Screen name="Current Stock" component={StockCurrentScreen} />
      <Drawer.Screen name="Users" component={UsersScreen} />
      <Drawer.Screen name="Tables" component={TablesScreen} />
      <Drawer.Screen name="Charts" component={ChartsScreen} />
      <Drawer.Screen name="Forms" component={FormsScreen} />
      <Drawer.Screen name="Buttons" component={ButtonsScreen} />
      <Drawer.Screen name="Colors" component={ColorsScreen} />
      <Drawer.Screen name="Typography" component={TypographyScreen} />
      <Drawer.Screen name="Icons" component={IconsScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Widgets" component={WidgetsScreen} />
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
