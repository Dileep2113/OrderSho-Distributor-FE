import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StatCard from '../components/StatCard'
import MiniChart from '../components/MiniChart'

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>
      <View style={styles.grid}>
        <StatCard title="Users" value="1,248" accent="#6366f1" />
        <StatCard title="Sessions" value="12,401" accent="#10b981" />
      </View>
      <View style={styles.grid}>
        <StatCard title="Errors" value="23" accent="#ef4444" />
        <StatCard title="Revenue" value="$8,491" accent="#f59e0b" />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Weekly Activity</Text>
        <MiniChart data={[4, 6, 3, 7, 5, 8, 2]} color="#22c55e" />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Server Load</Text>
        <MiniChart data={[3, 2, 6, 2, 5, 9, 7]} color="#3b82f6" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  grid: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  panel: { padding: 16, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.03)', marginBottom: 12 },
  panelTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
})
