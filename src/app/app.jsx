///<reference path="../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    browserHistory,
}
from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRoutes from './app-routes';
import './global';
injectTapEventPlugin();

import '../www/css/bootstrap.css';
import '../www/css/bootstrap-material-design.css';
import '../www/css/others.css';
import '../www/css/player.css';

ReactDOM.render(
    <Router
        history={browserHistory}
        onUpdate={() => window.scrollTo(0, 0) }
        >
        {AppRoutes}
    </Router>, document.getElementById('app'));
