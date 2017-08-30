import React from 'react'
import { animateToTop } from '../../utils/scroll'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends React.Component {
  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) { // eslint-disable-line
      setTimeout(animateToTop, 100)
    }
  }

  render () {
    return this.props.children // eslint-disable-line
  }
}
export default withRouter(ScrollToTop)
