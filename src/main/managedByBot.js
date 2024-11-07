import * as states from './states.js'
import * as actions from './actions.js'
import { getSenderName, savePreferredLang, userData } from './user.js'
import { logAction } from './log.js'
import { handleUserData } from './handleUserData.js'
import { HANDLING_USER_DATA_OPTIONS, typeAnOption, sorryThisIsNotAValidOption } from './strings.js'

let handlingUserData = false

export const handleManagedByBot = async (client, message, userNumber, setState) => {
  const sendFeedback = async (state, isSubMenu) => {
    const userName = getSenderName(message, userNumber)
    let send = true
    let text
    switch (state) {
      case states.CANCELED:
      case states.FINISHED:
        text = isSubMenu ? 
          `*${userName}*, ${typeAnOption(HANDLING_USER_DATA_OPTIONS)}` :
          `*${userName}*, ${typeAnOption()}`
        break
      case states.ERROR:
        text = sorryThisIsNotAValidOption(userName, isSubMenu ? HANDLING_USER_DATA_OPTIONS : MAIN_OPTIONS)
        break
      default:
        send = false
    }
    if (send) await client.sendText(message.from, text)
  }

  let state
  let action

  state = states.STARTED
  const messageBody = message.body != null ? message.body.toLowerCase() : "?"
  const userName = getSenderName(message, userNumber)

  if (handlingUserData) {
    const result = await handleUserData(client, message, userNumber, sendFeedback)
    if (result.action === actions.GO_BACK) {
      handlingUserData = false
      await client.sendText(message.from, typeAnOption())
      logAction(message.from, states.FINISHED, actions.ENTER_OR_UPDATE_YOUR_DATA)
    }
    return
  }

  switch (messageBody) {
    case '1':
      action = actions.ENTER_OR_UPDATE_YOUR_DATA
      state = states.STARTED
      handlingUserData = true
      await client.sendText(message.from, typeAnOption(HANDLING_USER_DATA_OPTIONS))
      break
    case '2':
      action = actions.CHANGE_LANG
      state = states.FINISHED
      setLang(getLang() == en ? pt : en)
      savePreferredLang(userNumber)
      break
    case '3':
      action = actions.ABOUT_ME
      state = states.FINISHED
      await client.sendText(message.from, aboutMe(userName))
      break
    case '0':
      action = actions.RETURNING_TO_OWNER
      state = states.MANAGED_BY_OWNER
      await client.sendText(message.from, thanksForOurInteraction(userName, userData[userNumber].interactions))
      setState(message.from, state)
      break
    default:
      state = states.ERROR
  }

  if (!handlingUserData) sendFeedback(state, false)
  logAction(message.from, state, action)
}
