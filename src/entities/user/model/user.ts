export type Role = 'professor' | 'escola' | 'admin'

export interface User {
  id: string
  name: string
  role: Role
}
