///<reference path="../../typings/tsd.d.ts" />
import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
}
from 'react-router';
import List from './components/pages/list';
import Article from './components/pages/article';
import Master from './components/master';

let AppRoutes = (
  /**
   * It may be a designed behavior so that should remove path here.
   * @see https://github.com/rackt/react-router/issues/1675#issuecomment-128584903
   */
  <Route component={Master}> 
    <Redirect from="/" to="/list/cate/0/auth/0/date/0-0/tags/0/page/1" />
    <Route path="list/*" component={List} />
    <Route path="post/*" component={Article} />
  </Route>
);

export default AppRoutes;
