import React from 'react'
import { Link } from 'react-router'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import CardWithHeader from '../components/CardWithHeader'

import {formatDate, filterHtml, formatArticleContent} from '../utils'
import Page from './Page'

import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import ExtensionDuoshuo from '../components/Duoshuo/Extensions'
import ShareDuoshuo from '../components/Duoshuo/Share'
import EmbedDuoshuo from '../components/Duoshuo/EmbedThread'
import Comment from '../components/Comment'
import Waiting from '../components/Waiting'

export default class Article extends Page {
  componentDidUpdate (prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState)
    window.doArticleLoaded()
    window.doGlobal()
  }

  render () {
    const data = this.state.data
    const article = data.article
    if (!article) return <Waiting />
    const contentHtml = {__html: formatArticleContent(article.Content)}
    document.title = article.Title + ' - zsx\'s Blog'
    return (
      <div>
        <CardWithHeader id={parseInt(article.ID, 10)} title={article.Title} link=''>
          <CardText>
            <div style={{overflow: 'hidden'}}>
              <Avatar src={article.Author.Avatar} style={{verticalAlign: 'middle', marginRight: 5, marginTop: -2, float: 'left'}} />
              <span>
                <span style={{float: 'left'}}>{article.Author.StaticName}</span>
                <span style={{float: 'right'}}>
                  {formatDate(article.PostTime)} <span>in </span>
                  <span>{article.Category.Name}</span>
                  <span> / </span>
                  <span>{article.CommNums}</span>
                  <span> / </span>{article.ViewNums}
                </span>
              </span>
            </div>
          </CardText>
          <CardText>
            <article style={{color: '#ffffff'}} dangerouslySetInnerHTML={contentHtml} />
            <ShareDuoshuo type='share' duoshuoKey={article.ID} title={article.Title} url={article.Url} content={article.Intro} />
          </CardText>
          <CardText>
            <Comment comments={article.Comments} />
          </CardText>
        </CardWithHeader>
        <div>
          {article.Prev === null ? null : <Link to={article.Prev.Url}><FlatButton primary label={`← ${article.Prev.Title}`} /></Link>}
          {article.Next === null ? null : <Link to={article.Next.Url}><FlatButton primary label={`${article.Next.Title} →`} style={{float: 'right'}} /></Link>}
        </div>
      </div>)
  }
}
