export type Providers = 'google' | 'notion' | 'microsoft'

export type CalenderApiType = 'api' | 'caldav'
export interface User {
  type: Providers
  api: CalenderApiType
  token: string
  access_token: string
  refreshToken: string
  userId: string
  email: string
  jwt_token: string
}
export interface MessageType {
  message: string
  success: boolean
}

export interface UserProfile {
  profile: string
  name: string
  type?: Providers
  email: string
  verified_email: boolean
}
