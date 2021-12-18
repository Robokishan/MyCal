import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import Text from './Text'
import { getUsers, removeuser } from 'utils/user'
import { getUserInfo } from 'utils/userApis'
import Profile from './Profile'
import { useNavigate } from 'react-router-dom'

const getAllUsersInfos = async () => {
  const users = getUsers()
  const userInfos = await Promise.all(
    users.map(async (_user) => {
      try {
        const user = await getUserInfo(_user)
        return user
      } catch (error) {
        // throw error
        console.error('[ERROR_USERINFO]', error)
      }
    })
  )
  return userInfos
}

export default function Users(): ReactElement {
  const { isLoading, error, data, refetch } = useQuery(
    'users',
    getAllUsersInfos
  )

  const navigate = useNavigate()

  return (
    <>
      <div className="bg-white">
        <div className="pt-10 mx-auto max-w-screen-xl">
          <div className="text-center">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-bold sm:tracking-tight text-gray-900">
              All Users
            </p>
          </div>
          <div className="text-center">
            <button
              className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate('/')}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      {isLoading && !data && (
        <>
          <p className="my-3 text-4xl sm:text-5xl lg:text-6xl font-bold sm:tracking-tight text-gray-900">
            Loading...
          </p>
        </>
      )}

      {!isLoading && error && (
        <>
          <p className="my-3 text-4xl sm:text-5xl lg:text-6xl font-bold sm:tracking-tight text-gray-900">
            Something went wrong!
          </p>
        </>
      )}

      {!isLoading && data && (
        <>
          {data.map((user, index) => {
            return (
              <div className="p-2 divide-x mb-2" key={user.email}>
                <Profile
                  email={user.email}
                  profile={user.picture}
                  name={user.name}
                />
                <div className="flex justify-center pt-1">
                  <button
                    onClick={() => {
                      removeuser(index)
                      refetch()
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove User
                  </button>
                </div>
                <hr className="mt-10" />
              </div>
            )
          })}
        </>
      )}
    </>
  )
}
