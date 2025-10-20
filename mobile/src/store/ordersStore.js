import { create } from 'zustand'
import useInventoryStore from './inventoryStore'

const useOrdersStore = create((set, get) => ({
  orders: [],
  createOrder: ({ type, items }) => {
    const id = `ord-${Date.now()}`
    const total = items.reduce((sum, it) => {
      const prod = useInventoryStore.getState().items.find((p) => p.id === it.itemId)
      return sum + (prod ? prod.price * it.qty : 0)
    }, 0)
    const order = {
      id,
      type, // 'Outlet' | 'Primary' | 'Subdistributor'
      items,
      total,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    set((s) => ({ orders: [order, ...s.orders] }))
    return order
  },
  updateOrderStatus: (id, status) => {
    const current = get().orders.find((o) => o.id === id)
    if (!current) return false

    if (status === 'Dispatched' && current.status !== 'Dispatched') {
      // reduce stock for each item
      current.items.forEach((it) => {
        useInventoryStore.getState().addOutgoing(it.itemId, it.qty, `order ${id}`)
      })
    }

    set((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }))
    return true
  },
}))

export default useOrdersStore
