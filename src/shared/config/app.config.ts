export const APP_CONFIG = {
  production: import.meta.env.PROD,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  apiTimeout: 15000,
  tokenKey: 'token',
} as const

export type AppConfig = typeof APP_CONFIG
