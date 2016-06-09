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
    }

    componentWillUnmount() {
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
                        <Nav>
                            <NavItem eventKey={1} href="#">首页<Ink/></NavItem>
                            <NavItem eventKey={2} href="#">留言<Ink/></NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">GitHub<Ink/></NavItem>
                            <NavItem eventKey={2} href="#">About<Ink/></NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </div>
                <Container>{this.props.children}
                
                </Container>
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

Master.contextTypes = {
    location: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
};