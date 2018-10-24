export const filterHtml = html => html.replace(/<.+>/g, '')

export function formatDate (timeString) {
  const d = new Date(parseInt(timeString, 10) * 1000)
  return `${d.getFullYear()}/${(d.getMonth() + 1)}/${d.getDate()}`
}

export function formatArticleContent (s) {
  const content = s.replace(
    /<pre(.*?)class="brush:([a-zA-Z0-9#]+);.*?"(.*?)>([\W\w]*?)<\/pre>/igm,
    (substring, beforeClass, language, afterClass, code) => {
      const newLanguage = language.toLowerCase() === 'c#' ? 'csharp' : language
      return `<pre><code class="language-${newLanguage}">${code}</code></pre>`
    })
    .replace(
      /(class=".*?)prism-highlight(.+?)>([\W\w]*?)<\/pre>/ig,
      `$1$2><code class="$2>$3</code></pre>`)

  return content
}
