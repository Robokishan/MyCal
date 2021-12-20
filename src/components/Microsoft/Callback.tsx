/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-useless-catch */
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AUTH_CODE_TOKEN } from 'utils/constants'
import { getMicrosoftUser } from 'utils/microsoft/calendar'
import { getAccessRefreshToken } from 'utils/microsoft/user'
import { parseParms } from 'utils/parser'
import { upsertUser } from 'utils/user'
import Profile from '../Profile'
import Text from '../Text'

const authenticateUser = async (token: string) => {
  let user = await getAccessRefreshToken(token)
  const _user = await getMicrosoftUser(user.access_token)
  user = {
    ...user,
    ..._user
  }
  const { success, message } = upsertUser({
    api: 'api',
    userId: user.id,
    email: user.userPrincipalName,
    type: 'microsoft',
    access_token: user.access_token,
    refreshToken: user.refresh_token,
    token: user.token,
    jwt_token: user.id_token
  })
  success ? toast.success(message) : toast.info(message)
  return user
}

export default function Callback(): ReactElement {
  const location = useLocation()
  const navigate = useNavigate()
  const params = parseParms(location.hash.substring(1))

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
          className="py-2 px-4 mt-10 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded"
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
