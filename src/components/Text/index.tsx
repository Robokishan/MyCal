import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: any
}

export default function index({ children }: Props): ReactElement {
  const navigate = useNavigate()
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
        <div className="text-center">
          <p className="my-3 text-4xl sm:text-5xl lg:text-6xl font-bold sm:tracking-tight text-gray-900">
            Auth
          </p>
          <p className="text-xl text-gray-400">{children}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate('/')}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
