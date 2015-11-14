///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Router} from 'react-router';
import FullWidthSection from '../full-width-section';
import ReactComponentWithMixin from '../component-with-mixin';
import Config from '../../config';
import {formatDate, isMobile as checkMobile} from '../../utils';
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
    this.setState({
      responsiveStyle: {
        display: "inline-block",
        padding: !isMobile ? 0 : 15,
        paddingTop: 15,
        minHeight: 100,
        height: "auto",
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
  
  constructor(props) {
    super(props);
    fetch(Config.url + this.props.location.pathname).then((data) => {
      return data.json();
    }).then((json) => {
      this.setState({data: json});
    });
    
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
    console.log(nextPage);
    console.log(maxPage);
    if (nextPage <= 0 || nextPage > maxPage) nextPage = currentPage;
    return this.props.location.pathname.replace(/page\/(\d*)/, (substring, page) => {
      return "page/" + nextPage;
    });
  }
  
  render() {
    let data = this.state.data;
    let singleTargetStyle = this.state.responsiveStyle;
    let childContext = (<div>Please wait..</div>);
    if (data) {
      childContext = (<div style={{paddingTop: isMobile ? 60 : 30}} >
       <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
       {data.articles.map((article) => {
        let introHtml = {__html: article.Intro};
        let linkTo = "/post/" + article.ID;
        return <div style={singleTargetStyle} key={article.ID}>
        
        <Card>
          <Link to={linkTo}><FlatButton style={{width: "100%"}}><CardTitle title={article.Title} style={{position: "inherit"}}/></FlatButton></Link>
          <CardText dangerouslySetInnerHTML={introHtml} style={{background: "#F5F5F5"}}>
          </CardText>
          <CardText>
            <Avatar src={article.Author.Avatar} style={{verticalAlign: "middle", marginRight: 5}}/>zsx 
            <span style={{color: "rgba(0, 0, 0, 0.54)", float: "right", marginTop: 7}}>
              {formatDate(article.PostTime)} in {article.Category.Name} 
              <span> / </span><ExtensionDuoshuo type="thread-count" duoshuoKey={article.ID} title={article.Title} url={article.Url} content={article.Intro} />
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
