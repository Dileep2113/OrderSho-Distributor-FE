import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const COLORS = [
  { name: 'Primary', value: '#0ea5e9' },
  { name: 'Secondary', value: '#64748b' },
  { name: 'Success', value: '#10b981' },
  { name: 'Danger', value: '#ef4444' },
  { name: 'Warning', value: '#f59e0b' },
  { name: 'Info', value: '#3b82f6' },
  { name: 'Light', value: '#f3f4f6', text: '#111827' },
  { name: 'Dark', value: '#111827' },
]

export default function ColorsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Theme Colors</Text>
      <View style={styles.grid}>
        {COLORS.map((c) => (
          <View key={c.name} style={[styles.colorCard, { backgroundColor: c.value }]}> 
            <Text style={[styles.colorName, { color: c.text || 'white' }]}>{c.name}</Text>
            <Text style={[styles.colorValue, { color: c.text || 'white' }]}>{c.value}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  colorCard: { width: '47%', borderRadius: 10, padding: 16 },
  colorName: { fontWeight: '800', fontSize: 16 },
  colorValue: { opacity: 0.9, marginTop: 6 },
})
