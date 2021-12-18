import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { UserProfile } from 'utils/types'
import { getUsers } from 'utils/user'
import { getUserInfo } from 'utils/userApis'
import Profile from './Profile'

const getAllUsersInfos = async () => {
  const users = getUsers()
  const userInfos = await Promise.all(
    users.map(async (_user) => {
      try {
        const user = await getUserInfo(_user)
        return user
      } catch (error) {
        throw error
      }
    })
  )
  return userInfos
}

export default function Users(): ReactElement {
  const { isLoading, error, data } = useQuery('users', getAllUsersInfos)

  return (
    <>
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
          {data.map((user) => (
            <Profile
              key={user.email}
              email={user.email}
              profile={user.picture}
              name={user.name}
            />
          ))}
        </>
      )}
    </>
  )
}
