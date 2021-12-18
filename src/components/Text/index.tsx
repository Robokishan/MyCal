import React, { ReactElement } from 'react'

interface Props {
  children: any
}

export default function index({ children }: Props): ReactElement {
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
        <div className="text-center">
          <p className="text-xl break-all  text-gray-400">{children}</p>
        </div>
      </div>
    </div>
  )
}
