///<reference path="../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    hashHistory,
}
from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRoutes from './app-routes';
import './global';
window.debugging = true;
injectTapEventPlugin();

import './Stylesheets/bootstrap.css';
import './Stylesheets/bootstrap-material-design.css';
import './Stylesheets/others.css';

ReactDOM.render(
    <Router
        history={hashHistory}
        onUpdate={() => window.scrollTo(0, 0) }
        >
        {AppRoutes}
    </Router>, document.getElementById('app'));
