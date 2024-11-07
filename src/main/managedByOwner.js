import * as states from './states.js'
import * as actions from './actions.js'
import { validateBotString } from './validators.js'
import { userData, getSenderName, saveUserData } from './user.js'
import { logMessage, logAction } from './log.js'

export const handleManagedByOwner = async (client, message, userNumber, setState) => {
  const messageBody = message.body != null ? message.body.toLowerCase() : "?"

  if (validateBotString(messageBody, BOT_INSTANCE_CALL)) {
    logAction(message.from, states.MANAGED_BY_OWNER, actions.RETURNING_TO_BOT)

    const parts = message.body.split(' ')
    const initialLang = parts[1] || (userData[userNumber].preferredLang || DEFAULT_LANGUAGE)
    setLang(initialLang)
    logMessage(message.from, `Language set to ${getLang()}`)
    userData[userNumber].interactions = (userData[userNumber].interactions || 0) + 1
    saveUserData(userNumber)
    const interactionNumber = userData[userNumber].interactions
    logMessage(message.from, `Starting interaction number ${interactionNumber}`)
    const user = getSenderName(message, userNumber)
    await client.sendText(message.from, interactionNumber === 1 ?
        iAmTheChatbot(helloUser(user)) :
        niceToChatAgain(helloUser(user), interactionNumber)
    )
    setState(message.from, states.MANAGED_BY_BOT)
  } else {
    logMessage(message.from, 'Sent a message to my owner')
  }
}
