import React from 'react'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import useInventoryStore from '../store/inventoryStore'

export default function StockCurrentScreen() {
  const items = useInventoryStore((s) => s.items)
  const adjustStock = useInventoryStore((s) => s.adjustStock)

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Current Stock</Text>

      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell, { flex: 1 }]}>Item</Text>
        <Text style={[styles.cell, styles.headerCell, { width: 80, textAlign: 'right' }]}>Price</Text>
        <Text style={[styles.cell, styles.headerCell, { width: 100, textAlign: 'right' }]}>Stock</Text>
        <Text style={[styles.cell, styles.headerCell, { width: 130, textAlign: 'right' }]}>Adjust</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, { flex: 1 }]}>{item.name}</Text>
            <Text style={[styles.cell, { width: 80, textAlign: 'right' }]}>${item.price}</Text>
            <Text style={[styles.cell, { width: 100, textAlign: 'right', fontWeight: '800' }]}>{item.stock}</Text>
            <View style={[styles.cell, { width: 130, flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }]}>
              <Pressable onPress={() => adjustStock(item.id, -1)} style={[styles.btn, { backgroundColor: '#ef4444' }]}>
                <Text style={styles.btnText}>-1</Text>
              </Pressable>
              <Pressable onPress={() => adjustStock(item.id, +1)} style={[styles.btn, { backgroundColor: '#10b981' }]}>
                <Text style={styles.btnText}>+1</Text>
              </Pressable>
            </View>
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
  sep: { height: 1, backgroundColor: '#e5e7eb' },
  cell: { paddingHorizontal: 8 },
  headerCell: { fontWeight: '700', color: '#374151' },
  btn: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  btnText: { color: 'white', fontWeight: '700' },
})
