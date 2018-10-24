import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import c from './Waiting.scss'
import delayUnmount from '../delayUnmount'

class Waiting extends React.PureComponent {
  state = {
    show: false
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ show: true })
    }, 0)
  }

  componentPrepareUnmount () {
    this.setState({ show: false })
  }

  render () {
    return (
      <div className={`${c.container} ${this.state.show ? c.show : c.hide}`}>
        <CircularProgress size={30} />
      </div>
    )
  }
}

export default delayUnmount(Waiting, 300)
