import googleapi from './googleapi'
import { User } from './types'
import { ISchedule } from 'tui-calendar'
import { getColor } from './user'
import moment from 'moment'

export const getCalenderEvents = async (user: User) => {
  if (user.type == 'google') {
    const { data } = await googleapi.get(
      '/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: 'Bearer ' + user.access_token
        }
      }
    )
    return data
  }
}

export const parseCalendarInfo = (type: string, calendar: any): ISchedule[] => {
  if (type === 'google') {
    const items = calendar.items
    const parseSchedule = [] as ISchedule[]

    items?.forEach((item: any, index: number) => {
      if (item && item?.start) {
        const color = getColor(calendar.summary)
        // console.log(
        //   item.start,
        //   moment(item.start?.dateTime, moment.ISO_8601, true).isValid()
        // )
        parseSchedule.push({
          category: 'time',
          bgColor: color,
          id: String(index),
          title: item.summary,
          start: item.start?.dateTime || item.start?.date,
          end: item.end?.dateTime || item.end?.date
        })
      }
    })

    return parseSchedule
  } else if (type === 'outlook') {
    return []
  } else return []
}
