/**
 *Форматирует дату, которая пришла с фаербейса (Timestamp) в d/m hh:m
 *
 * @param {number} timeSpanSeconds Timestamp from FireBase
 * @return obj{ messageFullDate:Date + time,messageTime:time (no seconds)}
 */
const getDateAndTime = (timestamp: number) => {
  const buffDate = new Date(timestamp * 1000)

  const messageFullDate = buffDate.toLocaleString()
  const messageTime = buffDate.toLocaleTimeString().slice(0, -3)

  return {
    messageFullDate,
    messageTime,
  }
}

export { getDateAndTime }
