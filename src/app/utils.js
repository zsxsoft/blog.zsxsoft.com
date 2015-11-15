export function formatDate(timeString) {
  let d = new Date(parseInt(timeString) * 1000);
  return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
}
export function formatArticleContent(articleString) {
  // Step 1: Convert SyntaxHighLighter -> Prism
  articleString = articleString.replace(/<pre(.*)class="brush:([a-zA-Z0-9\#]+);.*?"(.*)>([\W\w]*?)<\/pre>/ig, (substring, beforeClass, language, afterClass, code) => {
    let lowerLanguage = language.toLowerCase();
    if (lowerLanguage === "c#") language = "csharp";   
    return '<pre><code class="language-' + language + '">' + code + '</code></pre>';
  });
  return articleString;
}
export function filterHtml(html) {
  return html.replace(/<.+>/g, "");
}
export function isMobile() {
  return document.body.clientWidth <= 647;
}
export function getNewListUri(originalUri, object) {
  let keys = Object.keys(object);
  let ret = originalUri;
  if (keys.length >= 1 && keys.indexOf("page") === -1) {
    keys.push("page");
    object.page = 1;
  }
  keys.forEach((key) => {
    ret = ret.replace(new RegExp(key + "\/(\\d+)", "ig"), (substring, item) => {
      return key + "/" + object[key];
    });
  });
  return ret;
}