import { defineStore } from 'pinia'
import { authApi } from '../api'
import { ref } from 'vue'
import { useUserStore } from '@/entities/user/model'
import { TokenStorage } from '@/shared/api/base/tokenStorage'
import type { LoginCredentials } from './auth'

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref<boolean>(false)

  async function login(credentials: LoginCredentials, signal?: AbortSignal) {
    const { setUser } = useUserStore()

    isLoading.value = true
    const res = await authApi.login({ ...credentials, signal })
    if (res.error) {
      isLoading.value = false
      return false
    }
    setUser(res.data.user)
    TokenStorage.setToken(res.data.token)
    isLoading.value = false
    return true
  }

  async function logout(signal?: AbortSignal) {
    const { clearUser } = useUserStore()
    isLoading.value = true
    const res = await authApi.logout(signal)
    if (res.error) {
      isLoading.value = false
      return false
    }
    TokenStorage.removeToken()
    clearUser()
    isLoading.value = false
    return true
  }

  async function fetchUserProfile(signal?: AbortSignal) {
    const { setUser } = useUserStore()
    isLoading.value = true
    const res = await authApi.getProfile(signal)
    if (res.error) {
      isLoading.value = false
      return res
    }
    setUser(res.data)
    TokenStorage.removeToken()
    isLoading.value = false
    return res
  }

  return { isLoading, login, logout, fetchUserProfile }
})
