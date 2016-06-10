///<reference path="../../../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Router} from 'react-router';
import Container from '../Container';
import Config from '../../config';
import {formatDate, formatArticleContent, filterHtml, isMobile as checkMobile} from '../../utils';
import EmbedDuoshuo from '../Duoshuo/EmbedThread';
import ShareDuoshuo from '../Duoshuo/Share';
import ExtensionDuoshuo from '../Duoshuo/Extensions';
import {Navbar, Nav, NavItem, Button, Col, Row, Well, Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import Ink from 'react-ink';

let isMobile = checkMobile();

export default class Article extends React.Component {


    constructor(props) {
        super(props);
        let self = this;
        fetch(Config.url + this.props.location.pathname).then((data) => {
            return data.json();
        }).then((json) => {
            this.setState({ data: json });
        });

    }

    componentWillMount() {
        this.setState({ mounted: true });
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.setState({ mounted: false });
    }

    render() {
        let data = this.state.data;
        let childContext = (<div>Please wait..</div>);
        if (data) {
            let article = data.article;
            let contentHtml = { __html: formatArticleContent(article.Content) };
            let linkTo = "/post/" + article.ID;
            document.title = article.Title + " - " + Config.title;
            childContext = <div>
                <Container>
                    <Well bsSize="large" key={article.ID}>
                        <h1 style={{ width: "100%", fontSize: 20 }} className="articleTitle">{article.Title}</h1>
                        <Row>
                            <Col md={2} xs={5}>
                                <Image circle src={article.Author.Avatar} style={{ verticalAlign: "middle", marginRight: 5, height: 32 }}/>{article.Author.StaticName}
                            </Col>
                            <Col style={{ textAlign: "right" }}>
                                <span style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: isMobile ? 10 : 14, marginTop: 7 }}>
                                    {formatDate(article.PostTime) } in {article.Category.Name}
                                    <span> / </span><ExtensionDuoshuo type="thread-count" duoshuoKey={article.ID} title={article.Title} url={article.Url} content={filterHtml(article.Intro) } />
                                    <span> / </span>{article.ViewNums}
                                </span>
                            </Col>
                        </Row>
                        <Row><br/></Row>
                        <Row><Col md={12}><article dangerouslySetInnerHTML={contentHtml}></article></Col></Row>
                        <Row><Col md={12}><Container><Col mdOffset={2}><ShareDuoshuo type="share" duoshuoKey={article.ID} title={article.Title} url={article.Url} content={article.Intro} /></Col></Container></Col></Row>
                        <Row><Col md={12}><EmbedDuoshuo duoshuoKey={article.ID} title={article.Title} url={article.Url} /></Col></Row>
                    </Well>
                </Container>
            </div>
        }
        return (
            <Container>
                {childContext}
            </Container>
        );
    }

};


/*
childContext = (
                
            );
 */