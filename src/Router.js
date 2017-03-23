import React from 'react'
import App from './App'
import List from './pages/List'
import Article from './pages/Article'
import {
  BrowserRouter,
  HashRouter,
  Route,
  withRouter
} from 'react-router-dom'
import { animateToTop } from './utils/scroll'

class Router extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.any
  }
  render () {
    return process.env.NODE_ENV === 'development' ? <HashRouter>{this.props.children}</HashRouter> : <BrowserRouter>{this.props.children}</BrowserRouter>
  }
}

class ScrollToTop extends React.Component {
  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) { // eslint-disable-line
      animateToTop()
    }
  }

  render () {
    return this.props.children // eslint-disable-line
  }
}
const Scroller = withRouter(ScrollToTop)

export default (
  <Router onUpdate={() => animateToTop()}>
    <Scroller>
      <Route component={App} />
    </Scroller>
  </Router>
)
