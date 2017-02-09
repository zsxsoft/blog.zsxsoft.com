import ReactDOM from 'react-dom'
import Router from './Router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import './player.css'
import './index.css'

injectTapEventPlugin()
ReactDOM.render(
  Router,
  document.getElementById('app--root')
)
