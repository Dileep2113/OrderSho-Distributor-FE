import React, { useMemo, useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import useInventoryStore from '../store/inventoryStore'
import useOrdersStore from '../store/ordersStore'

const TYPES = ['Outlet', 'Primary', 'Subdistributor']

export default function OrderCreateScreen() {
  const items = useInventoryStore((s) => s.items)
  const createOrder = useOrdersStore((s) => s.createOrder)
  const [type, setType] = useState('Outlet')
  const [qty, setQty] = useState({})

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + (qty[item.id] || 0) * item.price, 0)
  }, [qty, items])

  const hasSelection = useMemo(() => Object.values(qty).some((v) => v > 0), [qty])

  const increment = (id) => setQty((q) => ({ ...q, [id]: (q[id] || 0) + 1 }))
  const decrement = (id) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) - 1) }))
  const clear = () => setQty({})

  const submit = () => {
    const orderItems = items
      .map((i) => ({ itemId: i.id, qty: qty[i.id] || 0 }))
      .filter((i) => i.qty > 0)
    if (!orderItems.length) return
    createOrder({ type, items: orderItems })
    clear()
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Order</Text>

      <Text style={styles.subheading}>Order Type</Text>
      <View style={styles.segment}>
        {TYPES.map((t) => (
          <Pressable key={t} onPress={() => setType(t)} style={[styles.segmentItem, type === t && styles.segmentActive]}> 
            <Text style={[styles.segmentText, type === t && styles.segmentTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.subheading, { marginTop: 12 }]}>Products</Text>
      {items.map((item) => {
        const q = qty[item.id] || 0
        return (
          <View key={item.id} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>${item.price} • In stock: {item.stock}</Text>
            </View>
            <View style={styles.qtyBox}>
              <Pressable onPress={() => decrement(item.id)} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></Pressable>
              <Text style={styles.qty}>{q}</Text>
              <Pressable onPress={() => increment(item.id)} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></Pressable>
            </View>
          </View>
        )
      })}

      <View style={styles.summary}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Pressable onPress={clear} style={[styles.btn, styles.btnSecondary]}>
            <Text style={[styles.btnText, styles.btnTextSecondary]}>Clear</Text>
          </Pressable>
          <Pressable onPress={submit} disabled={!hasSelection} style={[styles.btn, !hasSelection && styles.btnDisabled]}>
            <Text style={styles.btnText}>Submit Order</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  subheading: { fontSize: 16, fontWeight: '700', marginVertical: 8 },
  segment: { flexDirection: 'row', backgroundColor: '#f3f4f6', padding: 4, borderRadius: 8, gap: 6 },
  segmentItem: { flex: 1, paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  segmentActive: { backgroundColor: 'white' },
  segmentText: { color: '#6b7280', fontWeight: '600' },
  segmentTextActive: { color: '#111827' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#e5e7eb' },
  itemName: { fontWeight: '700' },
  itemMeta: { color: '#6b7280' },
  qtyBox: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: { width: 32, height: 32, borderRadius: 6, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 18, fontWeight: '700' },
  qty: { width: 24, textAlign: 'center', fontWeight: '700' },
  summary: { marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  total: { fontWeight: '800', fontSize: 18 },
  btn: { backgroundColor: '#0ea5e9', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 8 },
  btnText: { color: 'white', fontWeight: '700' },
  btnSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#e5e7eb' },
  btnTextSecondary: { color: '#111827' },
  btnDisabled: { opacity: 0.5 },
})
