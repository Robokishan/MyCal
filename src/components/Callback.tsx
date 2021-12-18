import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import Text from './Text'
import { parseParms } from 'utils/parser'
import googleapi from 'utils/googleapi'
import storage from 'utils/storage'

export default function Callback(): ReactElement {
  const location = useLocation()

  const params = parseParms(location.hash.substring(1))

  const requestTokens = async (code: string) => {
    const { data } = await googleapi.get(
      '/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: `Bearer ${code}`
        }
      }
    )
    console.log('data', data)
  }

  const requestTokenFromClient = () => {
    console.log('Request token')
  }

  if (params['access_token']) {
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
                Request Refresh Token
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <Text>Not Found</Text>
      <div className="bg-white">
        <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
          <div className="text-center">
            <button
              onClick={() => requestTokenFromClient()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Request Refresh Token
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
