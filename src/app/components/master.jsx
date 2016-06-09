///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import Router from 'react-router';
import FullWidthSection from './full-width-section';
import AppLeftNav from './app-left-nav';
import Config from '../config';
import {isMobile} from '../utils';

let masterResizeId = 0;

export default class Master extends React.Component { 

    static contextTypes = {
        location: React.PropTypes.object,
        router: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: "0",
        };
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
        this.setTabsState();
        masterResizeId = window.resizeQueue.add(this.setTabsState.bind(this));
    }

    componentWillUnmount() {
        window.resizeQueue.remove(masterResizeId);
    }

    componentWillReceiveProps(nextProps, nextContext) {
    }

    render() {

        return (<div></div>);
        /*
            <div>
                {this.state.renderTabs ? this._getTabs() : this._getAppBar() }

                {this.props.children}
                <AppLeftNav ref="leftNav" location={this.props.location} history={this.props.history} />
                <FullWidthSection style={styles.footer}>
                    <div>
                        <p style={this.prepareStyles(styles.p) }>本站采用<a href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/" target="_blank" rel="nofollow" title="查看普通文本">创作共用版权协议</a>，转载本站内容即代表同意了本协议，必须<a href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/legalcode" title="查看法律文本" rel="nofollow" target="_blank">署名-非商业使用-禁止演绎</a>。</p>
                        <p style={this.prepareStyles(styles.p) }>API由<a href="http://www.zblogcn.com/" target="_blank"> Z-BlogPHP </a>最新版本强力驱动；前端基于<a href="https://facebook.github.io/react/" target="_blank" rel="nofollow">React</a> + <a href="http://material-ui.com/" target="_blank" rel="nofollow">material-ui</a>。</p>
                        <p style={this.prepareStyles(styles.p) }><a href="http://www.miitbeian.gov.cn/" target="_blank" rel="nofollow">闽ICP备15006942号</a> &nbsp; <a href="http://blog.zsxsoft.com/post/9">[关于]</a> <a href="/feed.php" target="_blank">[RSS]</a> </p>
                    </div>
                </FullWidthSection>
            </div>
        */
    }

    _getTabs() {
    }

    _handleTabChange(value, e, tab) {
        if (tab.props.route === "github") {
            window.open("https://github.com/zsxsoft");
            return;
        }
        this.context.router.push(tab.props.route);
        this.setState({ tabIndex: value });
    }


}
