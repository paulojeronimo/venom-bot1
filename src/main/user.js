import fs from 'fs'
import path from 'path'

import * as states from './states.js'
import * as actions from './actions.js'
import { logAction } from './log.js'
import { getFirstName } from './util.js'

const MAP_FIELD_TO_ACTION = {
  fullName: actions.ENTER_FULL_NAME,
  email: actions.ENTER_EMAIL
}

export const userData = {}

export const getSenderName = (message, userNumber) => {
  if (userData[userNumber]?.fullName) return getFirstName(userData[userNumber].fullName)
  if (message.sender.name) return message.sender.name
  return userNumber
}
 
export const handleUserInput = async (client, message, userNumber, field, validationFn, canceledFn, inputIsValid) => {
  const input = message.body.trim()
  let state = states.FINISHED
  if (!canceledFn(input)) {
    const result = validationFn(input)
    if (result.isValid) {
      userData[userNumber][field] = input
      saveUserData(userNumber)
      await client.sendText(message.from, inputIsValid(field, input))
    } else {
      await client.sendText(message.from, inputIsInvalid(field, result.validationError))
      state = states.ERROR
    }
  } else {
    await client.sendText(message.from, actionCanceled(field))
    state = states.CANCELED
  }

  logAction(message.from, state, MAP_FIELD_TO_ACTION[field])
  return state
}

export const promptUserInput = async (client, message, userNumber, actionType, field) => {
  const awaitingField = true
  const lang = getLang()
  let text
  if (!userData[userNumber]?.[field]) {
    text = okPleaseUpdateYourField(ENTER[lang], field)
  } else {
    text = okPleaseUpdateYourField(UPDATE[lang], field)
    text += `\n${currentDataForField(userData, userNumber, field)}`
  }
  text += `\n${CANCEL_MESSAGE[lang]}`
  await client.sendText(message.from, text)
  return { action: actionType, awaitingField }
}

const getUserDataFilePath = (userNumber) => path.join(process.env.DATA_DIR, userNumber, 'data.json')

export const loadUserData = (userNumber) => {
  const userDataFilePath = getUserDataFilePath(userNumber)
  if (fs.existsSync(userDataFilePath)) {
      const data = fs.readFileSync(userDataFilePath)
      return JSON.parse(data)
  }
  return {}
}

export const saveUserData = (userNumber) => {
  const userDataFilePath = getUserDataFilePath(userNumber)
  fs.mkdirSync(path.dirname(userDataFilePath), { recursive: true })
  fs.writeFileSync(userDataFilePath, JSON.stringify(userData[userNumber], null, 2))
}

export const savePreferredLang = (userNumber) => {
  userData[userNumber].preferredLang = getLang()
  saveUserData(userNumber)  
}
