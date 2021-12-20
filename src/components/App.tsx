/* eslint-disable @typescript-eslint/no-explicit-any */
import Calendar from '@toast-ui/react-calendar'
import { buildUrl } from 'build-url-ts'
import Avatar from 'components/Avatar'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ISchedule } from 'tui-calendar'
import { getCalenderEvents } from 'utils/calendar'
import { getGoogleClientId, getMicrosoftClientId } from 'utils/google'
import { getMicrosoftAcessToken } from 'utils/microsoft/calendar'
import { getTailWindColor, getUsers, upsertUser } from 'utils/user'
import { getAccessToken } from 'utils/userApis'
import Modal from './Modal'

const getAllUsersEvent = async () => {
  const users = getUsers()
  toast.dismiss()
  const events = await Promise.all(
    users.map(async (user) => {
      try {
        const event = await getCalenderEvents(user)
        toast.info(`Updated ${user.email}`, { autoClose: 800 })
        return event
      } catch (error: any) {
        if (error.status == 401) {
          if (user.type == 'google') {
            const { access_token } = await getAccessToken(
              'google',
              user.refreshToken
            )
            user = {
              ...user,
              access_token
            }
            upsertUser(user)
          } else if (user.type == 'microsoft') {
            const { access_token } = await getMicrosoftAcessToken(
              user.refreshToken
            )
            user = {
              ...user,
              access_token
            }
            upsertUser(user)
          }
        }
        toast.error(`${user.email} ${error.data.error.errors[0].message}`)
      }
    })
  )
  return events
}

function App() {
  const defaultOptions = {
    dateRange: '',
    view: 'week',
    viewModeOptions: [
      {
        title: 'Monthly',
        value: 'month'
      },
      {
        title: 'Weekly',
        value: 'week'
      },
      {
        title: 'Daily',
        value: 'day'
      }
    ]
  }
  const { isLoading, error, data } = useQuery('events', getAllUsersEvent)
  const [schedules, setschedules] = useState<ISchedule[]>([])
  const navigate = useNavigate()
  const [view, setview] = useState('week')
  const calendarRef = useRef<any>(undefined)
  const [isModalOpen, setisModalOpen] = useState(false)
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

  // google url
  const googleauthurl = buildUrl('https://accounts.google.com', {
    path: '/o/oauth2/v2/auth',
    queryParams: {
      client_id: getGoogleClientId(),
      redirect_uri,
      prompt: 'consent',
      access_type: 'offline',
      response_type: 'code',
      scope:
        'https://www.googleapis.com/auth/calendar https://www.google.com/calendar/feeds/ https://www.google.com/calendar/feeds http://www.google.com/calendar/feeds/default/allcalendars/full https://www.google.com/calendar/feeds/default/owncalendars/full http://www.google.com/calendar/feeds/ http://www.google.com/calendar/feeds https://www.google.com/calendar/feeds/default/private/full http://www.google.com/calendar/feeds/default/private/full http://www.google.com/calendar/feeds/default/owncalendars/full/ https://www.google.com/calendar/feeds/default https://www.google.com/calendar/freebusy https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.freebusy https://www.googleapis.com/auth/calendar.events.owned https://www.googleapis.com/auth/calendar.events.owned.readonly https://www.googleapis.com/auth/calendar.events.public.readonly https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
    }
  })

  // microsoft url
  const microsofturl = buildUrl(
    'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    {
      queryParams: {
        client_id: getMicrosoftClientId(),
        redirect_uri: 'http://localhost:3000/microsoft/callback',
        prompt: 'select_account',
        response_type: 'code',
        response_mode: 'fragment',
        scope:
          'Calendars.Read Calendars.ReadWrite openid profile offline_access'
      }
    }
  )

  const onClickSignin = () => {
    window.open(googleauthurl, options.windowName, options.windowOptions)
  }
  const onChangeSelect = (e: any) => {
    setview(e.target.value)
  }

  useEffect(() => {
    console.log('data', data)
    if (data && data.length > 0) {
      const calenders = [] as ISchedule[]
      data &&
        data.length > 0 &&
        data?.forEach((_cal) => _cal?.forEach((_c: any) => calenders.push(_c)))
      const defaultCal = [
        {
          id: '1',
          calendarId: '0',
          title: 'TOAST UI Calendar Study',
          category: 'time',
          dueDateClass: '',
          start: new Date().toISOString(),
          end: new Date().toISOString()
        },
        {
          id: '2',
          calendarId: '0',
          title: 'Practice',
          category: 'milestone',
          dueDateClass: '',
          start: new Date().toISOString(),
          end: new Date().toISOString(),
          isReadOnly: true
        },
        {
          id: '3',
          calendarId: '0',
          title: 'FE Workshop',
          category: 'allday',
          dueDateClass: '',
          start: new Date().toISOString(),
          end: new Date().toISOString(),
          isReadOnly: true
        },
        {
          id: '4',
          calendarId: '0',
          title: 'Report',
          category: 'time',
          dueDateClass: '',
          start: new Date().toISOString(),
          end: new Date().toISOString()
        }
      ]
      setschedules(calenders)
    }
  }, [data])

  const generateData = () => {
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
      <p className="my-3 text-4xl sm:text-5xl lg:text-6xl font-bold sm:tracking-tight text-gray-900">
        Events Found
      </p>
    )
  }
  return (
    <div className="bg-white">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
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
            <a href={googleauthurl}>
              <button className="py-2 px-4 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded">
                Add Google Account
              </button>
            </a>
            <a href={microsofturl}>
              <button className="py-2 px-4 ml-7 font-bold text-white rounded bg-orange-400 hover:bg-orange-600">
                Add Outlook
              </button>
            </a>
          </div>
          <Modal
            closeModal={() => setisModalOpen(false)}
            modalIsOpen={isModalOpen}
          />
          <div className="flex justify-center pt-5">
            <button
              onClick={() => navigate('/users')}
              className="py-2 px-4 font-bold text-white bg-green-700 hover:bg-green-900 rounded"
            >
              List Users
            </button>
          </div>
          {generateData()}
          <div className="mx-10">
            {getUsers().map((user) => {
              const color = getTailWindColor(user.email, user.type)
              return (
                <div
                  key={`${user.email}-${user.type}`}
                  className={`${color} mx-2 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 text-white-700 rounded-full`}
                >
                  {user.email}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-5 my-10">
        <select
          className="py-1.5
      px-3
      m-0
      text-base
      font-normal
      text-gray-700
      rounded
      transition
      ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  mx-2    block
form-select appearance-none
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300"
          onChange={onChangeSelect}
          value={view}
        >
          {defaultOptions.viewModeOptions.map((option, index) => (
            <option
              selected={option.value == view}
              value={option.value}
              key={index}
            >
              {option.title}
            </option>
          ))}
        </select>
        <button
          onClick={() => calendarRef.current.getInstance().prev()}
          className="py-2 px-4 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => calendarRef.current.getInstance().today()}
          className="py-2 px-4 ml-7 font-bold text-white bg-green-500 hover:bg-green-600 rounded"
        >
          Today
        </button>
        <button
          onClick={() => calendarRef.current.getInstance().next()}
          className="py-2 px-4 ml-7 font-bold text-white rounded bg-orange-400 hover:bg-orange-600"
        >
          Next
        </button>
      </div>

      <Calendar
        ref={calendarRef}
        height="200px"
        view={view}
        scheduleView
        useDetailPopup
        taskView
        useCreationPopup
        schedules={schedules}
        usageStatistics={false}
        disableDblClick={true}
        disableClick={false}
        isReadOnly={false}
      />
    </div>
  )
}

export default App
