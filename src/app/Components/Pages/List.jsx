///<reference path="../../../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Router} from 'react-router';
import {formatDate, isMobile as checkMobile, filterHtml, getNewListUri, jsonConcat} from '../../utils';
import ExtensionDuoshuo from '../Duoshuo/Extensions';
import {Navbar, Nav, NavItem, Col, Well, Image, Row, ListGroup, ListGroupItem} from 'react-bootstrap';
import Container from '../Container';
import Button from '../DivButton';
import Ink from 'react-ink';
import { LinkContainer } from 'react-router-bootstrap';

let isMobile = checkMobile();
export default class List extends React.Component {

    initState(props) {
        fetch(window.config.apiUrl + props.location.pathname).then((data) => {
            return data.json();
        }).then(json => {
            if (this.state.mounted) {
                this.setState({ data: json });
            }
        });
    }

    constructor(props) {
        super(props);
        this.initState(props);
    }

    componentWillMount() {
        this.setState({ mounted: true });
    }

    componentDidMount() {
        document.title = "文章列表 - " + window.config.title;
    }

    componentDidUpdate() {
        window.doListLoaded();
        window.doGlobal();
    }

    componentWillUnmount() {
        this.setState({ mounted: false });
    }

    pageTo(pageForward) {
        let currentPage = this.state.data.pagebar.current;
        let nextPage = currentPage + pageForward;
        let maxPage = parseInt(this.state.data.pagebar.max / this.state.data.pagebar.pageCount) + 1;
        if (nextPage <= 0 || nextPage > maxPage) nextPage = currentPage;
        return getNewListUri(this.props.location.pathname, { page: nextPage });
    }

    componentWillReceiveProps(props) {
        this.initState(props);
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.location.pathname === this.props.location.pathname);
    }
    getSidebarContainer(sidebar) {
        let that = this;
        let sidebarContainer = <div/>;
        let contentHtml = { __html: sidebar.Content };

        if (sidebar.Type === "div") {
            if (sidebar.HtmlID === "Duoshuo_RecentComments") {
                sidebarContainer = (<ExtensionDuoshuo type="recent-comments" data-num-items="5"/>);
            } else {
                sidebarContainer = (<div id={sidebar.HtmlID} dangerouslySetInnerHTML={contentHtml}></div>);
            }
            return sidebarContainer;
        }

        let result;
        let reg = /<li(.*?)>([\w\W]*?)<\/li>/gi;
        let liContainer = [];
        while ((result = reg.exec(sidebar.Content)) !== null) {
            let listObject = (htmlContent => {
                let result;
                let reg = /<a(.*?)href="(.*?)"(.*?)>([\w\W]*?)<\/a>/gi;
                if ((result = reg.exec(htmlContent)) !== null) {
                    if (result[2].indexOf(location.host) < 0 && /^http/.test(result[2])) {
                        return <a href={result[2]} target="_blank">{result[4]}<Ink/></a>;
                    } else {
                        return <Link to={result[2].replace(location.origin, "")}>{result[4]}<Ink/></Link>
                    }
                    
                } else {
                    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
                }
            })(result[2]);
            liContainer.push(<ListGroupItem key={result.index}><Button style={{textAlign: "left"}}>{listObject}</Button></ListGroupItem>);
        }
        sidebarContainer = (<ListGroup id={sidebar.HtmlID}>{liContainer}</ListGroup>);
        return sidebarContainer;
    }

    render() {
        let that = this;
        let data = this.state.data;
        let childContext = (<div>Please wait..</div>);
        if (data) {
            childContext = (<div>
                <Col md={8} xs={12}>
                    {data.articles.map(article => {
                        let introHtml = { __html: article.Intro };
                        let linkTo = "/post/" + article.ID;
                        return (<Well bsSize="large" key={article.ID} style={{padding: 0}}>
                            <Button style={{ width: "100%", fontSize: 24, margin: 0}} className="articleTitle"><Link to={linkTo}>{article.Title}<Ink/></Link></Button>
                            <div style={{backgroundColor: "#F5F5F5", padding: 16}}><div dangerouslySetInnerHTML={introHtml}></div></div>
                            <div style={{padding: 15}}>
                                <Col md={2} xs={5}>
                                    <Image circle src={article.Author.Avatar} style={{ verticalAlign: "middle", marginRight: 5, height: 32 }}/>{article.Author.StaticName}
                                </Col>
                                <Col style={{ textAlign: "right" }}>
                                    <span style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: isMobile ? 10 : 14}}>
                                        {formatDate(article.PostTime) } in <Link to={getNewListUri(this.props.location.pathname, { cate: article.Category.ID }) }>{article.Category.Name}</Link>
                                        <span> / </span><ExtensionDuoshuo type="thread-count" duoshuoKey={article.ID} title={article.Title} url={article.Url} content={filterHtml(article.Intro) } />
                                        <span> / </span>{article.ViewNums}
                                    </span>
                                </Col>
                            </div>
                        </Well>);
                    }) }
                </Col>
                <Col md={3} xs={12}>
                    {data.sidebar.map(sidebar => {
                        return <Well bsSize="large" key={sidebar.HtmlID}>
                        <p style={{ width: "100%", fontSize: 20 }}>{sidebar.Name}</p>
                        {this.getSidebarContainer(sidebar)}
                        </Well>
                    }) }
                </Col>

                <div style={{ position: "fixed", top: "90%", right: "2%", width: "120px", zIndex: 100000 }}>
                    <Link to={this.pageTo(-1) }><Button className="btn-fab" style={{ float: "left", backgroundColor: "#2e8bcc" }}>
                        <span style={{ color: "white" }}><i className="material-icons">keyboard_arrow_left</i></span><Ink/>
                    </Button></Link>
                    <Link to={this.pageTo(1) }><Button className="btn-fab" style={{ float: "right", backgroundColor: "#2e8bcc" }}>
                        <span style={{ color: "white" }}><i className="material-icons">keyboard_arrow_right</i></span><Ink/>
                    </Button></Link>
                </div>
            </div>);
        }
        return (<Container>{childContext}</Container>);
    }

};
