import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function StatCard({ title, value, accent = '#0ea5e9' }) {
  return (
    <View style={[styles.card, { borderLeftColor: accent }]}> 
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderLeftWidth: 4,
  },
  title: { fontSize: 14, color: '#6b7280' },
  value: { fontSize: 22, fontWeight: '700', marginTop: 4 },
})
