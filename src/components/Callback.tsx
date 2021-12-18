import { ReactElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'
import Text from './Text'
import { parseParms } from 'utils/parser'
import googleapi from 'utils/googleapi'
import Profile from './Profile'
import { upsertUser } from 'utils/user'

const getUserInfo = async (token: string) => {
  try {
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
  } catch (error) {
    throw error
  }
}

const authenticateUser = async (token: string) => {
  const _user = await getUserInfo(token)
  return _user
}

export default function Callback(): ReactElement {
  const location = useLocation()
  const navigate = useNavigate()
  const params = parseParms(location.hash.substring(1))

  if (!params['access_token']) {
    return <Text>Not Found</Text>
  }

  const code = params['access_token']
  const { isLoading, error, data } = useQuery(['Authenticate', code], () =>
    authenticateUser(code)
  )

  if (isLoading)
    return (
      <p className="my-3 text-4xl sm:text-5xl lg:text-6xl font-bold sm:tracking-tight text-gray-900">
        Loading...
      </p>
    )

  if (error)
    return (
      <p className="my-3 text-4xl sm:text-5xl lg:text-6xl font-bold sm:tracking-tight text-gray-900">
        Something went wrong
      </p>
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
      <Profile
        key={data.email}
        profile={data.picture}
        email={data.email}
        name={data.name}
      />
    </>
  )
}
