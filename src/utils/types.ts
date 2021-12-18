export interface User {
  type: 'google' | 'notion' | 'outlook'
  api: 'api' | 'caldav'
  token: string
  userId: string
  email: string
}
export interface MessageType {
  message: string
  success: boolean
}

export interface UserProfile {
  profile: string
  name: string
  email: string
  verified_email: boolean
}
