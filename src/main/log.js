import * as states from './states.js'
import { getFormatedTime, getNumber } from './util.js'

export const log = (message) => console.log(`${getFormatedTime()} | ${message}`)

export const logMessage = (from, message) => console.log(`${getFormatedTime()} | ${getNumber(from)} | ${message}`)

export const logState = (from, state) => logMessage(from, `state changed to: ${state}`)

export const logAction = (from, state, action) => {
  let text = 'action "'
  if (state === states.MANAGED_BY_OWNER || state === states.MANAGED_BY_BOT) {
    text += `${action}" ${states.FINISHED}`
  } else {
    text += `${action}" ${state}`
  }
  logMessage(from, text)
}
