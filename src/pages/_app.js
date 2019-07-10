import React from 'react'

import App, { Container } from 'next/app'
import Router from 'next/router'

import ReactGA from 'react-ga'
import JssProvider from 'react-jss/lib/JssProvider'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { MuiThemeProvider } from '@material-ui/core/styles'

import LeftDrawer from 'components/LeftDrawer'
import Footer from 'components/Footer'
import ScrollToTop from 'components/ScrollToTop'
import Waiting from 'components/Waiting'

import Tencent from 'components/Analytics/Tencent'

import { getFrontendUrl } from 'utils/api'
import { animateToTop } from 'utils/scroll'
import getPageContext from 'utils/getPageContext'
import config from '../utils/config'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Extension from '@material-ui/icons/Extension'
import Top from '@material-ui/icons/KeyboardArrowUp'
import Menu from '@material-ui/icons/Menu'

import '../styles/index.scss'
import c from './app.scss'

class MyApp extends App {
  state = {
    loading: false,
    openSidebar: false,
    sidebarData: {},
    mainOpacity: 0.85,
    opacityDirection: 1
  }

  static async getInitialProps ({ Component, ctx, ...props }) {
    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

  constructor (props) {
    super(props)
    this.pageContext = getPageContext()

    if (process.browser) {
      ReactGA.initialize(config.analytics.google)
      ReactGA.pageview(window.location.pathname + window.location.search)

      Router.events.on('routeChangeStart', () => {
        this.setState({ loading: true })
        ReactGA.event({
          category: 'Route',
          action: 'route-change-start'
        })
      })
      Router.events.on('routeChangeComplete', () => {
        ReactGA.pageview(window.location.pathname + window.location.search)
        ReactGA.event({
          category: 'Route',
          action: 'route-change-end'
        })
        this.setState({ loading: false })
      })
    }
  }

  componentDidMount () {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
    if (window.startTime) {
      ReactGA.timing({
        category: 'JS Loaded',
        variable: 'load',
        value: Math.round(window.performance.now() - window.startTime)
      })
    }
  }

  formatHtmlToData = html => {
    let result
    const reg = /<a href="([^"]*?)".*?>(.*?)<\/a>/gi
    const liContainer = []
    while ((result = reg.exec(html)) !== null) { // eslint-disable-line no-cond-assign
      liContainer.push({
        text: result[2],
        url: getFrontendUrl(result[1])
      })
    }
    return liContainer
  }

  handleDataUpdate = (data) => {
    const sidebarData = {
      others: {}
    }
    data.forEach(d => {
      if (d.FileName === 'catalog') {
        sidebarData.categories = this.formatHtmlToData(d.Content)
      } else if (d.FileName === 'archives') {
        sidebarData.archives = this.formatHtmlToData(d.Content)
      } else if (d.FileName === 'comments') {
        sidebarData.comments = this.formatHtmlToData(d.Content)
      } else {
        sidebarData.others[d.FileName] = d
      }
    })
    this.setState({
      sidebarData
    })
  }

  handleCloseSidebar = () => {
    this.setState({ openSidebar: !this.state.openSidebar })
  }

  handleListChanged = (event, value) => {
    if (!value) return
    if (/^http/.test(value)) {
      window.open(value)
    } else {
      this.props.history.push(value)
    }
    this.setState({ openSidebar: false })
  }

  updateOpacity = () => {
    const opacity = this.state.mainOpacity
    let newDirection = this.state.opacityDirection
    let newOpacity = opacity
    if (this.state.opacityDirection === 1) {
      newOpacity += 0.2
      if (newOpacity >= 1) {
        newOpacity = 0.99
        newDirection = 0
      }
    } else {
      newOpacity -= 0.2
      if (newOpacity <= 0.0) {
        newDirection = 1
        newOpacity = 0
      }
    }

    this.setState({
      mainOpacity: newOpacity,
      opacityDirection: newDirection
    })
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <ScrollToTop>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <Waiting show={this.state.loading} />
              <main>
                <header className={c.header}>
                  <LeftDrawer
                    location={this.props.location}
                    open={this.state.openSidebar}
                    onLogoClicked={this.handleLogoClicked}
                    onListChanged={this.handleListChanged}
                    onClose={this.handleCloseSidebar}
                    data={this.state.sidebarData}
                  />
                  <IconButton
                    label='Toggle Drawer'
                    onClick={this.handleCloseSidebar}
                    className={c.menuButton}
                  >
                    <Menu />
                  </IconButton>
                </header>
                <section style={{ opacity: this.state.mainOpacity }} className={c.main}>
                  <TransitionGroup component={null}>
                    <CSSTransition
                      key={this.props.router.asPath}
                      classNames='switch'
                      timeout={1000}
                      unmountOnExit
                    >
                      <Component onDataUpdate={this.handleDataUpdate} pageContext={this.pageContext} {...pageProps} />
                    </CSSTransition>
                  </TransitionGroup>

                </section>
                <Button variant='fab' color='primary' className={c.floatingButton} style={{ left: '3em' }} onClick={this.updateOpacity}>
                  <Extension />
                </Button>
                <Button variant='fab' color='primary' className={c.floatingButton} style={{ right: '3em' }} onClick={animateToTop}>
                  <Top />
                </Button>
              </main>
              <Footer />

              <Tencent />
            </MuiThemeProvider>
          </JssProvider>
        </ScrollToTop>
      </Container>
    )
  }
}

export default MyApp
