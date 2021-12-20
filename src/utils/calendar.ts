import googleapi from './googleapi'
import { User } from './types'
import { ISchedule } from 'tui-calendar'
import { getColor } from './user'
import moment from 'moment'
import { getMicrosoftCalendarEvents } from './microsoft/calendar'

export const getCalenderEvents = async (user: User) => {
  if (user.type == 'google') {
    console.log(moment().subtract(6, 'months').toISOString())
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
        //   console.log(
        //     item.start,
        //     moment(item.start?.dateTime, moment.ISO_8601, true).isValid()
        //   )
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
        if (
          item?.start.dateTime &&
          item?.start?.dateTime.includes('2021-12') &&
          calendar.summary == 'kishan@oizom.com'
        )
          console.log(_p, item.start.dateTime, item.summary)
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
