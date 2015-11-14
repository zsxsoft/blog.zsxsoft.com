///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Router} from 'react-router';
import FullWidthSection from '../full-width-section';
import ReactComponentWithMixin from '../component-with-mixin';
import Config from '../../config';
import {formatDate, formatArticleContent} from '../../utils';
import AutoResponsive from 'autoresponsive-react';

import {
  Avatar,
  AppCanvas,
  FontIcon,
  IconButton,
  FlatButton,
  EnhancedButton,
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

let ThemeManager = Styles.ThemeManager;
class PageArticle extends ReactComponentWithMixin {

  resizeChangeWidth() {
    let container = ReactDOM.findDOMNode(this.refs.container);
    let containerWidth = container === null ? document.body.clientWidth : container.clientWidth;
    containerWidth /= 2;
    this.setState({
      responsiveStyle: {
        padding: "15px", 
        paddingBottom: "10px",
        display: "block",
        minHeight: 1000,
        width: containerWidth,
        marginLeft: "auto",
        marginRight: "auto",
        transform: "translate(50%, 0)", 
        WebkitTransform: "translate(50%, 0)",
      },
      containerWidth: containerWidth,
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
  
  constructor(props) {
    super(props);
    fetch(Config.url + this.props.location.pathname).then((data) => {
      return data.json();
    }).then((json) => {
      this.setState({data: json});
    });
    
  }

  componentWillMount() {
    this.resizeChangeWidth();
    window.addEventListener('resize', this.resizeChangeWidth.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeChangeWidth);
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
       <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
       <div style={singleTargetStyle} key={article.ID}>
        <Card>
        <CardText>
          <Link to={linkTo} style={{textDecoration: "none !important"}}><FlatButton style={{width: "100%"}}><CardTitle title={article.Title} style={{position: "inherit"}}/></FlatButton></Link>
          <div style={{marginBottom: 10}}>
            <Avatar src={article.Author.Avatar} style={{verticalAlign: "middle", marginRight: 5}}/>zsx 
            <span style={{color: "rgba(0, 0, 0, 0.54)", float: "right", marginTop: 9}}><time>{formatDate(article.PostTime)}</time> in {article.Category.Name}</span>
          </div>
          <article dangerouslySetInnerHTML={contentHtml}></article>
        </CardText>
        </Card>
        </div>
       </AutoResponsive>
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
