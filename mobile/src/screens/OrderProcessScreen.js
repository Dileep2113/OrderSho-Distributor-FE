import React, { useMemo, useState } from 'react'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import useOrdersStore from '../store/ordersStore'

const TYPES = ['All', 'Outlet', 'Primary', 'Subdistributor']
const STATUS_ACTIONS = {
  Pending: ['Approve', 'Cancel'],
  Approved: ['Dispatch', 'Cancel'],
  Dispatched: [],
  Cancelled: [],
}

export default function OrderProcessScreen() {
  const orders = useOrdersStore((s) => s.orders)
  const updateStatus = useOrdersStore((s) => s.updateOrderStatus)
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const list = useMemo(() => {
    return orders.filter((o) => (typeFilter === 'All' || o.type === typeFilter) && (statusFilter === 'All' || o.status === statusFilter))
  }, [orders, typeFilter, statusFilter])

  const onAction = (order, action) => {
    if (action === 'Approve') updateStatus(order.id, 'Approved')
    if (action === 'Dispatch') updateStatus(order.id, 'Dispatched')
    if (action === 'Cancel') updateStatus(order.id, 'Cancelled')
  }

  const renderActions = (order) => {
    const actions = STATUS_ACTIONS[order.status] || []
    return (
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {actions.map((a) => (
          <Pressable key={a} onPress={() => onAction(order, a)} style={[styles.actionBtn, a === 'Cancel' && styles.actionCancel]}>
            <Text style={[styles.actionText, a === 'Cancel' && styles.actionTextCancel]}>{a}</Text>
          </Pressable>
        ))}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Orders Process</Text>

      <Text style={styles.subheading}>Type</Text>
      <View style={styles.segment}>
        {TYPES.map((t) => (
          <Pressable key={t} onPress={() => setTypeFilter(t)} style={[styles.segmentItem, typeFilter === t && styles.segmentActive]}> 
            <Text style={[styles.segmentText, typeFilter === t && styles.segmentTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.subheading}>Status</Text>
      <View style={styles.segment}>
        {['All', 'Pending', 'Approved', 'Dispatched', 'Cancelled'].map((s) => (
          <Pressable key={s} onPress={() => setStatusFilter(s)} style={[styles.segmentItem, statusFilter === s && styles.segmentActive]}> 
            <Text style={[styles.segmentText, statusFilter === s && styles.segmentTextActive]}>{s}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.orderId}>{item.id}</Text>
              <Text style={styles.meta}>{item.type} • {new Date(item.createdAt).toLocaleString()}</Text>
              <Text style={styles.meta}>Items: {item.items.reduce((sum, it) => sum + it.qty, 0)} • Total: ${item.total.toFixed(2)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.badge, styles[`badge_${item.status}`]]}>{item.status}</Text>
              {renderActions(item)}
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
  subheading: { fontSize: 16, fontWeight: '700', marginVertical: 8 },
  segment: { flexDirection: 'row', backgroundColor: '#f3f4f6', padding: 4, borderRadius: 8, gap: 6 },
  segmentItem: { flex: 1, paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  segmentActive: { backgroundColor: 'white' },
  segmentText: { color: '#6b7280', fontWeight: '600' },
  segmentTextActive: { color: '#111827' },
  sep: { height: 1, backgroundColor: '#e5e7eb' },
  row: { flexDirection: 'row', paddingVertical: 12 },
  orderId: { fontWeight: '800' },
  meta: { color: '#6b7280' },
  badge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999, color: 'white', fontSize: 12, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  badge_Pending: { backgroundColor: '#64748b' },
  badge_Approved: { backgroundColor: '#0ea5e9' },
  badge_Dispatched: { backgroundColor: '#10b981' },
  badge_Cancelled: { backgroundColor: '#ef4444' },
  actionBtn: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, backgroundColor: '#0ea5e9' },
  actionCancel: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ef4444' },
  actionText: { color: 'white', fontWeight: '700' },
  actionTextCancel: { color: '#ef4444' },
})
