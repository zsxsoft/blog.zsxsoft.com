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
window.debugging = true;
injectTapEventPlugin();

ReactDOM.render(
    <Router
        history={hashHistory}
        onUpdate={() => window.scrollTo(0, 0) }
        >
        {AppRoutes}
    </Router>, document.getElementById('app'));
