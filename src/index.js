import ReactDOM from 'react-dom'
import Router from './Router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import './player.css'
import './index.css'

OfflinePluginRuntime.install()
injectTapEventPlugin()
ReactDOM.render(
  Router,
  document.getElementById('app--root')
)
