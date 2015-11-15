///<reference path="../../typings/tsd.d.ts" />
import React from 'react'
import Router from 'react-router';
import Config from '../config';
import ReactComponentWithMixin from './component-with-mixin';
import {
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
let menuItems = [{
  route: '/',
  text: '首页',
}, {
  payload: 'https://github.com/zsxsoft/',
  text: 'GitHub',
  type: MenuItem.Types.LINK,
}];


class AppNextNav extends ReactComponentWithMixin {
  static contextTypes = {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func,
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
      <div style={this.prepareStyles(this.getStyles())} onTouchTap={this._onHeaderClick.bind(this)}>
        {Config.title}
      </div>
    );

    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange.bind(this)} />
    );
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _getSelectedIndex() {
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.props.history.isActive(currentItem.route)) return i;
    }
  }

  _onLeftNavChange(e, key, payload) {
    this.props.history.pushState(null, payload.route);
  }

  _onHeaderClick() {
    this.props.history.pushState(null, '/');
    this.refs.leftNav.close();
  }

};

export default AppNextNav;
