import React from 'react'
import { withRouter } from 'react-router-dom'
import { animateToTop } from '../../utils/scroll'

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
export default withRouter(ScrollToTop)

