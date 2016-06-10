///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import {Button} from 'react-bootstrap';
// To Fuck Firefox
export default class DivButton extends React.Component {

    render() {
        return <Button componentClass="div" {...this.props}>{this.props.children}</Button>
    }

};
