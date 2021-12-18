import googleapi from './googleapi'
import { User } from './types'
import { ISchedule } from 'tui-calendar'
import { getColor } from './user'

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

export const parseCalendarInfo = (type: string, calendar: any): ISchedule[] => {
  if (type === 'google') {
    const items = calendar.items
    const parseSchedule = items.map((item: any, index: number): ISchedule => {
      let color = getColor(calendar.summary)

      return {
        category: 'time',
        bgColor: color,
        id: String(index),
        title: item.summary,
        start: item.start?.dateTime,
        end: item.end?.dateTime
      }
    })
    return parseSchedule
  } else if (type === 'outlook') {
    return []
  } else return []
}
