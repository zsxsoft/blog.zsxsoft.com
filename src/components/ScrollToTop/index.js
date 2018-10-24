import React from 'react'
import { animateToTop } from '../../utils/scroll'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'

class ScrollToTop extends React.PureComponent {
  static propTypes = {
    router: PropTypes.object
  }

  componentDidUpdate (prevProps) {
    if (this.props.router.asPath !== prevProps.router.asPath) {
      setTimeout(animateToTop, 100)
    }
  }

  render () {
    return this.props.children // eslint-disable-line
  }
}
export default withRouter(ScrollToTop)
