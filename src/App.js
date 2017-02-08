import React, { Component, PropTypes } from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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
    display: 'flex',
    width: '100%',
    maxWidth: '900px',
    flexShrink: 0,
    alignItems: 'stretch',
    flexFlow: 'row wrap',
    margin: '0 auto'
  },
  main: {
    paddingTop: 130
  }
}

class App extends Component {
  static propTypes = {
    children: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  handleToggle = () => {
    console.log('a')
    this.setState({open: !this.state.open})
  }

  handleLogoClicked = () => {
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <main>
          <header>
            <LeftDrawer open={this.state.open} onLogoClicked={this.handleLogoClicked} data={{}} />
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
              {this.props.children}
            </section>
          </section>
        </main>
      </MuiThemeProvider>
    )
  }
}

export default App
