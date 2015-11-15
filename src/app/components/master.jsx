///<reference path="../../typings/tsd.d.ts" />
import React from 'react';
import Router from 'react-router';
import FullWidthSection from './full-width-section';
import AppLeftNav from './app-left-nav';
import MyTheme from '../theme';
import Config from '../config';
import {isMobile} from '../utils';
import ReactComponentWithMixin from './component-with-mixin';
import {
  AppBar,
  AppCanvas,
  FontIcon,
  IconButton,
  EnhancedButton,
  Menu,
  Mixins,
  RaisedButton,
  Styles,
  Tab,
  Tabs,
  Paper,
}
from 'material-ui';

let {
  StylePropable,
} = Mixins;
let {
  Colors, Spacing, Typography,
} = Styles;
let ThemeManager = Styles.ThemeManager;
let styles = {
  footer: {
    backgroundColor: Colors.grey900,
    textAlign: 'center',
  },
  a: {
    color: Colors.darkWhite,
  },
  p: {
    margin: '0 auto',
    padding: 0,
    color: Colors.lightWhite,
  },
  iconButton: {
    color: Colors.darkWhite,
  },
};
let masterResizeId = 0;

class Master extends ReactComponentWithMixin {
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    let muiTheme = ThemeManager.getMuiTheme(MyTheme);
    this.state = {
      muiTheme,
    };
  }
  
  
  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }
  
  setTabsState() {

    this.setState({
      renderTabs: !isMobile(),
    });
  }
  
  componentDidMount() {
    this.componentDidUpdate();
  }
  
  componentDidUpdate() {
    setTimeout(() => {
      window.doRemain();
    }, 1000);
  }

  componentWillMount() {
    let newMuiTheme = this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
      tabIndex: 0,
    });
    this.setTabsState();
    masterResizeId = window.resizeQueue.add(this.setTabsState.bind(this));
  }
  
  componentWillUnmount () {
    window.resizeQueue.remove(masterResizeId);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      tabIndex: 0,
      muiTheme: newMuiTheme,
    });
  }

  render() {

    return (
      <AppCanvas>
        {this.state.renderTabs ? this._getTabs(): this._getAppBar()}

        {this.props.children}
        <AppLeftNav ref="leftNav" history={this.props.history} />
        <FullWidthSection style={styles.footer}>
          <div>
            <p style={this.prepareStyles(styles.p)}>本站采用<a href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/" target="_blank" rel="nofollow" title="查看普通文本">创作共用版权协议（查看普通文本）</a>，转载本站内容即代表您同意了本协议，必须<a href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/legalcode" title="查看法律文本" rel="nofollow" target="_blank">署名-非商业使用-禁止演绎（查看法律文本） </a>。</p>
            <p style={this.prepareStyles(styles.p)}>API由<a href="http://www.zblogcn.com/" target="_blank">Z-BlogPHP</a>最新版本强力驱动；前端基于<a href="https://facebook.github.io/react/" target="_blank" rel="nofollow">React</a> + <a href="http://material-ui.com/" target="_blank" rel="nofollow">material-ui</a>。</p>
            <p style={this.prepareStyles(styles.p)}><a href="http://www.miitbeian.gov.cn/" target="_blank" rel="nofollow">闽ICP备15006942号</a> &nbsp; <a href="http://blog.zsxsoft.com/post/9">[关于]</a> <a href="/feed.php" target="_blank">[RSS]</a> </p>
          </div>
        </FullWidthSection>
      </AppCanvas>
    );
  }

  _getTabs() {
    let styles = {
      root: {
        backgroundColor: "#2e8bcc",
        position: 'fixed',
        height: 32,
        top: 0,
        right: 0,
        zIndex: 4,
        width: '100%',
      },
      rootWhenFirstChild: {
        height: 28,
      },
      container: {
        position: 'absolute',
        right: (Spacing.desktopGutter / 2) + 48,
        bottom: 0,
      },
      span: {
        color: Colors.white,
        fontWeight: Typography.fontWeightLight,
        left: 45,
        top: 6,
        position: 'absolute',
        fontSize: 20,
      },
      tabs: {
        width: 425,
        bottom: 0,
        height: 28,
      },
      tab: {
        height: 28,
        backgroundColor: "#2e8bcc",
      },
      tabItemContainer: {
        height: 28,
      },

    };

    let materialIcon = this.state.tabIndex !== '0' ? (
      <EnhancedButton
        linkButton={true}
        href="/">
        <span style={this.prepareStyles(styles.span)}>zsx&#39;s Blog</span>
      </EnhancedButton>) : null;

    return (
      <div>
        <Paper
          zDepth={0}
          rounded={false}
          style={styles.root}>
          {materialIcon}
          <div style={this.prepareStyles(styles.container)}>
            <Tabs
              style={styles.tabs}
              tabItemContainerStyle={styles.tabItemContainer}
              value="0"
              onChange={this._handleTabChange.bind(this)}>
              <Tab
                value="0"
                label="Index"
                style={styles.tab}
                route="/" />
              <Tab
                value="1"
                label="GitHub"
                style={styles.tab}
                route="github"/>
            </Tabs>
          </div>
        </Paper>
      </div>
    );
  }


  _handleTabChange(value, e, tab) {
    if (tab.props.route === "github") {
      window.open("https://github.com/zsxsoft");
      return;
    }
    this.props.history.pushState(null, tab.props.route);
    //this.setState({tabIndex: 0});
  }

  _getAppBar() {

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap.bind(this)}
          title={Config.title}
          zDepth={0}
          style={{position: 'absolute', top: 0, background: "#2e8bcc"}}/>
      </div>);
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }
};

export default Master;
