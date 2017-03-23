import React from 'react'
import App from './App'
import { Route } from 'react-router-dom'
import Router from './components/Router'
import ScrollToTop from './components/ScrollToTop'

export default (
  <Router>
    <ScrollToTop>
      <Route component={App} />
    </ScrollToTop>
  </Router>
)
