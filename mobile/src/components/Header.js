import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import useThemeStore from '../store/themeStore'
import useAuthStore from '../store/authStore'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function Header() {
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const logout = useAuthStore((s) => s.logout)
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.toggleDrawer()}>
        <Text style={styles.action}>☰</Text>
      </Pressable>
      <Text style={styles.title}>{route?.name || 'App'}</Text>
      <View style={styles.actions}>
        <Pressable onPress={toggleTheme}>
          <Text style={styles.action}>🌓</Text>
        </Pressable>
        <Pressable onPress={logout}>
          <Text style={styles.action}>⎋</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  actions: { flexDirection: 'row', gap: 12 },
  action: { fontSize: 20, padding: 8 },
})
