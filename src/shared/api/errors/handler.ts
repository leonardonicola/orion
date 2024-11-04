import type { AxiosError } from 'axios'
import type { AppError, ApiError } from './types'
import { ERROR_CODES } from './constants'

export const handleError = (error: AxiosError<ApiError>): AppError => {
  // Network errors
  if (!error.response) {
    return {
      code: ERROR_CODES.NETWORK,
      message: 'Não foi possível estabelecer conexão com a internet!',
      severity: 'error',
    }
  }

  const { status, data } = error.response

  // Map common HTTP status codes
  switch (status) {
    case 401:
      return {
        code: ERROR_CODES.UNAUTHORIZED,
        message: data.message ?? 'Por favor, faça login antes de prosseguir!',
        severity: 'warning',
      }
    case 403:
      return {
        code: ERROR_CODES.FORBIDDEN,
        message:
          data.message ?? 'Você não tem as permissões para realizar essa ação!',
        severity: 'warning',
      }
    case 404:
      return {
        code: ERROR_CODES.NOT_FOUND,
        message: data.message ?? 'O recurso não foi encontrado!',
        severity: 'warning',
      }
    case 422:
      return {
        code: ERROR_CODES.VALIDATION,
        message: data.message ?? 'Problemas na validação',
        severity: 'warning',
        details: data.errors,
      }
    case 500:
      return {
        code: ERROR_CODES.SERVER,
        message:
          data.message ?? 'Erro interno. Por favor, tente novamente mais tarde',
        severity: 'error',
      }
    default:
      return {
        code: ERROR_CODES.UNKNOWN,
        message: data.message ?? 'Um erro inesperado ocorreu!',
        severity: 'error',
      }
  }
}
