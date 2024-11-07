import * as states from './states.js'
import * as actions from './actions.js'
import { validateFullName, validateEmail } from './validators.js'
import { userData, handleUserInput, promptUserInput } from './user.js'
import { logAction } from './log.js'
import { hereAreAllTheData } from './strings.js'

let awaitingFullName = false
let awaitingEmail = false

export const handleUserData = async (client, message, userNumber, sendFeedback) => {
  const canceledInput = (input) => input === '0'
  let state

  if (awaitingFullName) {
    state = await handleUserInput(client, message, userNumber,
      'fullName', validateFullName, canceledInput, thanksForUpdate)
    awaitingFullName = state == states.ERROR
    if (!awaitingFullName) sendFeedback(state, true)
    return state
  }

  if (awaitingEmail) {
    state = await handleUserInput(client, message, userNumber,
      'email', validateEmail, canceledInput, thanksForUpdate)
    awaitingEmail = state == states.ERROR
    if (!awaitingEmail) sendFeedback(state, true)
    return state
  }

  state = states.STARTED
  let action = actions.ENTER_INVALID_DATA
  const messageBody = message.body != null ? message.body.toLowerCase() : "?"

  switch (messageBody) {
    case '1':
      ({ action, awaitingField: awaitingFullName } = await promptUserInput(
        client, message, userNumber, actions.ENTER_FULL_NAME, 'fullName'))
      break
    case '2':
      ({ action, awaitingField: awaitingEmail } = await promptUserInput(
        client, message, userNumber, actions.ENTER_EMAIL, 'email'))
      break
    case '3':
      action = actions.CHECK_YOUR_DATA
      state = states.FINISHED
      await client.sendText(message.from, hereAreAllTheData(userData, userNumber))
      break
    case '0':
      action = actions.GO_BACK
      state = states.FINISHED
      return { state, action }
    default:
      state = states.ERROR
  }

  sendFeedback(state, true)
  logAction(message.from, state, action)
  return { state, action }
}
