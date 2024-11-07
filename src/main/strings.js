import { mlStr } from './taggedTemplateLiterals.js'

const BOT_OWNER = 'Paulo Jerônimo (paulojeronimo.com)'

export const BOT_INSTANCE = 'Bot1'
export const BOT_INSTANCE_CALL = '.' + BOT_INSTANCE.toLowerCase()

const BOT_VERSION = '0.5.1'
const BOT_START_TIME = new Date()

export const STATUS_BROADCAST = 'status@broadcast'

export const en = 'en'
export const pt = 'pt'
export const DEFAULT_LANGUAGE = en
let lang = DEFAULT_LANGUAGE

export const getLang = () => lang

export const setLang = (newLang) => {
  lang = newLang
}

const highlightNumbers = (text) => {
  const DIGIT_TO_EMOJI_MAP = {
    '0': '0️⃣',
    '1': '1️⃣',
    '2': '2️⃣',
    '3': '3️⃣',
    '4': '4️⃣',
    '5': '5️⃣',
    '6': '6️⃣',
    '7': '7️⃣',
    '8': '8️⃣',
    '9': '9️⃣'
  };
  return text.replace(/^(\d)\./gm, (match, digit) => `${DIGIT_TO_EMOJI_MAP[digit]} `)
}

export const ENTER = {
  en: 'ENTER',
  pt: 'INFORME',
}

export const UPDATE = {
  en: 'UPDATE',
  pt: 'ATUALIZE',
}

export const ENTER_OR_UPDATE = {
  en: 'Enter (or update) your',
  pt: 'Informe (ou atualize) o seu',
}

export const ENTER_OR_UPDATE_PLURAL = {
  en: 'Enter (or update) your',
  pt: 'Informe (ou atualize) os seus',
}

export const MAP_FIELD_TO_LABEL = {
  en: {
    fullName: 'full name',
    email: 'email'
  },
  pt: {
    fullName: 'nome completo',
    email: 'email'
  }
}

export const MAIN_OPTIONS = {
  en: highlightNumbers(mlStr`
    1. ${ENTER_OR_UPDATE_PLURAL[en]} *data*.
    2. 🇧🇷 Chat em Português.
    3. Read *about me*.
    0. *Leave me* and return control of the chat to a human being.`),
  pt: highlightNumbers(mlStr`
    1. ${ENTER_OR_UPDATE_PLURAL[pt]} *dados*.
    2. 🇺🇸 Chat in English.
    3. Leia *sobre mim*.
    0. *Deixe-me* e retorne o controle do chat para um ser humano.`),
}

export const HANDLING_USER_DATA_OPTIONS = {
  en: highlightNumbers(mlStr`
    1. ${ENTER_OR_UPDATE[en]} *${MAP_FIELD_TO_LABEL[en].fullName}*.
    2. ${ENTER_OR_UPDATE[en]} *${MAP_FIELD_TO_LABEL[en].email}*.
    3. See all the data you informed me.
    0. Go back to the previous menu.`),
  pt: highlightNumbers(mlStr`
    1. ${ENTER_OR_UPDATE[pt]} *${MAP_FIELD_TO_LABEL[pt].fullName}*.
    2. ${ENTER_OR_UPDATE[pt]} *${MAP_FIELD_TO_LABEL[pt].email}*.
    3. Veja todos os dados que você já me informou.
    0. Retorne ao menu anterior.`),
}

export const NOW_YOU_CAN_TYPE = {
  en: mlStr`
    now you can type one of these options:

    ${MAIN_OPTIONS[en]}`,
  pt: mlStr`
    agora você pode digitar uma destas opções:

    ${MAIN_OPTIONS[pt]}`,
}

export const typeAnOption = (options = MAIN_OPTIONS) => {
  return {
    en: mlStr`
      *Type the number* of an option so I can help you:

      ${options[en]}`,
    pt: mlStr`
      *Digite o número* da opção para que eu possa ajudá-lo:

      ${options[pt]}`,
  }[lang]
}

export const CANCEL_MESSAGE = {
  en: highlightNumbers('0. *Cancel* your action.'),
  pt: highlightNumbers('0. *Cancele* sua ação.'),
}

export const IT_MUST_BE_A_STRING = {
  en: 'it must be a string',
  pt: 'ele precisa ser uma string',
}

export const IT_MUST_CONTAIN_FN_AND_LT = {
  en: 'it must contain at least a first name and a last name.',
  pt: 'ele precisa ter conter pelo menos o primeiro e último nomes.',
}

export const IT_NEEDS_TO_BE_PROPERTY_FMT = {
  en: 'it needs to be properly formatted.',
  pt: 'precisa estar formatado adequadamente.',
}

export const partIsInvalid1 = (part) => {
  return {
    en: `part "${part}" is invalid. Each part must be 2 to 16 characters long and contain only letters, accents, or a single hyphen.`,
    pt: `a parte "${part}" é inválida. Cada parte do nome precisa ter de 2 a 16 caracteres e pode ter apenas letras, acentos, ou um único hífen.`
  }[lang]
}

export const partIsInvalid2 = (part) => {
  return {
    en: `part "${part}" is invalid. Only one part of the name can contain a hyphen.`,
    pt: `parte "${part}" é inválida. Somente uma parte do nome pode conter um hífen.`
  }[lang]
}

export const sorryThisIsNotAValidOption = (userName, options) => {
  return {
    en: mlStr`
      Sorry *${userName}*, but this 👆 is not a valid option number. Type one of these 👇 numbers:

      ${options[en]}`,
    pt: mlStr`
      Lamento *${userName}*, mas essa 👆 não é uma opção numérica válida. Digite um desses 👇 números:

      ${options[pt]}`,
  }[lang]
}

