import './App.css'

import {Route as OriginalRoute, Redirect, Switch} from 'react-router-dom'
import React, { Component, PropTypes } from 'react'
import withWidth, {SMALL} from 'material-ui/utils/withWidth'

import Article from './pages/Article'
import { CSSTransitionGroup } from 'react-transition-group'
import Extension from 'material-ui/svg-icons/action/extension'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import IconButton from 'material-ui/IconButton'
import LeftDrawer from './components/LeftDrawer'
import List from './pages/List'
import Menu from 'material-ui/svg-icons/navigation/menu'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Theme from './Theme'
import Top from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import { animateToTop } from './utils/scroll'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const styles = {
  large: {
    width: 32,
    height: 32,
    position: 'fixed',
    zIndex: 8
  },
  largeIcon: {
    color: '#ffffff'
  },
  mainContent: {
    width: '100%',
    maxWidth: 1024,
    margin: '0 auto',
    lineHeight: '2em',
    transition: 'opacity 2s'
  },
  main: {
    paddingTop: 100,
    paddingLeft: '2em',
    paddingRight: '2em'
  },
  mainSmall: {
    paddingTop: '3em',
    paddingLeft: '0.5em',
    paddingRight: '0.5em'
  }
}

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      openSidebar: false,
      sidebarData: {},
      mainOpacity: 0.9,
      opacityDirection: 1
    }
  }

  formatHtmlToData = html => {
    let result
    let reg = /<a href="([^"]*?)".*?>(.*?)<\/a>/gi
    let liContainer = []
    while ((result = reg.exec(html)) !== null) { // eslint-disable-line no-cond-assign
      liContainer.push({
        text: result[2],
        url: result[1]
      })
    }
    return liContainer
  }

  handleDataUpdate = (data) => {
    const sidebarData = {
      others: {}
    }
    data.sidebar.forEach(d => {
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

  handleRequestChange = () => {
    this.setState({openSidebar: !this.state.openSidebar})
  }

  handleLogoClicked = () => {
    location.href = 'https://www.zsxsoft.com'
  }

  handleListChanged = (event, value) => {
    if (!value) return
    if (/^http/.test(value)) {
      window.open(value)
    } else {
      this.props.history.push(value)
    }
    this.setState({openSidebar: false})
  }

  updateOpacity = () => {
    const opacity = this.state.mainOpacity
    let newDirection = this.state.opacityDirection
    let newOpacity = opacity
    if (this.state.opacityDirection === 1) {
      newOpacity += 0.1
      if (newOpacity >= 1) newDirection = 0
    } else {
      newOpacity -= 0.1
      if (newOpacity <= 0.0) newDirection = 1
    }

    this.setState({
      mainOpacity: newOpacity,
      opacityDirection: newDirection
    })
  }

  Route = ({ component: Component, ...rest }) => ( // eslint-disable-line react/prop-types
    <OriginalRoute {...rest} render={props => (
      <Component
        onDataUpdate={this.handleDataUpdate}
        {...props}
      />
    )} />
  )

  render () {
    const Route = this.Route
    if (this.props.location.pathname === '/') {
      return <Redirect to='/list/cate/0/auth/0/date/0-0/tags/0/page/1' />
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
        <main>
          <header>
            <LeftDrawer
              location={this.props.location}
              open={this.state.openSidebar}
              onLogoClicked={this.handleLogoClicked}
              onListChanged={this.handleListChanged}
              onRequestChange={this.handleRequestChange}
              data={this.state.sidebarData}
            />
            <IconButton
              label='Toggle Drawer'
              onClick={this.handleRequestChange}
              style={styles.large}
              iconStyle={styles.largeIcon}
            >
              <Menu />
            </IconButton>
          </header>
          <section style={this.props.width === SMALL ? styles.mainSmall : styles.main}>
            <section style={Object.assign({}, styles.mainContent, {opacity: this.state.mainOpacity})}>
              <CSSTransitionGroup
                transitionName='fade'
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
              >
                <Switch location={this.props.location} key={this.props.location.pathname.split('/')[1]}>
                  <Route path='/list' component={List} />
                  <Route path='/post' component={Article} />
                </Switch>
              </CSSTransitionGroup>
            </section>
          </section>
          {this.props.width === SMALL ? null
            : <FloatingActionButton style={{position: 'fixed', left: '3em', bottom: '3em', color: '#ffffff', zIndex: 8}} onClick={this.updateOpacity}>
              <Extension />
            </FloatingActionButton>
          }
          <FloatingActionButton style={{position: 'fixed', right: '3em', bottom: '3em', color: '#ffffff', zIndex: 8}} onClick={animateToTop}>
            <Top />
          </FloatingActionButton>
        </main>
      </MuiThemeProvider>
    )
  }
}

export default withWidth()(App)
