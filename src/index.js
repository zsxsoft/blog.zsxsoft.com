import './player.css'
import './index.css'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import ReactDOM from 'react-dom'
import Router from './Router'

// import inject from 'react-tap-event-plugin'

// FastClick.attach(document.body)
// inject()
OfflinePluginRuntime.install()
ReactDOM.render(
  Router,
  document.getElementById('app--root')
)
