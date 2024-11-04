import axios, { type AxiosRequestConfig } from 'axios'
import { APP_CONFIG } from '../../config'
import { TokenStorage } from './tokenStorage'
import { handleError } from '../errors/handler'
import type { ApiResponse } from '../errors/types'

const createHttpClient = (apiUrl: string) => {
  const instance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    // ms
    timeout: 30 * 1000,
    timeoutErrorMessage: 'Tempo expirado para resposta do servidor!',
  })

  instance.interceptors.request.use((config) => {
    const token = TokenStorage.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config

      // Handle Unauthorized
      if (err.response?.status === 401 && originalRequest) {
        TokenStorage.removeToken()
        window.location.href = '/login'
      }

      return Promise.reject(err)
    },
  )

  return instance
}

const httpClient = createHttpClient(APP_CONFIG.apiUrl)

export const apiClient = {
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return httpClient
      .get(url, config)
      .then((res) => ({ data: res.data, error: null }))
      .catch((err) => ({ data: null, error: handleError(err) }))
  },

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return httpClient
      .post(url, data, config)
      .then((res) => ({ data: res.data, error: null }))
      .catch((err) => ({ data: null, error: handleError(err) }))
  },

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return httpClient
      .delete(url, config)
      .then((res) => ({ data: res.data, error: null }))
      .catch((err) => ({ data: null, error: handleError(err) }))
  },
}

export { apiClient as httpClient }
