///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Router} from 'react-router';
import FullWidthSection from '../full-width-section';
import ReactComponentWithMixin from '../component-with-mixin';
import Config from '../../config';
import {formatDate, formatArticleContent, isMobile as checkMobile} from '../../utils';
import AutoResponsive from 'autoresponsive-react';
import EmbedDuoshuo from '../duoshuo/embed-thread';
import ShareDuoshuo from '../duoshuo/share';
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
let articleResizeId = 0;
let resizeChangeWidthOriginal = (context, focus) => {

    if (!context.state.mounted && !focus) return;
    
    isMobile = checkMobile();
    let container = ReactDOM.findDOMNode(context.refs.container);
    let containerWidth = container === null ? document.body.clientWidth : container.clientWidth;
    if (isMobile) {
      containerWidth /= 1.1
    } else {
      containerWidth /= 2;
    }
    
    context.setState({
      responsiveStyle: {
        padding: isMobile ? 0 : 15, 
        paddingBottom: "10px",
        display: "block",
        minHeight: 1000,
        width: containerWidth,
        marginLeft: "auto",
        marginRight: "auto",
        transform: isMobile ? "" : "translate(50%, 0)", 
        WebkitTransform: isMobile ? "" : "translate(50%, 0)",
      },
      containerWidth: containerWidth,
    }, 
    );
};
let resizeChangeWidth;

class PageArticle extends ReactComponentWithMixin {
  prepareStyles() {
    return Mixins.StylePropable.prepareStyles.call(this);
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
  
  constructor(props) {
    super(props);
    let self = this;
    resizeChangeWidth = (focus) => {
      resizeChangeWidthOriginal(self, focus);
    }
    fetch(Config.url + this.props.location.pathname).then((data) => {
      return data.json();
    }).then((json) => {
      this.setState({data: json});
    });
    
  }

  componentWillMount() {
    this.setState({mounted: true});
    resizeChangeWidth(true);
    articleResizeId = window.resizeQueue.add(resizeChangeWidth);
  }
    
  componentWillUnmount() {
    this.setState({mounted: false});
    window.resizeQueue.remove(articleResizeId);
  }

  render() {
    let data = this.state.data;
    let singleTargetStyle = this.state.responsiveStyle;
    let childContext = (<div>Please wait..</div>);
    if (data) { 
      let article = data.article;
      let contentHtml = {__html: formatArticleContent(article.Content)};
      let linkTo = "/post/" + article.ID;
      document.title = article.Title + " - " + Config.title;
      childContext = (
      <div style={{paddingTop: isMobile ? 60 : 30}}>
       <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
       <div style={singleTargetStyle} key={article.ID}>
        <Card>
        <CardText>
          <Link to={linkTo} style={{textDecoration: "none !important"}}><FlatButton style={{width: "100%"}}><CardTitle title={article.Title} style={{position: "inherit"}}/></FlatButton></Link>
          <div style={{marginBottom: 10}}>
            <Avatar src={article.Author.Avatar} style={{verticalAlign: "middle", marginRight: 5}}/>zsx 
            <span style={{color: "rgba(0, 0, 0, 0.54)", float: "right", marginTop: 7}}>
              {formatDate(article.PostTime)} in {article.Category.Name} 
              <span> / </span><ExtensionDuoshuo type="thread-count" duoshuoKey={article.ID} title={article.Title} url={article.Url} content={article.Intro} />
              <span> / </span>{article.ViewNums}
            </span>
          </div>
          <article dangerouslySetInnerHTML={contentHtml}></article>
          <ShareDuoshuo type="share" duoshuoKey={article.ID} title={article.Title} url={article.Url} content={article.Intro} />
          <EmbedDuoshuo duoshuoKey={article.ID} title={article.Title} url={article.Url} />
        </CardText>
        </Card>
        </div>
       </AutoResponsive></div>
      );
    }
    return (
      <FullWidthSection>
      {childContext}
      </FullWidthSection>
    );
  }

};

export default PageArticle;
