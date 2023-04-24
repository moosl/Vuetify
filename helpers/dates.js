import moment from 'moment'

export const dateRandom = (start = '1971-01-01', end = '2000-01-01') => {
  const asDates = {
    start: new Date(start),
    end: new Date(end)
  }
  const diff = asDates.end.getTime() - asDates.start.getTime()
  const new_diff = diff * Math.random()
  const date = new Date(asDates.start.getTime() + new_diff)
  return date.toISOString().substring(0, 10)
}

export const dateRelative = (date) => moment.utc(new Date(date)).local().fromNow()
