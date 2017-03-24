import React from 'react'
import { Link } from 'react-router-dom'
import { CardText } from 'material-ui/Card'
import CardWithHeader from '../components/CardWithHeader'
import QueueAnim from 'rc-queue-anim'
import classnames from 'classnames'

import {formatDate, getNewListUri} from '../utils'
import Page from './Page'

import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import Waiting from '../components/Waiting'

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
    if (!data || !data.articles) return (<Waiting />)
    const articles = data.articles.map(article => {
      article.titleOnly = window.titleOnlyCateId.indexOf(article.Category.ID) >= 0
      return article
    })
    return (<div>
      {!data.articles ? <Waiting /> : <div>
        <QueueAnim onEnd={this.handleAnimationEnd}>
          {articles.map((article, index) => {
            const titleOnly = article.titleOnly
            const prevTitleOnly = index === 0 ? false : articles[index - 1].titleOnly
            const nextTitleOnly = index === articles.length - 1 ? false : articles[index + 1].titleOnly
            return <article key={article.ID} className={
              classnames({
                [`article-${article.ID}`]: true,
                'article-titleonly': titleOnly,
                'article-canvas-radius-top': !titleOnly || !prevTitleOnly,
                'article-canvas-radius-bottom': titleOnly && !nextTitleOnly
              })}>
              <CardWithHeader
                id={parseInt(article.ID, 10)}
                link={'/post/' + article.ID}
                title={article.Title}
                secondaryTitle={formatDate(article.PostTime)}
                titleOnly={titleOnly}
              >
                {titleOnly ? null : <div>
                  <CardText style={{color: '#000000'}} dangerouslySetInnerHTML={{__html: article.Intro}} />
                  <CardText style={{color: '#000000'}}>
                    <div style={{overflow: 'hidden'}}>
                      <Avatar src={article.Author.Avatar} style={{
                        verticalAlign: 'middle',
                        marginRight: 7,
                        marginTop: 3,
                        marginLeft: 3,
                        height: 27,
                        width: 27,
                        float: 'left'}} />
                      <span>
                        <span style={{float: 'left'}}>{article.Author.StaticName}</span>
                        <span style={{float: 'right'}}>
                          {formatDate(article.PostTime)} <span>in </span>
                          <Link to={getNewListUri(this.props.location.pathname, {cate: article.Category.ID})}>{article.Category.Name}</Link>
                          <span> / {article.CommNums} / {article.ViewNums}</span>
                        </span>
                      </span>
                    </div>
                  </CardText>
                </div>}
              </CardWithHeader>
            </article>
          }
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
