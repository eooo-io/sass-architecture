import axios from 'axios'
import { create } from 'zustand'

interface User {
  id: string
  email: string
  name: string
  company: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, company: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (token: string, newPassword: string) => Promise<void>
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null })
      const { data } = await api.post('/auth/login', { email, password })
      set({ user: data.user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred during login',
        isLoading: false
      })
    }
  },

  signup: async (email: string, password: string, name: string, company: string) => {
    try {
      set({ isLoading: true, error: null })
      const { data } = await api.post('/auth/signup', { email, password, name, company })
      set({ user: data.user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred during signup',
        isLoading: false
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
        error: error instanceof Error ? error.message : 'An error occurred during logout',
        isLoading: false
      })
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ isLoading: true, error: null })
      await api.post('/auth/reset-password', { email })
      set({ isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred during password reset',
        isLoading: false
      })
    }
  },

  updatePassword: async (token: string, newPassword: string) => {
    try {
      set({ isLoading: true, error: null })
      await api.post('/auth/update-password', { token, newPassword })
      set({ isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred while updating password',
        isLoading: false
      })
    }
  },
}))

// Initialize auth state from localStorage
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token')
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    api.get('/auth/me')
      .then(response => {
        useAuth.setState({ user: response.data, isAuthenticated: true })
      })
      .catch(() => {
        localStorage.removeItem('token')
        delete api.defaults.headers.common.Authorization
      })
  }
}
