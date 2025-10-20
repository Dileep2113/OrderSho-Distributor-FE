import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MiniChart from '../components/MiniChart'

export default function ChartsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Charts</Text>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Sales</Text>
        <MiniChart data={[2, 4, 5, 3, 6, 9, 12]} color="#0ea5e9" />
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Visitors</Text>
        <MiniChart data={[5, 3, 6, 8, 5, 7, 9]} color="#10b981" />
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Conversions</Text>
        <MiniChart data={[1, 2, 2, 3, 5, 8, 13]} color="#f59e0b" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  panel: { padding: 16, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.03)', marginBottom: 12 },
  panelTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
})
