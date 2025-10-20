import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function MiniChart({ data = [4, 6, 3, 7, 5, 8, 2], color = '#22c55e' }) {
  const max = Math.max(...data)
  return (
    <View style={styles.row}>
      {data.map((v, i) => (
        <View key={i} style={[styles.bar, { height: 4 + (48 * v) / max, backgroundColor: color }]} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 60 },
  bar: { width: 10, borderRadius: 4, opacity: 0.8 },
})
