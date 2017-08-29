import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'

export default class Waiting extends React.PureComponent {
  render () {
    return <RefreshIndicator
      size={50}
      top={100}
      left={window.innerWidth / 2 - 25}
      status='loading'
    />
  }
}
