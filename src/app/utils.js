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
export function isMobile() {
  return document.body.clientWidth <= 647;
}