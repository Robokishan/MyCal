import { ReactElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Text from './Text'
import { parseParms } from 'utils/parser'
import googleapi from 'utils/googleapi'
import storage from 'utils/storage'
import Profile from './Profile'
import { saveUser, upsertUser } from 'utils/user'
import { toast } from 'react-toastify'

interface User {
  profile: string
  name: string
  email: string
  verified_email: boolean
}

export default function Callback(): ReactElement {
  const location = useLocation()
  const [usersState, setUsers] = useState<User[]>([])
  const params = parseParms(location.hash.substring(1))

  const requestTokens = async (token: string) => {
    const { data } = await googleapi.get(
      '/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    console.log('Calendar Events', data)
    const _user = await getUserInfo(token)
    setUsers((states) => [
      ...states,
      {
        profile: _user.picture,
        name: `${_user.given_name} ${_user.family_name}`,
        email: _user.email,
        verified_email: _user.verified_email as boolean
      }
    ])
  }

  const getUserInfo = async (token: string) => {
    const { data } = await googleapi.get('/oauth2/v2/userinfo', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    const { success, message } = upsertUser({
      api: 'api',
      userId: data.id,
      email: data.email,
      type: 'google',
      token: token
    })
    success ? toast.success(message) : toast.info(message)
    return data
  }

  if (!params['access_token']) {
    return <Text>Not Found</Text>
  }

  const code = params['access_token']
  storage.setToken(code)

  return (
    <>
      <Text>{code}</Text>
      <div className="bg-white">
        <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
          <div className="text-center">
            <button
              onClick={() => requestTokens(code)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Events
            </button>
          </div>
        </div>
      </div>
      {usersState.map((user) => (
        <Profile
          key={user.email}
          profile={user.profile}
          email={user.email}
          name={user.name}
        />
      ))}
    </>
  )
}
