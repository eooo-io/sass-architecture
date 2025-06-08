import axios from 'axios'
import { create } from 'zustand'

interface User {
  id: string
  email: string
  name: string
  roles: string[]
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
})

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null })
      const { data } = await api.post('/auth/login', { email, password })
      set({ user: data.user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      })
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null })
      await api.post('/auth/logout')
      set({ user: null, isAuthenticated: false, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      })
    }
  },

  signup: async (email: string, password: string, name: string) => {
    try {
      set({ isLoading: true, error: null })
      const { data } = await api.post('/auth/signup', { email, password, name })
      set({ user: data.user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      })
    }
  },
}))
