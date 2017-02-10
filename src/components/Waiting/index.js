import React from 'react'
import './waiting.css'

export default class Waiting extends React.PureComponent {
  render () {
    return <div className='waiting'>
      <div>Please wait...</div>
      <div className='waiting-animation'>
        <div className='waiting-circle waiting-circle1' />
        <div className='waiting-circle waiting-circle2' />
        <div className='waiting-circle waiting-circle3' />
        <div className='waiting-circle waiting-circle4' />
      </div>
    </div>
  }
}
