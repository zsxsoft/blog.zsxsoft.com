import { Router, Route, Redirect, browserHistory } from 'react-router'

export default (
  <Router history={browserHistory}>
    <Route component={Master}>
      <Redirect from='/' to='/list/cate/0/auth/0/date/0-0/tags/0/page/1' />
      <Route path='list/*' component={List} />
      <Route path='post/*' component={Article} />
    </Route>
  </Router>
)
