///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';

export default class Container extends React.Component {
    render() {
        return <div className="container" {...this.props}>{this.props.children}</div>;
    }
}