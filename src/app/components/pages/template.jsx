///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import Router from 'react-router';
import FullWidthSection from '../full-width-section';
import Style from '../styles/style.jsx';
import ReactComponentWithMixin from '../component-with-mixin';
import {
  AppCanvas,
  FontIcon,
  IconButton,
  EnhancedButton,
  Mixins,
  Styles,
  Paper,
}
from 'material-ui';
let {
  StylePropable
} = Mixins;
let {
  Colors, Spacing, Typography
} = Styles;
let ThemeManager = Styles.ThemeManager;

class ReactComponent extends ReactComponentWithMixin {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppCanvas>
      abcdedf
      </AppCanvas>
    );
  }

};

export default ReactComponent;
