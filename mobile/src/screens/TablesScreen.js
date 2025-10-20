import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

const data = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  status: i % 2 === 0 ? 'Active' : 'Inactive',
  value: Math.floor(Math.random() * 1000),
}))

export default function TablesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tables</Text>
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell, { flex: 1 }]}>Name</Text>
        <Text style={[styles.cell, styles.headerCell, { width: 90 }]}>Status</Text>
        <Text style={[styles.cell, styles.headerCell, { width: 80, textAlign: 'right' }]}>Value</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, { flex: 1 }]}>{item.name}</Text>
            <Text style={[styles.cell, { width: 90, color: item.status === 'Active' ? '#10b981' : '#ef4444' }]}>
              {item.status}
            </Text>
            <Text style={[styles.cell, { width: 80, textAlign: 'right', fontWeight: '700' }]}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  headerRow: { flexDirection: 'row', paddingVertical: 8, backgroundColor: '#f3f4f6', borderRadius: 8 },
  row: { flexDirection: 'row', paddingVertical: 10, alignItems: 'center' },
  cell: { paddingHorizontal: 8 },
  headerCell: { fontWeight: '700', color: '#374151' },
  sep: { height: 1, backgroundColor: '#e5e7eb' },
})
