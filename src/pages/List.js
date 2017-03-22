import React from 'react'
import { Link } from 'react-router'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import CardWithHeader from '../components/CardWithHeader'
import QueueAnim from 'rc-queue-anim'

import {formatDate, filterHtml, getNewListUri} from '../utils'
import Page from './Page'

import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import TouchRipple from 'material-ui/internal/TouchRipple'
import Waiting from '../components/Waiting'

import './List.css'

export default class List extends Page {
  componentDidMount () {
    document.title = '文章列表 - ' + window.config.title
  }

  componentDidUpdate (prevProps, prevState) {
    // super.componentDidUpdate(prevProps, prevState)
    window.doListLoaded()
    window.doGlobal()
  }

  handleAnimationEnd = (data) => {
    if (data.type === 'enter') {
      this.trianglify(document.querySelector(`.canvas-triangle-${data.key}`))
    }
  }

  pageTo = pageForward => {
    const currentPage = this.state.data.pagebar.current
    const maxPage = parseInt(this.state.data.pagebar.max / this.state.data.pagebar.pageCount, 10) + 1
    let nextPage = currentPage + pageForward
    if (nextPage <= 0 || nextPage > maxPage) nextPage = currentPage
    return getNewListUri(this.props.location.pathname, { page: nextPage })
  }

  render () {
    const data = this.state.data
    if (!data) return (<Waiting />)
    return (<div>
      {!data.articles ? <Waiting /> : <div>
        <QueueAnim onEnd={this.handleAnimationEnd}>
          {data.articles.map((article) => (
            <article key={article.ID} className={`card-${article.ID}`}>
              <CardWithHeader id={parseInt(article.ID)} link={'/post/' + article.ID} title={article.Title}>
                <CardText style={{color: '#ffffff'}} dangerouslySetInnerHTML={{__html: article.Intro}} />
                <CardText>
                  <div style={{overflow: 'hidden'}}>
                    <Avatar src={article.Author.Avatar} style={{verticalAlign: 'middle', marginRight: 5, marginTop: -2, float: 'left'}} />
                    <span>
                      <span style={{float: 'left'}}>{article.Author.StaticName}</span>
                      <span style={{float: 'right'}}>
                        {formatDate(article.PostTime)} <span>in </span>
                        <Link to={getNewListUri(this.props.location.pathname, {cate: article.Category.ID})}>{article.Category.Name}</Link>
                        <span> / </span>
                        <span>{article.CommNums}</span>
                        <span> / </span>{article.ViewNums}
                      </span>
                    </span>
                  </div>
                </CardText>
              </CardWithHeader>
            </article>
            )
          )}
        </QueueAnim>
        <div>
          <Link to={this.pageTo(-1)}><FlatButton primary label='Prev' /></Link>
          <Link to={this.pageTo(1)}><FlatButton primary label='Next' style={{float: 'right'}} /></Link>
        </div>
      </div>
    }
    </div>)
  }
}
