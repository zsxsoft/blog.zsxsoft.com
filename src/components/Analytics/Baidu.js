import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import config from '../../utils/config'

const url = '//hm.baidu.com/hm.js?' + config.analytics.baidu

class Tencent extends PureComponent {
  state = {
    currentUrl: '',
    time: 0
  }

  componentDidMount () {
    this.setState({
      currentUrl: window.location.href
    })
  }

  componentDidUpdate (prevProps) {
    if (window.location.href !== this.state.currentUrl) {
      try {
        delete window['_bdhm_loaded_' + config.analytics.baidu]
      } catch (e) {
        // do nothing
      }
      this.setState({ // eslint-disable-line
        currentUrl: window.location.href,
        time: new Date().getTime()
      })
    }
  }

  render () {
    return (
      <Head>
        <script src={`${url}&time=${this.state.time}`} async defer />
      </Head>
    )
  }
}

export default withRouter(Tencent)
