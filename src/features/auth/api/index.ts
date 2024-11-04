import { httpClient } from '@/shared/api'
import type { LoginResponse } from '../model'
import type { User } from '@/entities/user/model'

export const authApi = {
  async login({
    email,
    password,
    signal,
  }: {
    email: string
    password: string
    signal?: AbortSignal
  }) {
    return await httpClient.post<LoginResponse>(
      '/auth/login',
      {
        email,
        password,
      },
      { signal },
    )
  },

  async logout(signal?: AbortSignal) {
    return await httpClient.post<void>('/auth/logout', undefined, { signal })
  },

  async getProfile(signal?: AbortSignal) {
    return await httpClient.post<User>('/auth/me', undefined, { signal })
  },
}
