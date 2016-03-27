///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import {
  ClearFix,
  Mixins,
  Styles,
}
from 'material-ui';
import ReactComponentWithMixin from './component-with-mixin';
let {
  StylePropable,
  StyleResizable,
} = Mixins;
let DesktopGutter = Styles.Spacing.desktopGutter;


class FullWidthSection extends ReactComponentWithMixin {
  static propTypes = {
    useContent: React.PropTypes.bool,
    contentType: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
  };

  static defaultProps = {
    useContent: false,
    contentType: 'div',
  };

  getStyles() {
    return {
      root: {
        padding: DesktopGutter,
        boxSizing: 'border-box',
      },
      content: {
        maxWidth: '1200px',
        margin: '0 auto',
      },
      rootWhenSmall: {
        paddingTop: (DesktopGutter * 2),
        paddingBottom: (DesktopGutter * 2),
      },
      rootWhenLarge: {
        paddingTop: (DesktopGutter * 3),
        paddingBottom: (DesktopGutter * 3),
      },
    };
  }

  render() {
    let {
      style,
      useContent,
      contentType,
      contentStyle,
      ...other,
    } = this.props;

    let styles = this.getStyles();

    let content;
    if (useContent) {
      content =
        React.createElement(
          contentType, {
            style: this.mergeAndPrefix(styles.content, contentStyle),
          },
          this.props.children
        );
    } else {
      content = this.props.children;
    }

    return ( <ClearFix {...other
      }
      style = {
        this.mergeAndPrefix(
          styles.root,
          style,
          this.isDeviceSize(StyleResizable.statics.Sizes.SMALL) && styles.rootWhenSmall,
          this.isDeviceSize(StyleResizable.statics.Sizes.LARGE) && styles.rootWhenLarge)
      }> {
        content
      } </ClearFix>
    );
  }
}


export default FullWidthSection;
