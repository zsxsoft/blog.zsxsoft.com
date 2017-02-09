import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import {formatDate, isMobile, filterHtml, getNewListUri, jsonConcat, formatArticleContent} from '../utils'
import Page from './Page'
import ExtensionDuoshuo from '../components/Duoshuo/Extensions'
import ShareDuoshuo from '../components/Duoshuo/Share'
import EmbedDuoshuo from '../components/Duoshuo/EmbedThread'
import { List, ListItem } from 'material-ui/List'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import TouchRipple from 'material-ui/internal/TouchRipple'
import Style from 'style-it'
import chroma from 'chroma-js'

export default class Article extends Page {

  componentDidUpdate (prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState)
      /* window.doListLoaded()
      window.doGlobal() */
  }

  render () {
    const data = this.state.data
    const color = this.colors[parseInt(Math.random() * this.colors.length)]
    const article = data.article
    const brewer = chroma.brewer[color]
    if (!article) return (<section>Please wait...</section>)
    const contentHtml = {__html: formatArticleContent(article.Content)}
    document.title = article.Title + ' - zsx\'s Blog'
    return (<Style>
      {`
        .card-${article.ID} a {
          color: ${brewer[brewer.length - 1]};
        }
        .card-${article.ID} a:hover {
          color: ${brewer[brewer.length - 2]};
        }
        .card-${article.ID} a:active {
          color: ${brewer[brewer.length - 3]};
        }
      `}
      <Card style={{marginBottom: '1em', borderRadius: '0.5em'}} className={`card-${article.ID}`}>
        <div>
          <CardMedia
            expandable
            overlay={<CardTitle title={article.Title} />}
                    >
            <canvas className='canvas-triangles' data-color={color} />
          </CardMedia>
        </div>
        <CardText>
          <Avatar src={article.Author.Avatar} style={{verticalAlign: 'middle', marginRight: 5}} />
          <span>{article.Author.StaticName}</span>
          <span style={{float: 'right', marginTop: 7}}>
            {formatDate(article.PostTime)} <span>in </span>
            <span>{article.Category.Name}</span>
            <span> / </span>
            <ExtensionDuoshuo type='thread-count' duoshuoKey={article.ID} title={article.Title} url={article.Url} content={filterHtml(article.Intro)} />
            <span> / </span>{article.ViewNums}
          </span>
        </CardText>
        <CardText>
          <article dangerouslySetInnerHTML={contentHtml} />
          <ShareDuoshuo type='share' duoshuoKey={article.ID} title={article.Title} url={article.Url} content={article.Intro} />
        </CardText>
        <CardText>
          <EmbedDuoshuo duoshuoKey={article.ID} title={article.Title} url={article.Url} />
        </CardText>
      </Card>
    </Style>)
  }

}
