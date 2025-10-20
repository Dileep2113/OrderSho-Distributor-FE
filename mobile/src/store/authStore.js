import { create } from 'zustand'

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email) => set({ isAuthenticated: true, user: { email, name: 'Admin User' } }),
  logout: () => set({ isAuthenticated: false, user: null }),
}))

export default useAuthStore
