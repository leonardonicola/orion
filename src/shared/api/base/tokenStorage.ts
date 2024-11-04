import { APP_CONFIG } from '@/shared/config'

export const TokenStorage = {
  getToken: (): string | null => {
    return localStorage.getItem(APP_CONFIG.tokenKey)
  },

  setToken: (token: string): void => {
    localStorage.setItem(APP_CONFIG.tokenKey, token)
  },

  removeToken: (): void => {
    localStorage.removeItem(APP_CONFIG.tokenKey)
  },
}
