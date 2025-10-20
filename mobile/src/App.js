import React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import RootNavigator from './navigation/RootNavigator'
import useThemeStore from './store/themeStore'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  const theme = useThemeStore((s) => s.theme)

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
