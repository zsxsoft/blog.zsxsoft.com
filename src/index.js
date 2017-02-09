import ReactDOM from 'react-dom'
import Router from './Router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './index.css'

injectTapEventPlugin()
ReactDOM.render(
  Router,
  document.getElementById('app--root')
)
