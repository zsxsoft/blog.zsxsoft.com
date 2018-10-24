import config from './config'

const api = async (url, ...props) => fetch(config.apiUrl + url, ...props).then(data => {
  if (data.ok) return data.json()
  return Promise.reject(data)
})

export default api
export const convertQueryToListParams = (data = {}) => {
  const {
    category = 0,
    author = 0,
    year = 0,
    month = 0,
    tags = 0,
    page = 1
  } = data
  return `/list/cate/${category}/auth/${author}/date/${year}-${month}/tags/${tags}/page/${page}`
}

export const convertListParamsToQuery = (url) => {
  const ret = { url }
  const regEx = new RegExp('/list/cate/(\\d+)/auth/(\\d+)/date/(\\d+)-(\\d+)/tags/(\\d+)/page/(\\d+)')
  const w = url.match(regEx)
  if (!w) return ret
  ret.url = ret.url.replace(regEx, '')
  if (w[1] !== '0') ret.category = w[1]
  if (w[2] !== '0') ret.author = w[2]
  if (w[3] !== '0') ret.year = w[3]
  if (w[4] !== '0') ret.month = w[4]
  if (w[5] !== '0') ret.tags = w[5]
  if (w[6] !== '0') ret.page = w[6]
  return ret
}

export const getFrontendUrl = (originalUrl) => {
  const { url, ...query } = convertListParamsToQuery(originalUrl)
  const queryString = Object.keys(query).map(name => `${name}=${encodeURIComponent(query[name])}`).join('&')
  const concatSymbol = queryString !== '' ? (url.indexOf('?') >= 0 ? '&' : '?') : ''

  if (/^http/.test(url)) {
    return url.replace(/^https?:\/\/.*?\//, '/') + concatSymbol + queryString
  } else {
    return url + concatSymbol + queryString
  }
}
