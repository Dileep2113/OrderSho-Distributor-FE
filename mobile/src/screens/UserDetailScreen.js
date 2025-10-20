import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function UserDetailScreen({ route }) {
  const { user } = route.params || {}
  if (!user) return null
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.meta}>Email: {user.email}</Text>
      <Text style={styles.meta}>Role: {user.role}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  meta: { fontSize: 16, color: '#374151', marginBottom: 6 },
})
