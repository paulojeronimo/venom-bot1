export const MANAGED_BY_OWNER = 'managed by owner'
export const MANAGED_BY_BOT = 'managed by bot'
export const STARTED = 'started'
export const CANCELED = 'canceled'
export const ERROR = 'error'
export const FINISHED = 'finished'

const userStates = {}

export const setCurrent = (newState, userNumber) => {
  userStates[userNumber] = newState
}

export const getCurrent = (userNumber) => {
  return userStates[userNumber] || MANAGED_BY_OWNER
}
