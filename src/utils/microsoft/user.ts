import axios from 'axios'
import { getMicrosoftClientId, getMicrosoftClientSecret } from 'utils/google'

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
