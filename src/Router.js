import React from 'react'
import App from './App'
import List from './pages/List'
import Article from './pages/Article'
import { Router, Route, Redirect, hashHistory, browserHistory } from 'react-router'
import { animateToTop } from './utils/scroll'

export default (
  <Router onUpdate={() => animateToTop()} history={process.env.NODE_ENV === 'development' ? hashHistory : browserHistory}>
    <Route component={App}>
      <Redirect from='/' to='/list/cate/0/auth/0/date/0-0/tags/0/page/1' />
      <Route path='list/*' component={List} />
      <Route path='post/*' component={Article} />
    </Route>
  </Router>
)
