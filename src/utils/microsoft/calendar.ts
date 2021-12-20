import { User, UserProfile } from 'utils/types'
import microsoftapis from './microsoftapis'

export const getMicrosoftCalendarEvents = async (user: User) => {
  const { data } = await microsoftapis.get('/v1.0/me/events', {
    headers: {
      Authorization: `Bearer ${user.access_token}`
    }
  })
  return data
}

export const getMicrosoftUserInfo = async (
  user: User
): Promise<UserProfile> => {
  const { data } = await microsoftapis.get('/v1.0/me/', {
    headers: {
      Authorization: `Bearer ${user.access_token}`
    }
  })
  const userprofile = {
    email: data.userPrincipalName,
    name: data.displayName,
    profile: '',
    verified_email: false,
    type: user.type
  } as UserProfile
  return userprofile
}

export const getMicrosoftUser = async (token: string): Promise<any> => {
  const { data } = await microsoftapis.get('/v1.0/me/', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getMicrosoftAcessToken = async (token: string): Promise<any> => {
  const { data } = await microsoftapis.get('/v1.0/me/', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}
