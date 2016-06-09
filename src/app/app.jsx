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
injectTapEventPlugin();

ReactDOM.render(
    <Router
        history={browserHistory}
        onUpdate={() => window.scrollTo(0, 0) }
        >
        {AppRoutes}
    </Router>, document.getElementById('app'));
