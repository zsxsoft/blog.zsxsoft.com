import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import Top from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

import LeftDrawer from './components/LeftDrawer'
import { animateToTop } from './utils/scroll'
import Theme from './Theme'

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
    opacity: '0.9',
    lineHeight: '2em'
  },
  main: {
    paddingTop: 100,
    paddingLeft: '2em',
    paddingRight: '2em'
  }
}

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      openSidebar: false,
      sidebarData: {}
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
    if (/^http/.test(value)) {
      window.open(value)
    } else {
      this.props.router.push(value)
    }
    this.setState({openSidebar: false})
  }

  render () {
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
          <section style={styles.main}>
            <section style={styles.mainContent}>
              {React.cloneElement(this.props.children, {
                location: this.props.location,
                onDataUpdate: this.handleDataUpdate
              })}
            </section>
          </section>
          <FloatingActionButton style={{position: 'fixed', right: '3em', bottom: '3em'}} onClick={animateToTop}>
            <Top />
          </FloatingActionButton>
        </main>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(App)
