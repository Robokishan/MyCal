import googleapi from './googleapi'
import { User } from './types'
import { ISchedule } from 'tui-calendar'
import { getColor } from './user'
import { getMicrosoftCalendarEvents } from './microsoft/calendar'

export const getCalenderEvents = async (user: User) => {
  if (user.type == 'google') {
    const { data } = await googleapi.get(
      '/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: 'Bearer ' + user.access_token
        },
        params: {
          showDeleted: 'false'
        }
      }
    )
    return parseCalendarInfo('google', data)
  }

  if (user.type == 'microsoft') {
    let calendarEvents = await getMicrosoftCalendarEvents(user)

    calendarEvents = {
      ...calendarEvents,
      email: user.email
    }
    return parseCalendarInfo('microsoft', calendarEvents)
  }
}

export const parseCalendarInfo = (type: string, calendar: any): ISchedule[] => {
  if (type === 'google') {
    const items = calendar.items
    const parseSchedule = [] as ISchedule[]

    items?.forEach((item: any, index: number) => {
      if (item && item?.start) {
        const color = getColor(calendar.summary, type)

        const _p = {
          category: 'time',
          bgColor: color,
          borderColor: color,
          id: String(index),
          title: item.summary,
          start: item.start?.dateTime || item.start?.date,
          end: item.end?.dateTime || item.end?.date
        }
        parseSchedule.push(_p)
      }
    })

    return parseSchedule
  } else if (type === 'microsoft') {
    const events = [] as ISchedule[]
    if (calendar && calendar?.value?.length > 0) {
      calendar?.value?.forEach((_ev: any) => {
        const color = getColor(calendar.email, 'microsoft')
        events.push({
          category: 'time',
          bgColor: color,
          borderColor: color,
          id: _ev.id,
          title: _ev.subject,
          start: _ev.start?.dateTime,
          end: _ev.end?.dateTime
        })
      })
    }
    return events
  } else return []
}
