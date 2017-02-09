export const filterHtml = html => html.replace(/<.+>/g, '')

export function getNewListUri (originalUri, object) {
  const keys = Object.keys(object)
  let ret = originalUri
  if (keys.length >= 1 && keys.indexOf('page') === -1) {
    keys.push('page')
    object.page = 1
  }
  keys.forEach((key) => {
    ret = ret.replace(new RegExp(key + '/(\\d+)', 'ig'), () => {
      return key + '/' + object[key]
    })
  })
  return ret
}

export function formatDate (timeString) {
  const d = new Date(parseInt(timeString, 10) * 1000)
  return `${d.getFullYear()}/${(d.getMonth() + 1)}/${d.getDate()}`
}

export function formatArticleContent (articleString) {
  const content = articleString.replace(/<pre(.*?)class="brush:([a-zA-Z0-9#]+);.*?"(.*?)>([\W\w]*?)<\/pre>/igm, (substring, beforeClass, language, afterClass, code) => {
    const newLanguage = language.toLowerCase() === 'c#' ? 'csharp' : language
    return `<pre><code class="language-${newLanguage}">${code}</code></pre>`
  }).replace(/(class=".*?)prism-highlight(.+?)>([\W\w]*?)<\/pre>/ig, `$1$2><code class="$2>$3</code></pre>`)
  return content
}
