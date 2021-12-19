import { getClientId, getClientSecret } from './google'
import googleapi from './googleapi'
import oauth2google from './oauth.google'
import { Providers, User } from './types'

export const getUserInfo = async (user: User) => {
  if (user.type == 'google') {
    const { data } = await googleapi.get('/oauth2/v2/userinfo', {
      headers: {
        Authorization: 'Bearer ' + user.access_token
      }
    })
    return data
  }
}

export const getAccessRefreshToken = async (type: Providers, token: string) => {
  if (type == 'google') {
    const { data } = await oauth2google.post(
      '/token',
      {},
      {
        params: {
          code: token,
          redirect_uri: 'http://localhost:3000/callback',
          client_id: getClientId(),
          client_secret: getClientSecret(),
          grant_type: 'authorization_code',
          scope: ''
        }
      }
    )
    return data
  }
}

export const getAccessToken = async (
  type: Providers,
  refresh_token: string
) => {
  if (type == 'google') {
    const { data } = await oauth2google.post(
      '/token',
      {},
      {
        params: {
          client_id: getClientId(),
          client_secret: getClientSecret(),
          grant_type: 'refresh_token',
          refresh_token: refresh_token
        }
      }
    )
    return data
  }
}
