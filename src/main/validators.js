export const validateBotString = (input, baseString) => {
  const createRegex = () => {
      const escapedBaseString = baseString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regexPattern = `^(${escapedBaseString}|${escapedBaseString} pt|${escapedBaseString} en)$`
      return new RegExp(regexPattern);
  }

  const regex = createRegex();
  return regex.test(input);
}

export const validateFullName = (fullName) => {
  const lang = getLang()
  const result = {
    isValid: true,
    validationError: ''
  }

  if (typeof fullName !== 'string') {
    result.isValid = false
    result.validationError = IT_MUST_BE_A_STRING[lang]
    return result
  }

  const nameParts = fullName.trim().split(/\s+/)
  const maxParts = 6

  if (nameParts.length < 2) {
    result.isValid = false
    result.validationError = IT_MUST_CONTAIN_FN_AND_LT[lang]
    return result
  } else if (nameParts.length > maxParts) {
    result.isValid = false
    result.validationError = itCanHaveAtMostNParts(maxParts)
    return result
  }

  const namePartPattern = /^[A-Za-zÀ-ÿ]+(-[A-Za-zÀ-ÿ]+)?$/
  let hyphenUsed = false

  for (const part of nameParts) {
    if (!namePartPattern.test(part) || part.length < 2 || part.length > 16) {
      result.isValid = false
      result.validationError = partIsInvalid1(part)
      return result
    }
    if (part.includes('-')) {
      if (hyphenUsed) {
        result.isValid = false
        result.validationError = partIsInvalid2(part)
        return result
      }
      hyphenUsed = true
    }
  }

  return result
}

export const validateEmail = (email) => {
  const lang = getLang()
  const result = {
    isValid: true,
    validationError: ''
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(String(email).toLowerCase())) {
    result.isValid = false
    result.validationError = IT_NEEDS_TO_BE_PROPERTY_FMT[lang]
  }
  return result
}
