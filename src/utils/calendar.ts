import googleapi from './googleapi'
import { User } from './types'

export const getCalenderEvents = async (user: User) => {
  if (user.type == 'google') {
    const { data } = await googleapi.get(
      '/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      }
    )
    return data
  }
}

export const parseCalendarInfo = (type: string, calendar: any) => {
  if (type === 'google') {
    return {}
  } else if (type === 'outlook') {
    return {}
  }
}
