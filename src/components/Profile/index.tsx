import Avatar from 'components/Avatar'
import React, { ReactElement } from 'react'

interface Props {
  profile: string
  name: string
  email: string
}

export default function index({ profile, name, email }: Props): ReactElement {
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-blue-600 uppercase">
            {name}
          </h2>
          <p className="my-3 text-4xl sm:text-5xl lg:text-6xl font-bold sm:tracking-tight text-gray-900">
            {email}
          </p>
          <p className="text-xl text-gray-400">Schedule your time</p>
          <p className="mt-5">
            <Avatar size="large" src={profile} />
          </p>
          <div className="flex justify-center pt-5"></div>
        </div>
      </div>
    </div>
  )
}
