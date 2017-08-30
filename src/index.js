import './player.css'
import './index.css'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import FastClick from 'fastclick'
import ReactDOM from 'react-dom'
import Router from './Router'

// import inject from 'react-tap-event-plugin'

window.fc = FastClick
// FastClick.attach(document.body)
// inject()
OfflinePluginRuntime.install()
ReactDOM.render(
  Router,
  document.getElementById('app--root')
)
