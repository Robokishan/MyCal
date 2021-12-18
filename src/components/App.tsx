import { buildUrl } from 'build-url-ts'
import Avatar from 'components/Avatar'
import { Navigate, useNavigate } from 'react-router-dom'

function App() {
  let navigate = useNavigate()
  const responseGoogle = (response: any) => {
    console.log('Response google', response)
  }
  const redirect_uri = 'http://localhost:3000/callback'

  const options = {
    windowName: 'ConnectWithOAuth',
    // windowOptions: 'location=0,status=0,width=800,height=400',
    windowOptions:
      'menubar=no,location=yes,resizable=yes,scrollbars=no,status=no',
    callback: () => {
      window.location.reload()
    }
  }

  let googleauthurl = buildUrl('https://accounts.google.com', {
    path: '/o/oauth2/v2/auth',

    queryParams: {
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
      redirect_uri,
      response_type: 'token',
      scope:
        'https://www.googleapis.com/auth/calendar https://www.google.com/calendar/feeds/ https://www.google.com/calendar/feeds http://www.google.com/calendar/feeds/default/allcalendars/full https://www.google.com/calendar/feeds/default/owncalendars/full http://www.google.com/calendar/feeds/ http://www.google.com/calendar/feeds https://www.google.com/calendar/feeds/default/private/full http://www.google.com/calendar/feeds/default/private/full http://www.google.com/calendar/feeds/default/owncalendars/full/ https://www.google.com/calendar/feeds/default https://www.google.com/calendar/freebusy https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.freebusy https://www.googleapis.com/auth/calendar.events.owned https://www.googleapis.com/auth/calendar.events.owned.readonly https://www.googleapis.com/auth/calendar.events.public.readonly https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly'
    }
  })

  const onError = (error: any): void => {
    console.log('Error', error)
  }

  const onClickSignin = () => {
    window.open(googleauthurl, options.windowName, options.windowOptions)
  }
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-blue-600 uppercase">
            Welcome to
          </h2>
          <p className="my-3 text-4xl sm:text-5xl lg:text-6xl font-bold sm:tracking-tight text-gray-900">
            My Cal
          </p>
          <p className="text-xl text-gray-400">Schedule your time</p>
          <p className="mt-5">
            <Avatar
              size="large"
              src="https://kishanjoshi.dev/images/profile_pic.jpg"
            />
          </p>
          <div className="flex justify-center pt-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <a href={googleauthurl}>Google sign in</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
