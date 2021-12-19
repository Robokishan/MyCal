import { ReactElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'
import Text from './Text'
import { parseParms } from 'utils/parser'
import googleapi from 'utils/googleapi'
import Profile from './Profile'
import { upsertUser } from 'utils/user'
import { AUTH_CODE_TOKEN } from 'utils/constants'
import { getAccessRefreshToken } from 'utils/userApis'

const getUserInfo = async (token: string) => {
  try {
    const { data } = await googleapi.get('/oauth2/v2/userinfo', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    return data
  } catch (error) {
    throw error
  }
}

const authenticateUser = async (token: string) => {
  let user = await getAccessRefreshToken('google', token)

  const _user = await getUserInfo(user.access_token)
  user = {
    ...user,
    ..._user
  }
  const { success, message } = upsertUser({
    api: 'api',
    userId: user.id,
    email: user.email,
    type: 'google',
    access_token: user.access_token,
    refreshToken: user.refresh_token,
    token: user.token,
    jwt_token: user.id_token
  })
  success ? toast.success(message) : toast.info(message)
  return _user
}

export default function Callback(): ReactElement {
  const location = useLocation()
  const navigate = useNavigate()
  const params = parseParms(location.search.substring(1))

  if (!params[AUTH_CODE_TOKEN]) {
    return <Text>Not Found</Text>
  }

  const code = params[AUTH_CODE_TOKEN]
  const { isLoading, error, data } = useQuery(['Authenticate', code], () =>
    authenticateUser(code)
  )

  return (
    <>
      <Text>{code}</Text>
      <div className="text-center">
        <button
          className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
      {isLoading && !data && (
        <p className="my-3 text-4xl sm:text-5xl lg:text-6xl font-bold sm:tracking-tight text-gray-900">
          Loading...
        </p>
      )}
      {!isLoading && error && (
        <p className="my-3 text-4xl sm:text-5xl lg:text-6xl font-bold sm:tracking-tight text-gray-900">
          Something went wrong
        </p>
      )}
      {!isLoading && data && (
        <Profile
          key={data.email}
          profile={data.picture}
          email={data.email}
          name={data.name}
        />
      )}
    </>
  )
}
