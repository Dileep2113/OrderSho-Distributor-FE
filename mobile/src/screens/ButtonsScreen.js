import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

const variants = [
  { name: 'Primary', color: '#0ea5e9' },
  { name: 'Secondary', color: '#64748b' },
  { name: 'Success', color: '#10b981' },
  { name: 'Danger', color: '#ef4444' },
  { name: 'Warning', color: '#f59e0b' },
  { name: 'Info', color: '#3b82f6' },
]

export default function ButtonsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Buttons</Text>
      <View style={styles.grid}>
        {variants.map((v) => (
          <Pressable key={v.name} style={[styles.btn, { backgroundColor: v.color }]}> 
            <Text style={styles.btnText}>{v.name}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.heading, { marginTop: 16 }]}>Outline</Text>
      <View style={styles.grid}>
        {variants.map((v) => (
          <Pressable key={v.name} style={[styles.btnOutline, { borderColor: v.color }]}> 
            <Text style={[styles.btnOutlineText, { color: v.color }]}>{v.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8 },
  btnText: { color: 'white', fontWeight: '700' },
  btnOutline: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1 },
  btnOutlineText: { fontWeight: '700' },
})