export const thanksForUpdate = (field, input) => {
  return {
    en: `Your *${MAP_FIELD_TO_LABEL[en][field]}* was updated to *${input}*. Thanks! 🙂`,
    pt: `Seu *${MAP_FIELD_TO_LABEL[pt][field]}* foi atualizado para *${input}*. Obrigado! 🙂`,
  }[lang]
}

export const thanksForOurInteraction = (userName, interactionNumber) => {
  return {
    en: mlStr`
      *${userName}*, thank you for interacting with me (*${BOT_INSTANCE}*).
      This was our *interaction number ${interactionNumber}*.
      You can call me any time.
      Just type *${BOT_INSTANCE_CALL}* and I'll help you. 🙂`,
    pt: mlStr`
      *${userName}*, grato por interagir comigo (*${BOT_INSTANCE}*)!
      Essa foi nossa *interação número ${interactionNumber}*.
      Você pode me chamar quando quiser.
      Para isso, basta digitar *${BOT_INSTANCE_CALL}* que eu irei ajudá-lo. 🙂`,
  }[lang]
}

export const helloUser = (userName) => {
  return {
    en: `Hello *${userName}*`,
    pt: `Olá *${userName}*`,
  }[lang]
}

export const iAmTheChatbot = (helloUser) => {
  return {
    en: mlStr`
      ${helloUser}, I\'m the chatbot *${BOT_INSTANCE}*. 😉
      ${typeAnOption()}`,
    pt: mlStr`
      ${helloUser}, Eu sou o chatbot *${BOT_INSTANCE}*. 😉
      ${typeAnOption()}`,
  }[lang]
}

export const niceToChatAgain = (helloUser, interactionNumber) => {
  return {
    en: mlStr`
      ${helloUser}, nice to chat with you again! 😉
      This is our *interaction number ${interactionNumber}*.
      ${typeAnOption()}`,
    pt: mlStr`
      ${helloUser}, é bom interagir com você novamente! 😉
      Esta é a nossa *interação número ${interactionNumber}*.
      ${typeAnOption()}`,
  }[lang]
}

export const okPleaseUpdateYourField = (action, field) => {
  return {
    en: `Ok. Please, *${action}* your *${MAP_FIELD_TO_LABEL[lang][field]}*.`,
    pt: `Ok. Por favor, *${action}* o seu *${MAP_FIELD_TO_LABEL[lang][field]}*.`,
  }[lang]
}

export const currentDataForField = (userData, userNumber, field) => {
  return {
    en: `Current data: *${userData[userNumber][field]}*`,
    pt: `Dado atual: *${userData[userNumber][field]}*`,
  }[lang]
}

const showUserData = (userData, userNumber, field, showLabel = true) => {
  const value = userData[userNumber][field] !== undefined ? userData[userNumber][field] : ""
  return showLabel ? `*${field}* = '${value}'` : `${value}`
}

const showAllUserData = (userData, userNumber) => {
  let result = ''
  Object.keys(MAP_FIELD_TO_LABEL[lang]).forEach(field => result += `${showUserData(userData, userNumber, field)}\n`)
  return result
}

export const hereAreAllTheData = (userData, userNumber) => {
  return {
    en: mlStr`
      Here are *all the data* you informed me:

      ${showAllUserData(userData, userNumber)}`,
    pt: mlStr`
      Aqui estão *todos os dados* que você me informou:

      ${showAllUserData(userData, userNumber)}`,
  }[lang]
}

export const aboutMe = (userName) => {
  return {
    en: mlStr`
      *${userName}*, my name is *${BOT_INSTANCE}*.
      - I'm a chatbot developed by *${BOT_OWNER}* to assist him.
      - I was programmed in *JavaScript ❤️* using *Venom API 🔝*.
      - I'm on since *${BOT_START_TIME}*.
      - I'm on version *${BOT_VERSION}*`,
    pt: mlStr`
      *${userName}*, meu nome é *${BOT_INSTANCE}*.
      - Eu sou um chatbot desenvolvido por *${BOT_OWNER}* para auxiliá-lo.
      - Eu fui programado em *JavaScript ❤️* utilizando a *Venom API 🔝*.
      - Eu estou ligado desde *${BOT_START_TIME}*.
      - Eu estou na versão *${BOT_VERSION}*`,
  }[lang]
}

export const itCanHaveAtMostNParts = (n) => {
  return {
    en: `it can have at most ${n} parts.`,
    pt: `ele pode conter no máximo ${n} partes.`,
  }[lang]
}

export const inputIsInvalid = (field, validationError) => {
  return {
    en: mlStr`
          The value entered for the field *${MAP_FIELD_TO_LABEL[en][field]}* is invalid: ${validationError}
          Inform a new value for this field or ...
          ${CANCEL_MESSAGE[en]}`,
    pt: mlStr`
          O valor entrado para o campo *${MAP_FIELD_TO_LABEL[pt][field]}* é inválido: ${validationError}
          Informe um novo valor para esse campo ou ...
          ${CANCEL_MESSAGE[pt]}`,
  }[lang]
}

export const actionCanceled = (field) => {
  return {
    en: `Action canceled: your *${MAP_FIELD_TO_LABEL[en][field]}* wasn\'t modified.`,
    pt: `Ação cancelada: o seu *${MAP_FIELD_TO_LABEL[pt][field]}* não foi modificado.`,
  }[lang]
}
