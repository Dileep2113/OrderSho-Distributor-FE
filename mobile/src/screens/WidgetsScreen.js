import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StatCard from '../components/StatCard'
import MiniChart from '../components/MiniChart'

export default function WidgetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Widgets</Text>
      <View style={styles.grid}>
        <StatCard title="New Orders" value="356" accent="#0ea5e9" />
        <StatCard title="New Users" value="89" accent="#10b981" />
      </View>
      <View style={styles.grid}>
        <StatCard title="Bug Reports" value="12" accent="#ef4444" />
        <StatCard title="Avg. Time" value="1m 23s" accent="#f59e0b" />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Traffic</Text>
        <MiniChart data={[3, 4, 6, 8, 6, 7, 9]} color="#3b82f6" />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Engagement</Text>
        <MiniChart data={[2, 3, 4, 5, 7, 7, 8]} color="#22c55e" />
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
