import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import Text from './Text'
import { getUsers, removeuser } from 'utils/user'
import { getUserInfo } from 'utils/userApis'
import { getMicrosoftUserInfo } from 'utils/microsoft/calendar'
import Profile from './Profile'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const getAllUsersInfos = async () => {
  const users = getUsers()
  const userInfos = await Promise.all(
    users.map(async (_user) => {
      try {
        if (_user.type == 'google') return await getUserInfo(_user)
        if (_user.type == 'microsoft') return await getMicrosoftUserInfo(_user)
      } catch (error) {
        // throw error
        // just so incase
        return _user
        toast.error(`${_user.email} ${error}`)
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
              className="py-2 px-4 mt-10 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded"
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
            if (user) {
              return (
                <div className="p-2 mb-2 divide-x" key={user.email}>
                  <Profile
                    type={user.type}
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
                      className="py-2 px-4 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded"
                    >
                      Remove User
                    </button>
                  </div>
                  <hr className="mt-10" />
                </div>
              )
            }
          })}
        </>
      )}
    </>
  )
}
