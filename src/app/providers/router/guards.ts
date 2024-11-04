import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStore } from '@/entities/user/model/user.store'
import { useAuthStore } from '@/features/auth/model/auth.store'
import { TokenStorage } from '@/shared/api/base/tokenStorage'
import type { Role } from '@/entities/user/model/user'

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const userStore = useUserStore()
  const authStore = useAuthStore()

  // Check authentication status if token exists but no user
  if (TokenStorage.getToken() && !userStore.currentUser) {
    await authStore.fetchUserProfile()
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
    return
  }

  if (to.meta.requiresRole) {
    const requiredRole = to.meta.requiresRole as Role
    if (!userStore.hasRole(requiredRole)) {
      next(from)
      return
    }
  }

  next()
}
