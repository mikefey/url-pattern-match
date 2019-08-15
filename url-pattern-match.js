const parseTokens = (route, path) => {
  const paramRegex = /:([a-zA-Z0-9_-])+/g
  const wildCardRegex = /\/\*/g

  const routeCopy = wildCardRegex.test(route)
    ? route.substr(0, route.indexOf('*') + 1)
    : route

  const paramRegexString = '([a-zA-Z0-9_-])+'
  const wildCardRegexString = '([a-zA-Z0-9/_-])+'

  const routeArray = routeCopy.split('/')
  const pathArray = path.split('/')

  const paramTokens = (routeCopy.match(paramRegex) || []).map(item => {
    return { token: item, type: 'param' }
  })
  const wildCardTokens = (routeCopy.match(wildCardRegex) || []).map(item => {
    return { token: item, type: 'wildcard' }
  })
  const allTokens = [...paramTokens, ...wildCardTokens]

  const tokenArray = allTokens
    .map(match => {
      const matchValue =
        match.type === 'param'
          ? pathArray[routeArray.indexOf(match.token)]
          : pathArray.slice(routeArray.indexOf('*')).join('/')

      return {
        index: routeCopy.indexOf(match.token),
        value: matchValue,
      }
    })
    .sort((a, b) => {
      return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
    })
    .map(item => {
      return item.value
    })

  const regexString = routeCopy
    .replace(paramRegex, paramRegexString)
    .replace(wildCardRegex, wildCardRegexString)

  return { regexString, tokenArray }
}

export default (route, path) => {
  const { regexString, tokenArray } = parseTokens(route, path)
  const matchRegex = new RegExp(regexString)
  const isMatch = matchRegex.test(path)

  return isMatch ? tokenArray : null
}
