import googleapi from './googleapi'
import { User } from './types'

export const getUserInfo = async (user: User) => {
  if (user.type == 'google') {
    const { data } = await googleapi.get('/oauth2/v2/userinfo', {
      headers: {
        Authorization: 'Bearer ' + user.token
      }
    })
    return data
  }
}
