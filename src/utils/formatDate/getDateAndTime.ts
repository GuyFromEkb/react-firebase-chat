/**
 *Форматирует дату, которая пришла с фаербейса (Timestamp) в d/m hh:m
 *
 * @param {number} timeSpanSeconds Timestamp from FireBase
 * @return string d/m hh:m
 */
const getDateAndTime = (timestamp: number) => {
  const messageDate = new Date(timestamp * 1000)
  const month = messageDate.getMonth()
  const dayNumb = messageDate.getDate()
  const hour = messageDate.getHours()
  const minutes = messageDate.getMinutes()

  const messageTime = `${dayNumb}.${month} ${hour}:${minutes}`
  return messageTime
}

export { getDateAndTime }
