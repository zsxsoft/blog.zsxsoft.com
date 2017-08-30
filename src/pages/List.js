import { formatDate, getNewListUri } from '../utils'

import Avatar from 'material-ui/Avatar'
import { CardText } from 'material-ui/Card'
import CardWithHeader from '../components/CardWithHeader'
import FlatButton from 'material-ui/FlatButton'
import FlipMove from 'react-flip-move'
import { Link } from 'react-router-dom'
import Page from './Page'
import React from 'react'
import Waiting from '../components/Waiting'
import classnames from 'classnames'

export default class List extends Page {
  componentDidMount () {
    document.title = '文章列表 - ' + window.config.title
  }

  componentDidUpdate (prevProps, prevState) {
    // super.componentDidUpdate(prevProps, prevState)
    window.doListLoaded()
    window.doGlobal()
  }

  handleAnimationEnd = (childElement) => this.trianglify(document.querySelector(`.canvas-triangle-${childElement.props['data-id']}`))

  pageTo = pageForward => {
    const { data } = this.state
    if (!data || !data.pagebar) return '#'
    const currentPage = data.pagebar.current
    const maxPage = parseInt(data.pagebar.max / data.pagebar.pageCount, 10) + 1
    let nextPage = currentPage + pageForward
    if (nextPage <= 0 || nextPage > maxPage) nextPage = currentPage
    return getNewListUri(this.props.location.pathname, { page: nextPage })
  }

  getArticleCard = (article, titleOnly) =>
    <CardWithHeader
      id={parseInt(article.ID, 10)}
      link={'/post/' + article.ID}
      title={article.Title}
      secondaryTitle={formatDate(article.PostTime)}
      titleOnly={titleOnly}
    >
      {titleOnly ? null : <div>
        <CardText style={{ color: '#000000' }} dangerouslySetInnerHTML={{ __html: article.Intro }} />
        <CardText style={{ color: '#000000' }}>
          <div style={{ overflow: 'hidden' }}>
            <Avatar src={article.Author.Avatar} style={{
              verticalAlign: 'middle',
              marginRight: 7,
              marginTop: 3,
              marginLeft: 3,
              height: 27,
              width: 27,
              float: 'left'
            }} />
            <span>
              <span style={{ float: 'left' }}>{article.Author.StaticName}</span>
              <span style={{ float: 'right' }}>
                {formatDate(article.PostTime)} <span>in </span>
                <Link to={getNewListUri(this.props.location.pathname, { cate: article.Category.ID })}>{article.Category.Name}</Link>
                <span> / {article.CommNums} / {article.ViewNums}</span>
              </span>
            </span>
          </div>
        </CardText>
      </div>}
    </CardWithHeader>

  render () {
    const data = this.state.data
    const dataArticles = data ? (data.articles ? data.articles : []) : []
    const articles = dataArticles.map(article => {
      article.titleOnly = window.titleOnlyCateId.indexOf(article.Category.ID) >= 0
      return article
    })
    return (<div>
      {articles.length === 0 ? <Waiting /> : null}
      <FlipMove duration={750} staggerDelayBy={100} easing='ease-out' enterAnimation='accordionVertical' leaveAnimation='accordionVertical' onFinish={this.handleAnimationEnd}>
        {articles.map((article, index) => {
          const titleOnly = article.titleOnly
          const prevTitleOnly = index === 0 ? false : articles[index - 1].titleOnly
          const nextTitleOnly = index === articles.length - 1 ? false : articles[index + 1].titleOnly
          return <article key={article.ID} data-id={article.ID} className={
            classnames({
              [`article-${article.ID}`]: true,
              'article-titleonly': titleOnly,
              'article-canvas-radius-top': !titleOnly || !prevTitleOnly,
              'article-canvas-radius-bottom': titleOnly && !nextTitleOnly
            })}>
            {this.getArticleCard(article, titleOnly)}
          </article>
        }
        )}
      </FlipMove>
      <div>
        <Link to={this.pageTo(-1)}><FlatButton primary label='Prev' /></Link>
        <Link to={this.pageTo(1)}><FlatButton primary label='Next' style={{ float: 'right' }} /></Link>
      </div>
    </div>)
  }
}
