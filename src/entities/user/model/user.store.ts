import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Role, User } from './user'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null)

  const isAuthenticated = computed(() => !!currentUser.value)

  function setUser(user: User | null) {
    currentUser.value = user
  }

  function hasRole(role: Role) {
    return currentUser.value?.role === role
  }

  function clearUser() {
    currentUser.value = null
  }

  return {
    currentUser,
    isAuthenticated,
    setUser,
    clearUser,
    hasRole,
  }
})
