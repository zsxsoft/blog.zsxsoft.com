import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import c from './UserAgent.scss'

export default class UserAgent extends PureComponent {
  static propTypes = {
    userAgent: PropTypes.string.isRequired
  }

  analyze = _.memoize((str) => {
    return window.USERAGENT.analyze(str)
  })

  getImage = (obj) => (method) => {
    return (
      <span className={c.item}>
        <img
          src={`https://static-up.zsxsoft.com/useragent.js/img/24/${obj[method].dir}/${obj[method].image}.png`}
          alt={obj[method].name} />
        <span>{obj[method].full}</span>
      </span>
    )
  }

  render () {
    if (!process.browser || !window.USERAGENT) {
      return null
    }
    const w = this.analyze(this.props.userAgent)
    const fnImage = this.getImage(w)
    return (
      <span className={c.userAgent}>
        {fnImage('platform')}
        {' '}
        {fnImage('browser')}
      </span>
    )
  }
}
