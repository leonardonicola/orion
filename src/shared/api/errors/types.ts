export type ErrorSeverity = 'error' | 'warning' | 'info'

export type ApiResponse<T> =
  | {
      data: T
      error: null
    }
  | { data: null; error: AppError }

export interface AppError {
  code: string
  message: string
  severity: ErrorSeverity
  details?: ApiError['errors']
}

export interface ApiError {
  message?: string
  error?: string
  errors?: Record<string, string[]>
}
