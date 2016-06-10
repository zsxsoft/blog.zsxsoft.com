///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import Router from 'react-router';
import Config from '../config';
import Container from './Container';
import {Navbar, Nav, NavItem, Button, MenuItem, Image} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Ink from 'react-ink';

export default class Master extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 0,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let path = nextProps.location.pathname;
        if (/^\/list/.test(path)) {
            return this.setState({activeKey: 0});
        } else if (/\/post\/2$/.test(path)) {
            return this.setState({activeKey: 2});
        } else if (/\/post\/9$/.test(path)) {
            return this.setState({activeKey: 9});
        } else {
             return this.setState({activeKey: -1});
        }
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        setTimeout(() => {
            window.doRemain();
        }, 1000);
    }

    render() {

        return (
            <div style={{backgroundImage: "url(images/00017.m2ts_snapshot_00.46.jpg)", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: "50%, 50%"}}>
            <div>
                <Navbar style={{background: "#000000", zIndex: 10000, opacity: 0.5}}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="//blog.zsxsoft.com">zsx's Blog<Ink/></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav activeKey={this.state.activeKey}>
                            <NavItem eventKey={0}><a href="/" onClick={this._handleTabChange.bind(this)}>首页<Ink/></a></NavItem>
                            <NavItem eventKey={2}><a href="/post/2" onClick={this._handleTabChange.bind(this)}>留言<Ink/></a></NavItem>
                        </Nav>
                        <Nav activeKey={this.state.activeKey} pullRight>
                            <NavItem><a onClick={this._handleTabChange.bind(this)} href="https://github.com/zsxsoft/">GitHub<Ink/></a></NavItem>
                            <NavItem><a onClick={this._handleTabChange.bind(this)} eventKey={9} href="/post/9">About<Ink/></a></NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </div>
                <Container className="mainContent" style={{wordBreak: "break-all", wordWrap: "break-word", overflow: "hidden", paddingTop: 10, opacity: 0.9}}>
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="fade"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        {React.cloneElement(this.props.children, {
                            key: location.href, 
                        })}
                    </ReactCSSTransitionGroup>
                </Container>
                
                <Container>
                <footer style={{textAlign: "center"}}>
                        <p>本站采用<a href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/" target="_blank" rel="nofollow" title="查看普通文本">创作共用版权协议</a>，转载本站内容即代表同意了本协议，必须<a href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/legalcode" title="查看法律文本" rel="nofollow" target="_blank">署名-非商业使用-禁止演绎</a>。</p>
                        <p>API由 <a href="http://www.zblogcn.com/" target="_blank">Z-BlogPHP</a> 最新版本强力驱动；前端基于<a href="https://facebook.github.io/react/" target="_blank" rel="nofollow">React</a> + <a href="http://fezvrasta.github.io/bootstrap-material-design/" target="_blank" rel="nofollow">Material Design for Bootstrap</a>。</p>
                        <p><a href="http://www.miitbeian.gov.cn/" target="_blank" rel="nofollow">闽ICP备15006942号</a> &nbsp; <a href="/feed.php" target="_blank">[RSS]</a> </p>
                    </footer>
                </Container>
            </div>
        );
    }

    _handleTabChange(value, what, e) {
        event.preventDefault();
        let parentElement = value.target.parentElement;
        let href = parentElement.getAttribute("href");
        if (/^http/.test(href) && href.indexOf(location.host) < 0) {
            window.open(href);
            return;
        }
        this.context.router.push(href);
          
    }


}

Master.contextTypes = {
    location: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
};

/*
<header style={{position: "relative", marginTop: -80, backgroundImage: "url(images/00017.m2ts_snapshot_00.46.jpg)", backgroundSize: "cover", backgroundPosition: "50% 21%", height: 650, opacity: 0.8}}>
                    <div style={{top: 180}}>
                        <h1> zsx's Blog </h1>
                    </div>
                </header>
 */