///<reference path="../../../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Router, PropTypes} from 'react-router';
import Container from '../Container';
import Config from '../../config';
import {formatDate, isMobile as checkMobile, filterHtml, getNewListUri, jsonConcat} from '../../utils';
import {default as ExtensionDuoshuo} from '../Duoshuo/Extensions';

let isMobile = checkMobile();
let listResizeId = 0;
export default class List extends React.Component {

    initState(props) {
        fetch(Config.url + props.location.pathname).then((data) => {
            return data.json();
        }).then((json) => {
            this.setState({ data: json });
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
        document.title = "文章列表 - " + Config.title;
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

    sidebarListClick(url) {
        console.log(this.context);
        this.context.history.pushState(null, url);
    }

    render() {
        let that = this;
        let data = this.state.data;
        return (<div></div>);
        /*
            <FullWidthSection>
                {childContext}

            </FullWidthSection>
        */
    }

};
List.contextTypes = { history: PropTypes.history }



/*
<div style={{ paddingTop: isMobile ? 50 : 15 }} className="list-container">
                <AutoResponsive ref="container" {...this.getAutoResponsiveProps() }>
                    {data.articles.map((article) => {
                        let introHtml = { __html: article.Intro };
                        let linkTo = "/post/" + article.ID;
                        return (<Card style={singleTargetStyle} key={article.ID}>
                            <Link to={linkTo}><FlatButton style={{ width: "100%" }}><CardTitle title={article.Title} style={{ position: "inherit", padding: 10, height: 30, overflow: "hidden" }}/></FlatButton></Link>
                            <CardText dangerouslySetInnerHTML={introHtml} style={cardTextStyle}>
                            </CardText>
                            <CardText>
                                <Avatar src={article.Author.Avatar} style={{ verticalAlign: "middle", marginRight: 5 }}/>zsx
                                <span style={{ color: "rgba(0, 0, 0, 0.54)", float: "right", marginTop: 7, fontSize: isMobile ? 10 : 14 }}>
                                    {formatDate(article.PostTime) } in <Link to={getNewListUri(this.props.location.pathname, { cate: article.Category.ID }) }>{article.Category.Name}</Link>
                                    <span> / </span><ExtensionDuoshuo type="thread-count" duoshuoKey={article.ID} title={article.Title} url={article.Url} content={filterHtml(article.Intro) } />
                                    <span> / </span>{article.ViewNums}
                                </span>
                            </CardText>
                        </Card>);
                    }) }
                    {data.sidebar.map((sidebar) => {
                        let sidebarStyle = this.state.responsiveStyle;
                        let sidebarSingleState = this.state["sidebar_" + sidebar.HtmlID];
                        sidebarStyle.position = "relative";
                        if (sidebarSingleState) {
                            sidebarStyle = jsonConcat(sidebarStyle, this.state["sidebar_" + sidebar.HtmlID]);
                        }
                        let contentHtml = { __html: sidebar.Content };
                        let sidebarContainer;

                        if (sidebar.Type === "div") {
                            // For duoshuo
                            if (sidebar.HtmlID === "Duoshuo_RecentComments") {
                                sidebarContainer = (<ExtensionDuoshuo type="recent-comments" data-num-items="5"/>);
                            } else {
                                sidebarContainer = (<div id={sidebar.HtmlID} dangerouslySetInnerHTML={contentHtml}></div>);
                            }

                        } else {
                            let result;
                            let reg = /<li(.*?)>([\w\W]*?)<\/li>/gi;
                            let liContainer = [];
                            while ((result = reg.exec(sidebar.Content)) !== null) {
                                let listObject = ((htmlContent) => {
                                    let ret = {
                                        html: null,
                                        attr: {},
                                    };
                                    let result;
                                    let reg = /<a(.*?)href="(.*?)"(.*?)>([\w\W]*?)<\/a>/gi;
                                    if ((result = reg.exec(htmlContent)) !== null) {
                                        ret.attr.primaryText = result[4];
                                        ret.attr.onClick = that.sidebarListClick.bind(that, result[2]);
                                    } else {
                                        ret.html = <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
                                    }
                                    return ret;
                                })(result[2]);
                                liContainer.push(<ListItem key={result.index} {...listObject.attr}>{listObject.html}</ListItem>);
                            }
                            sidebarContainer = (<List id={sidebar.HtmlID}>{liContainer}</List>);
                        }
                        return (
                            <Card style={sidebarStyle} key={sidebar.HtmlID}>
                                <CardTitle title={sidebar.Name}/>
                                <FlatButton onClick={that.resizeCard.bind(that, "sidebar_" + sidebar.HtmlID) } backgroundColor="#000000" style={{ fontSize: 32, color: "#ffffff", height: 32, position: "absolute", bottom: 0, width: "100%", opacity: 0.7, zIndex: 100000, float: "left", verticalAlign: "bottom" }}>
                                    <i className="material-icons">{sidebarSingleState ? sidebarSingleState.keyboardArrow : "keyboard_arrow_down"}</i>
                                </FlatButton>
                                <CardText>
                                    {sidebarContainer}
                                </CardText>
                            </Card>)
                    }) }
                </AutoResponsive>
                <div style={{ position: "fixed", top: "90%", right: "2%", width: "120px", zIndex: 100000 }}>
                    <Link to={this.pageTo(-1) }><FloatingActionButton style={{ float: "left" }}>
                        <span style={{ color: "white" }}>&lt; </span>
                    </FloatingActionButton></Link>
                    <Link to={this.pageTo(1) }><FloatingActionButton style={{ float: "right" }}>
                        <span style={{ color: "white" }}>&gt; </span>
                    </FloatingActionButton></Link>
                </div>
            </div>
 */