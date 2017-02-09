import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ExtensionDuoshuo from './components/Duoshuo/Extensions'
import RaisedButton from 'material-ui/RaisedButton'
import LeftDrawer from './components/LeftDrawer'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
const styles = {
  large: {
    width: 32,
    height: 32,
    margin: '0 0 0 1pc',
    position: 'fixed',
    zIndex: 8
  },
  largeIcon: {
    color: '#000000'
  },
  mainContent: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    opacity: '0.9',
    lineHeight: '2em'
  },
  main: {
    paddingTop: 130
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
    while ((result = reg.exec(html)) !== null) {
      liContainer.push({
        text: result[2],
        url: result[1]
      })
    }
    return liContainer
  }

  handleDataUpdate = (data) => {
    const partBottom = []
    const sidebarData = {}
    data.sidebar.forEach(d => {
      console.log(d)
      if (d.FileName === 'catalog') {
        sidebarData.categories = this.formatHtmlToData(d.Content)
      } else if (d.FileName === 'archives') {
        sidebarData.archives = this.formatHtmlToData(d.Content)
      } else {
        partBottom.push(d)
      }
    })
    this.setState({
      sidebarData
    })
  }

  handleToggle = () => {
    this.setState({open: !this.state.open})
  }

  handleLogoClicked = () => {
      
  }

  handleListChanged = (event, value) => {
    if (/^http/.test(value)) {
      window.open(value)
    } else {
      this.props.router.push(value)
    }
    this.setState({open: false})
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <main>
          <header>
            <LeftDrawer
              location={this.props.location}
              open={this.state.open}
              onLogoClicked={this.handleLogoClicked}
              onListChanged={this.handleListChanged}
              data={this.state.sidebarData}
            />
            <IconButton
              label='Toggle Drawer'
              onClick={this.handleToggle}
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
        </main>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(App)
