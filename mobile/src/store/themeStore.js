import { create } from 'zustand'

const useThemeStore = create((set) => ({
  theme: 'light',
  toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
}))

export default useThemeStore
