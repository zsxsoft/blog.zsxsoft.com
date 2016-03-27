///<reference path="../../typings/tsd.d.ts" />
import React from 'react'
import Router from 'react-router';
import Config from '../config';
import ReactComponentWithMixin from './component-with-mixin';
import {
    AppBar,
    MenuItem,
    LeftNav,
    Styles,
    Mixins,
}
from 'material-ui';
let {
    Colors,
    Spacing,
    Typography,
} = Styles;
let {
    StylePropable,
    StyleResizable,
} = Mixins;

class AppLeftNav extends ReactComponentWithMixin {
    static contextTypes = {
        muiTheme: React.PropTypes.object,
        location: React.PropTypes.object,
    };

    getStyles() {
        return {
            cursor: 'pointer',
            //.mui-font-style-headline
            fontSize: 24,
            color: Typography.textFullWhite,
            lineHeight: Spacing.desktopKeylineIncrement + 'px',
            fontWeight: Typography.fontWeightLight,
            backgroundColor: "#2e8bcc",
            paddingLeft: Spacing.desktopGutter,
            paddingTop: 0,
            marginBottom: 8,
        };
    }

    render() {
        let header = (
            <div style={this.prepareStyles(this.getStyles()) } onTouchTap={this._onHeaderClick.bind(this) }>
                {Config.title}
            </div>
        );

        return (
            <LeftNav
                ref="leftNav"
                docked={false}
                isInitiallyOpen={false}
                >
                <AppBar
                    title={Config.title}
                    showMenuIconButton={false}
                    zDepth={0}
                    style={{ background: "#2e8bcc" }}/>
                <div>
                    <MenuItem onTouchTap={this.toUrl.bind(this, '/') }>INDEX</MenuItem>
                    <MenuItem onTouchTap={this.toUrl.bind(this, '/post/2') }>GUESTBOOK</MenuItem>
                    <MenuItem onTouchTap={this.toUrl.bind(this, 'https://github.com/zsxsoft') }>GitHub</MenuItem>
                </div>
            </LeftNav>
        );
    }

    toggle() {
        this.refs.leftNav.toggle();
    }

    toUrl(url) {
        if (url[0] !== "/") {
            window.open(url);
        } else {
            this.props.history.pushState(null, url);
        }
    }


    _onHeaderClick() {
        this.props.history.pushState(null, '/');
        this.refs.leftNav.close();
    }

    _onLeftIconButtonTouchTap() {
        this.refs.leftNav.toggle();
    }
};

export default AppLeftNav;
