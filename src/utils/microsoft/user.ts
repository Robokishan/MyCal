import axios from 'axios'
import { getMicrosoftClientId, getMicrosoftClientSecret } from 'utils/google'
import { MicroSoftTokenType } from 'utils/microsoft.type'

export const getAccessRefreshToken = async (code: string): Promise<any> => {
  const body = new FormData()
  body.append('code', code)
  body.append(
    'scope',
    'Calendars.Read Calendars.ReadWrite openid profile offline_access'
  )
  body.append('redirect_uri', 'http://localhost:3000/microsoft/callback')
  body.append('client_id', getMicrosoftClientId())
  body.append('client_secret', getMicrosoftClientSecret())
  body.append('grant_type', 'authorization_code')

  const { data } = await axios.post(
    'https://robo-nginx.herokuapp.com/microsoft/common/oauth2/v2.0/token',

    body
  )
  return data
}
export const refreshAccessToken = async (
  refresh_token: string
): Promise<MicroSoftTokenType> => {
  const body = new FormData()
  body.append(
    'scope',
    'Calendars.Read Calendars.ReadWrite openid profile offline_access'
  )
  body.append('refresh_token', refresh_token)
  body.append('client_id', getMicrosoftClientId())
  body.append('client_secret', getMicrosoftClientSecret())
  body.append('grant_type', 'refresh_token')

  const { data } = await axios.post(
    'https://robo-nginx.herokuapp.com/microsoft/common/oauth2/v2.0/token',

    body
  )
  console.log('token-123', data)
  return data
}
