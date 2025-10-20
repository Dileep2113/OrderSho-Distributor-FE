import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons'

export default function IconsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Icons</Text>

      <Text style={styles.subheading}>Ionicons</Text>
      <View style={styles.row}>
        <Ionicons name="home" size={28} color="#0ea5e9" />
        <Ionicons name="notifications" size={28} color="#10b981" />
        <Ionicons name="settings" size={28} color="#64748b" />
        <Ionicons name="alert" size={28} color="#ef4444" />
      </View>

      <Text style={styles.subheading}>MaterialIcons</Text>
      <View style={styles.row}>
        <MaterialIcons name="dashboard" size={28} color="#0ea5e9" />
        <MaterialIcons name="people" size={28} color="#10b981" />
        <MaterialIcons name="table-chart" size={28} color="#f59e0b" />
        <MaterialIcons name="bar-chart" size={28} color="#3b82f6" />
      </View>

      <Text style={styles.subheading}>Feather</Text>
      <View style={styles.row}>
        <Feather name="user" size={28} color="#0ea5e9" />
        <Feather name="bell" size={28} color="#10b981" />
        <Feather name="settings" size={28} color="#64748b" />
        <Feather name="alert-triangle" size={28} color="#ef4444" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  subheading: { fontSize: 16, fontWeight: '700', marginTop: 12, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
})
