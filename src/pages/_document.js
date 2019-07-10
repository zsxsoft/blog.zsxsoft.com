import Document, { Main, Head, NextScript } from 'next/document'
import React from 'react'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    let pageContext
    const page = ctx.renderPage((Component) => {
      const WrappedComponent = (props) => {
        pageContext = props.pageContext
        return <Component {...props} />
      }

      return WrappedComponent
    })

    return {
      ...page,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          <style
            id='jss-server-side'
            dangerouslySetInnerHTML={{ __html: pageContext && pageContext.sheetsRegistry.toString().replace(/\n/g, '') }}
          />
          {flush() || null}
        </React.Fragment>
      )
    }
  }

  render () {
    const { pageContext } = this.props

    // console.log(pageContext)
    return (
      <html lang='zh-Hans-CN'>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1' />
          <meta name='apple-mobile-web-app-status-bar-style' content={pageContext.theme.palette.primary.main} />
          <meta name='msapplication-TileColor' content={pageContext.theme.palette.primary.main} />
          <meta name='theme-color' content={pageContext.theme.palette.primary.main} />
          {/* Fuck you archiver */}
          <meta name='robots' content='noarchive' />
          <link rel='shortcut icon' href='https://blog.zsxsoft.com/favicon.ico' />
          <link href='/_next/static/styles/prism-20181026.css' rel='stylesheet' />
          <link href='/_next/static/social-share-20181026/css/share.min.css' rel='stylesheet' />
          <script dangerouslySetInnerHTML={{ __html: 'if (window.performance) { window.startTime = performance.now() }' }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src='/_next/static/scripts/prism-20181026.js' async />
          <script src='/_next/static/scripts/useragent-0.5.7.js' async />
          <script src='/_next/static/social-share-20181026/js/social-share.min.js' async />
          <script dangerouslySetInnerHTML={{ __html: 'window.Promise || document.write(\'\\x3Cscript src="//cdn.jsdelivr.net/npm/es6-promise@4.2.8/dist/es6-promise.min.js">\\x3C/script>\\x3Cscript>ES6Promise.polyfill()\\x3C/script>\')' }} />
          <script dangerouslySetInnerHTML={{ __html: 'window.fetch || document.write(\'\\x3Cscript src="//cdn.jsdelivr.net/npm/whatwg-fetch@2.0.4/fetch.min.js">\\x3C/script>\')' }} />
          <script dangerouslySetInnerHTML={{ __html: '\'\'.startsWith || document.write(\'\\x3Cscript src="//cdn.jsdelivr.net/npm/babel-polyfill@6.26.0/dist/polyfill.min.js">\\x3C/script>\')' }} />
        </body>
      </html>
    )
  }
}
