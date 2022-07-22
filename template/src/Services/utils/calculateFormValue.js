const parameterizedString = (str, params) => {
  if (!str) {
    return ''
  }
  return str.replace(/%c[0-9]+/g, matchedStr => {
    const variableRang = parseInt(matchedStr.replace('%c', ''), 10)

    const variableIndex = params.findIndex(item => {
      return item.r_rang === variableRang
    })

    const result = params[variableIndex].r_valeur
    return result === null ? 'n/a' : result
  })
}

const calculate = (str, params) => {
  try {
    console.debug('Expression : ', str)
    const expression = parameterizedString(str, params)

    console.debug('Expression with value : ', expression)

    // eslint-disable-next-line no-eval
    const result = eval(expression)
    console.debug('Result : ', result)
    return result
  } catch (e) {
    return 'n/a'
  }
}

export default function (str: string, params: Array) {
  return calculate(str, params)
}
