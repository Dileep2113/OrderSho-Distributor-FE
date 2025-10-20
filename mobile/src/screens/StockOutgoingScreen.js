import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native'
import useInventoryStore from '../store/inventoryStore'

export default function StockOutgoingScreen() {
  const items = useInventoryStore((s) => s.items)
  const outgoing = useInventoryStore((s) => s.outgoing)
  const addOutgoing = useInventoryStore((s) => s.addOutgoing)
  const [selected, setSelected] = useState(items?.[0]?.id || null)
  const [qty, setQty] = useState(1)

  const submit = () => {
    if (!selected || !qty) return
    addOutgoing(selected, qty, 'manual')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Outgoing Stock</Text>

      <Text style={styles.subheading}>Select Item</Text>
      <View style={styles.segment}>
        {items.map((it) => (
          <Pressable key={it.id} onPress={() => setSelected(it.id)} style={[styles.segmentItem, selected === it.id && styles.segmentActive]}> 
            <Text style={[styles.segmentText, selected === it.id && styles.segmentTextActive]}>{it.name}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.subheading}>Quantity</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Pressable onPress={() => setQty((q) => Math.max(1, q - 1))} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></Pressable>
        <Text style={styles.qty}>{qty}</Text>
        <Pressable onPress={() => setQty((q) => q + 1)} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></Pressable>
        <Pressable onPress={submit} style={styles.submit}><Text style={styles.submitText}>Remove</Text></Pressable>
      </View>

      <Text style={[styles.subheading, { marginTop: 16 }]}>Recent</Text>
      <FlatList
        data={outgoing}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => {
          const prod = items.find((p) => p.id === item.itemId)
          return (
            <View style={styles.row}>
              <Text style={styles.name}>{prod?.name || item.itemId}</Text>
              <Text style={[styles.meta, { color: '#ef4444' }]}>-{item.qty}</Text>
              <Text style={[styles.meta, { flex: 1 }]}>{new Date(item.date).toLocaleString()}</Text>
              <Text style={styles.meta}>{item.ref}</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  subheading: { fontSize: 16, fontWeight: '700', marginVertical: 8 },
  segment: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#f3f4f6', padding: 4, borderRadius: 8, gap: 6 },
  segmentItem: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 6, alignItems: 'center' },
  segmentActive: { backgroundColor: 'white' },
  segmentText: { color: '#6b7280', fontWeight: '600' },
  segmentTextActive: { color: '#111827' },
  qtyBtn: { width: 36, height: 36, borderRadius: 6, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 18, fontWeight: '700' },
  qty: { width: 36, textAlign: 'center', fontWeight: '800', fontSize: 16 },
  submit: { backgroundColor: '#ef4444', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  submitText: { color: 'white', fontWeight: '700' },
  sep: { height: 1, backgroundColor: '#e5e7eb' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  name: { flex: 1, fontWeight: '700' },
  meta: { color: '#6b7280', width: 120 },
})
