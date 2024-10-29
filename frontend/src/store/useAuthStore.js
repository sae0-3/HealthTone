import axios from 'axios'
import { create } from 'zustand'


export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,

  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),

  verifyToken: async (credentials) => {
    try {
      const response = await axios.get('http://localhost:4000/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })

      set({ isAuthenticated: true, user: response.data.user })
    } catch (err) {
      console.error('Token verification failed:', err)
      set({ isAuthenticated: false, user: null })
    }
  }
}))
