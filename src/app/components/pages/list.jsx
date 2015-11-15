///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Router} from 'react-router';
import FullWidthSection from '../full-width-section';
import ReactComponentWithMixin from '../component-with-mixin';
import Config from '../../config';
import {formatDate, isMobile as checkMobile, filterHtml, getNewListUri} from '../../utils';
import AutoResponsive from 'autoresponsive-react';
import ExtensionDuoshuo from '../duoshuo/extensions';
import {
  Avatar,
  AppCanvas,
  FontIcon,
  IconButton,
  FlatButton,
  EnhancedButton,
  FloatingActionButton,
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
        padding: !isMobile ? 0 : 15,
        paddingTop: 15,
        minHeight: 100,
        //height: "auto",
        //width: 300,
        width: !isMobile ? (containerWidth * 0.88) / 3 : containerWidth * 0.9,
      },
      containerWidth: containerWidth,
    }, 
    );
  }
  
  
  getAutoResponsiveProps() {
    return {
      itemMargin: isMobile ? 0 : 10,
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
      this.setState({data: json});
    });
  }
  constructor(props) {
    super(props);  
    this.initState(props);  
  }

  componentWillMount() {
    this.setState({mounted: true});
    this.resizeChangeWidth(true);
    listResizeId = window.resizeQueue.add(this.resizeChangeWidth.bind(this));
  }
  
  componentDidMount() {
    document.title = "文章列表 - " + Config.title;
  }
  
  componentWillUnmount () {
    this.setState({mounted: false});
    window.resizeQueue.remove(listResizeId);
  }
  
  pageTo(pageForward) {
    let currentPage = this.state.data.pagebar.current;
    let nextPage = currentPage + pageForward;
    let maxPage = parseInt(this.state.data.pagebar.max / this.state.data.pagebar.pageCount) + 1;
    if (nextPage <= 0 || nextPage > maxPage) nextPage = currentPage;
    return getNewListUri(this.props.location.pathname, {page: nextPage});
  }
  
  componentWillReceiveProps(props) {
    this.initState(props);
  }
  
  shouldComponentUpdate (nextProps) {
    return (nextProps.location.pathname === this.props.location.pathname);
  }
  
  render() {
    let data = this.state.data;
    let singleTargetStyle = this.state.responsiveStyle;
    let childContext = (<div>Please wait..</div>);
    if (data) {
      childContext = (<div style={{paddingTop: isMobile ? 30 : 15}} className="list-container">
       <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
       {data.articles.map((article) => {
        let introHtml = {__html: article.Intro};
        let linkTo = "/post/" + article.ID;
        return <div style={singleTargetStyle} key={article.ID}>
        
        <Card>
          <Link to={linkTo}><FlatButton style={{width: "100%"}}><CardTitle title={article.Title} style={{position: "inherit"}}/></FlatButton></Link>
          <CardText dangerouslySetInnerHTML={introHtml} style={{background: "#F5F5F5", height: 100}}>
          </CardText>
          <CardText>
            <Avatar src={article.Author.Avatar} style={{verticalAlign: "middle", marginRight: 5}}/>zsx 
            <span style={{color: "rgba(0, 0, 0, 0.54)", float: "right", marginTop: 7, fontSize: isMobile ? 10 : 14}}>
              {formatDate(article.PostTime)} in <Link to={getNewListUri(this.props.location.pathname, {cate: article.Category.ID})}>{article.Category.Name}</Link> 
              <span> / </span><ExtensionDuoshuo type="thread-count" duoshuoKey={article.ID} title={article.Title} url={article.Url} content={filterHtml(article.Intro)} />
              <span> / </span>{article.ViewNums}
            </span>
          </CardText>
        </Card>
        
        </div>
       })}

       </AutoResponsive>
       <div style={{position: "fixed", top: "58%", left: "90%"}}>
        <Link to={this.pageTo(-1)}><FloatingActionButton style={{float: "left"}}>
          <span style={{color: "white"}}>&lt;</span>
        </FloatingActionButton></Link>&nbsp;
        <Link to={this.pageTo(1)}><FloatingActionButton style={{float: "right"}}>
          <span style={{color: "white"}}>&gt;</span>
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

export default PageList;

/*
       {data.sidebar.map((sidebar) => {
        let contentHtml = {__html: sidebar.Content};
        let sidebarContainer;
       
        if (sidebar.Type === "div") {
          sidebarContainer = (<div id={sidebar.HtmlID}><span dangerouslySetInnerHTML={contentHtml} style={{background: "#F5F5F5"}} /></div>);
        } else {
          let result;
          let reg = /<li(.*?)>([\w\W]*?)<\/li>/gi;
          let liContainer = [];
          while ((result = reg.exec(sidebar.Content)) != null)  {
              liContainer.push(<ListItem key={result.index} {...result[1]}><div dangerouslySetInnerHTML={{__html: result[2]}} /></ListItem>);
          }
          sidebarContainer = (<List id={sidebar.HtmlID}>{liContainer}</List>);
        }
        return <div style={singleTargetStyle} key={sidebar.HtmlID}>
        <Card>
          <CardTitle title={sidebar.Name}/>
          <CardText>
           {sidebarContainer}
          </CardText>
        </Card>
        </div>
       })}
*/