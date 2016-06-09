///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import Router from 'react-router';
import Config from '../config';
import Container from './Container';
import {Navbar, Nav, NavItem, Button, MenuItem} from 'react-bootstrap';
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
            <div>
            <div>
                <Navbar className="navbar-default">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="//blog.zsxsoft.com">zsx's Blog<Ink/></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav activeKey={this.state.activeKey}>
                            <NavItem onClickCapture={this._handleTabChange.bind(this)} eventKey={0} href="/">首页<Ink/></NavItem>
                            <NavItem onClickCapture={this._handleTabChange.bind(this)} eventKey={2} href="/post/2">留言<Ink/></NavItem>
                        </Nav>
                        <Nav activeKey={this.state.activeKey} pullRight>
                            <NavItem onClickCapture={this._handleTabChange.bind(this)} href="https://github.com/zsxsoft/">GitHub<Ink/></NavItem>
                            <NavItem onClickCapture={this._handleTabChange.bind(this)} eventKey={9} href="/post/9">About<Ink/></NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </div>
                <Container>{this.props.children}</Container>
                <Container>
                <div style={{textAlign: "center"}}>
                        <p>本站采用<a href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/" target="_blank" rel="nofollow" title="查看普通文本">创作共用版权协议</a>，转载本站内容即代表同意了本协议，必须<a href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/legalcode" title="查看法律文本" rel="nofollow" target="_blank">署名-非商业使用-禁止演绎</a>。</p>
                        <p>API由 <a href="http://www.zblogcn.com/" target="_blank">Z-BlogPHP</a> 最新版本强力驱动；前端基于<a href="https://facebook.github.io/react/" target="_blank" rel="nofollow">React</a> + <a href="http://fezvrasta.github.io/bootstrap-material-design/" target="_blank" rel="nofollow">Material Design for Bootstrap</a>。</p>
                        <p><a href="http://www.miitbeian.gov.cn/" target="_blank" rel="nofollow">闽ICP备15006942号</a> &nbsp; <a href="/feed.php" target="_blank">[RSS]</a> </p>
                    </div>
                </Container>
            </div>
        );
    }

    _handleTabChange(value) {
        event.preventDefault();
        console.log(event.defaultPrevented);
        return;
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