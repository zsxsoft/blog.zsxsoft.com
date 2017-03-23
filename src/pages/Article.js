import React from 'react'
import { Link } from 'react-router-dom'
import { CardText } from 'material-ui/Card'
import CardWithHeader from '../components/CardWithHeader'

import {formatDate, formatArticleContent} from '../utils'
import Page from './Page'

import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import Comment from '../components/Comment'
import Waiting from '../components/Waiting'

export default class Article extends Page {
  componentDidUpdate (prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState)
    window.doArticleLoaded()
    window.doGlobal()
  }

  handleCommentPosted = () => {
    this.initState(this.props).then(() => {
      // Have to do there
      // Because PureCompoennt's shouldComponentUpdate only compare shallow
      // Too lazy to build a new scu function
      this.forceUpdate()
    })
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
          <CardText style={{height: 32}}>
            <div style={{overflow: 'hidden'}}>
              <Avatar src={article.Author.Avatar} style={{
                verticalAlign: 'middle',
                marginRight: 7,
                marginTop: 3,
                marginLeft: 3,
                height: 27,
                width: 27,
                float: 'left'}} />
              <span style={{color: '#000000'}}>
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
            <article style={{color: '#000000'}} dangerouslySetInnerHTML={contentHtml} />
            <div className='social-share' style={{
              margin: '0 auto',
              textAlign: 'center'
            }} />
          </CardText>
          <CardText>
            <Comment comments={article.Comments} onCommentPosted={this.handleCommentPosted} onRevertClicked={this.handleRevertClicked} postArea article={article} />
          </CardText>
        </CardWithHeader>
        <div>
          {article.Prev === null ? null : <Link to={article.Prev.Url}><FlatButton primary label={`← ${article.Prev.Title}`} /></Link>}
          {article.Next === null ? null : <Link to={article.Next.Url}><FlatButton primary label={`${article.Next.Title} →`} style={{float: 'right'}} /></Link>}
        </div>
      </div>)
  }
}
