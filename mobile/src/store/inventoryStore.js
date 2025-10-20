import { create } from 'zustand'

const initialItems = [
  { id: 'sku-001', name: 'Product A', price: 10, stock: 120 },
  { id: 'sku-002', name: 'Product B', price: 25, stock: 80 },
  { id: 'sku-003', name: 'Product C', price: 15, stock: 200 },
  { id: 'sku-004', name: 'Product D', price: 50, stock: 40 },
]

const useInventoryStore = create((set, get) => ({
  items: initialItems,
  incoming: [],
  outgoing: [],

  addIncoming: (itemId, qty, ref = 'manual') => {
    if (!qty || qty <= 0) return false
    const { items, incoming } = get()
    const item = items.find((i) => i.id === itemId)
    if (!item) return false
    const updatedItems = items.map((i) => (i.id === itemId ? { ...i, stock: i.stock + qty } : i))
    const record = { id: `in-${Date.now()}`, date: new Date().toISOString(), itemId, qty, ref }
    set({ items: updatedItems, incoming: [record, ...incoming] })
    return true
  },

  addOutgoing: (itemId, qty, ref = 'manual') => {
    if (!qty || qty <= 0) return false
    const { items, outgoing } = get()
    const item = items.find((i) => i.id === itemId)
    if (!item) return false
    if (item.stock < qty) return false
    const updatedItems = items.map((i) => (i.id === itemId ? { ...i, stock: i.stock - qty } : i))
    const record = { id: `out-${Date.now()}`, date: new Date().toISOString(), itemId, qty, ref }
    set({ items: updatedItems, outgoing: [record, ...outgoing] })
    return true
  },

  adjustStock: (itemId, delta, ref = 'adjust') => {
    if (!delta) return false
    if (delta > 0) {
      return get().addIncoming(itemId, delta, ref)
    }
    return get().addOutgoing(itemId, Math.abs(delta), ref)
  },
}))

export default useInventoryStore
