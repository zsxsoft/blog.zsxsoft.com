import { BrowserRouter, HashRouter } from 'react-router-dom'

import React from 'react'

class Router extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.any
  }
  render () {
    return process.env.NODE_ENV === 'development' ? <HashRouter>{this.props.children}</HashRouter> : <BrowserRouter>{this.props.children}</BrowserRouter>
  }
}

export default Router
