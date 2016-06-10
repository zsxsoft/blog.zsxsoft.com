///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import Router from 'react-router';
import Container from './Container';
import {Navbar, Nav, NavItem, Button, MenuItem, Image} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Ink from 'react-ink';
import { LinkContainer } from 'react-router-bootstrap';


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
            <div style={{backgroundImage: `url(${window.config.backgroundUrl})`, backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: "50%, 50%", minHeight: "100%"}}>
            <div>
                <Navbar style={{background: "#000000", zIndex: 10000, opacity: 0.5}}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="//blog.zsxsoft.com">{window.config.title}<Ink/></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav activeKey={this.state.activeKey}>
                            <LinkContainer to="/"><NavItem eventKey={0} href="/" onClick={this._handleTabChange.bind(this)}>首页<Ink/></NavItem></LinkContainer>
                            <LinkContainer to="/post/2"><NavItem eventKey={2} onClick={this._handleTabChange.bind(this)}>留言<Ink/></NavItem></LinkContainer>
                        </Nav>
                        <Nav activeKey={this.state.activeKey} pullRight>
                            <NavItem><a onClick={this._handleTabChange.bind(this)} href="https://github.com/zsxsoft/">GitHub<Ink/></a></NavItem>
                            <LinkContainer to="/post/9"><NavItem><a onClick={this._handleTabChange.bind(this)} eventKey={9} href="/post/9">About<Ink/></a></NavItem></LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </div>
                <Container className="mainContent" style={{wordBreak: "break-all", wordWrap: "break-word", paddingTop: 10, opacity: 0.9}}>
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
                
                <Container dangerouslySetInnerHTML={{__html: document.getElementById("footer-template").innerHTML}} />
            </div>
        );
    }

    _handleTabChange(value, what, e) {
        /* Useless */
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