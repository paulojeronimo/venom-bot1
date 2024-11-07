import dotenv from 'dotenv'
import venom from 'venom-bot'

import * as states from './states.js'
import * as strings from './strings.js'
import { logState, log } from './log.js'
import { getNumber } from './util.js'
import { userData, loadUserData } from './user.js'
import { handleManagedByOwner } from './managedByOwner.js'
import { handleManagedByBot } from './managedByBot.js'

Object.assign(globalThis, strings)

const setState = (from, newState) => {
  states.setCurrent(newState, getNumber(from))
  logState(from, newState)
}

dotenv.config()

if (!process.env.DATA_DIR) {
  console.error('DATA_DIR environment variable is not set')
  process.exit(1)
}

(async () => {
  try {
    const sessionConfig = {
      session: BOT_INSTANCE,
      headless: 'new',
    }
    if (process.env.BROWSER_PATH) sessionConfig.browserPathExecutable = process.env.BROWSER_PATH
    await (async (client) => {
      client.onMessage(async (message) => {
        if (message.isGroupMsg) {
          log(`ignoring message coming from group "${message.groupInfo.name}".`)
          return
        }
        const userNumber = getNumber(message.from)
        if (userNumber == STATUS_BROADCAST) {
          log(`ignoring status broadcast message coming from "${message.sender.name}".`)
          return
        }
        userData[userNumber] = loadUserData(userNumber)
        switch (states.getCurrent(userNumber)) {
          case states.MANAGED_BY_OWNER:
            await handleManagedByOwner(client, message, userNumber, setState)
            break
          case states.MANAGED_BY_BOT:
            await handleManagedByBot(client, message, userNumber, setState)
            break
        }
      })
    })(await venom.create(sessionConfig))
  } catch (error) {
    console.error(error)
  }
})()
