export interface User {
  type: 'google' | 'notion' | 'outlook'
  api: 'api' | 'caldav'
  token: string
}
