///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Router, PropTypes} from 'react-router';
import FullWidthSection from '../full-width-section';
import ReactComponentWithMixin from '../component-with-mixin';
import Config from '../../config';
import {formatDate, isMobile as checkMobile, filterHtml, getNewListUri, jsonConcat} from '../../utils';
import AutoResponsive from 'autoresponsive-react';
import ExtensionDuoshuo from '../duoshuo/extensions';
import {
    Avatar,
    FloatingActionButton,
    FlatButton,
    Mixins,
    Card,
    CardHeader,
    CardTitle,
    CardText,
    List,
    ListItem,
    Styles,
    Paper,
}
from 'material-ui';
let {
    StylePropable,
} = Mixins;
let {
    Colors, Spacing, Typography,
} = Styles;
let isMobile = checkMobile();
let ThemeManager = Styles.ThemeManager;
let listResizeId = 0;
class PageList extends ReactComponentWithMixin {

    resizeChangeWidth(focus) {
        if (!this.state.mounted && !focus) return;
        isMobile = checkMobile();
        let container = ReactDOM.findDOMNode(this.refs.container);
        let containerWidth = container === null ? document.body.clientWidth : container.clientWidth;
        if (container === null) {
            containerWidth -= 48;
        } else {

        }

        this.setState({
            responsiveStyle: {
                display: "inline-block",
                height: 260,
                marginLeft: "auto",
                marginRight: "auto",
                left: isMobile ? "0" : containerWidth / 22 + 0.008 * containerWidth,
                //width: 300,
                width: !isMobile ? (containerWidth * 0.88) / 3 : containerWidth,// * 0.9,
            },
            containerWidth: containerWidth,
            isMobile: isMobile,
        },
        );
    }


    getAutoResponsiveProps() {
        return {
            itemMargin: 10,
            //containerWidth: this.state.containerWidth || document.body.clientWidth,
            itemClassName: 'item',
            transitionDuration: '.8',
            transitionTimingFunction: 'easeIn',
        };
    }

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
        this.resizeChangeWidth(true);
        listResizeId = window.resizeQueue.add(this.resizeChangeWidth.bind(this));
    }

    componentDidMount() {
        document.title = "文章列表 - " + Config.title;
    }

    componentWillUnmount() {
        this.setState({ mounted: false });
        window.resizeQueue.remove(listResizeId);
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

    resizeCard(cardState) {
        let originalState = this.state[cardState];
        let returnObject = {};
        if (!originalState) originalState = {
            height: this.state.responsiveStyle.height,
            keyboardArrow: "keyboard_arrow_down",
        };
        originalState.height = originalState.height !== this.state.responsiveStyle.height ? this.state.responsiveStyle.height : "auto";
        originalState.keyboardArrow = originalState.keyboardArrow === "keyboard_arrow_down" ? "keyboard_arrow_up" : "keyboard_arrow_down";
        returnObject[cardState] = originalState;
        this.setState(returnObject);
    }

    render() {
        let that = this;
        let data = this.state.data;
        let singleTargetStyle = this.state.responsiveStyle;
        let cardTextStyle = { background: "#F5F5F5", height: 100, overflow: "hidden" };
        let childContext = (<div>Please wait..</div>);
        if (data) {
            childContext = (<div style={{ paddingTop: isMobile ? 50 : 15 }} className="list-container">
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
                <div style={{ position: "fixed", top: "92%", right: "5%", width: "120px", zIndex: 100000 }}>
                    <Link to={this.pageTo(-1) }><FloatingActionButton style={{ float: "left" }}>
                        <span style={{ color: "white" }}>&lt; </span>
                    </FloatingActionButton></Link>
                    <Link to={this.pageTo(1) }><FloatingActionButton style={{ float: "right" }}>
                        <span style={{ color: "white" }}>&gt; </span>
                    </FloatingActionButton></Link>
                </div>
            </div>
            );

        }
        return (
            <FullWidthSection>
                {childContext}

            </FullWidthSection>
        );
    }

};
PageList.contextTypes = { history: PropTypes.history }
export default PageList;

/*

*/