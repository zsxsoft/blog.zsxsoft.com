import React from 'react'
import { Link } from 'react-router'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Style from 'style-it'
import chroma from 'chroma-js'
import QueueAnim from 'rc-queue-anim'

import {formatDate, filterHtml, getNewListUri} from '../utils'
import Page from './Page'

import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import TouchRipple from 'material-ui/internal/TouchRipple'
import ExtensionDuoshuo from '../components/Duoshuo/Extensions'

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
    if (!data) return (<section>Please wait...</section>)
    return (<div>
      {!data.articles ? 'Please wait...' : <div><QueueAnim onEnd={this.handleAnimationEnd}>
        {data.articles.map((article) => {
          const introHtml = {__html: article.Intro}
          const linkTo = '/post/' + article.ID
          const color = this.colors[parseInt(Math.random() * this.colors.length, 10)]
          const brewer = chroma.brewer[color]
          return <Style key={article.ID}>
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
            <article key={article.ID} className={`card-${article.ID}`}>
              <Card style={{marginBottom: '1em', borderRadius: '0.5em'}}>
                <Link to={linkTo} style={{display: 'block', position: 'relative'}} className='titleWrapper'>
                  <TouchRipple style={{zIndex: 1000}}>
                    <CardMedia
                      expandable
                      overlay={<CardTitle title={article.Title} style={{
                        textShadow: '1px 1px 8px #444',
                        fontSize: '28px'
                      }} />}
                      overlayContentStyle={{background: 'none'}}
                    >
                      <canvas
                        className={`canvas-triangles canvas-triangle-${article.ID}`}
                        data-color={color}
                        style={{height: 150, backgroundColor: brewer[brewer.length - 1]}}
                        height='150'
                      />
                    </CardMedia>
                  </TouchRipple>
                </Link>
                <CardText dangerouslySetInnerHTML={introHtml} />
                <CardText>
                  <Avatar src={article.Author.Avatar} style={{verticalAlign: 'middle', marginRight: 5}} />
                  <span>{article.Author.StaticName}</span>
                  <span style={{float: 'right', marginTop: 7}}>
                    {formatDate(article.PostTime)} <span>in </span>
                    <Link to={getNewListUri(this.props.location.pathname, {cate: article.Category.ID})}>{article.Category.Name}</Link>
                    <span> / </span>
                    <ExtensionDuoshuo type='thread-count' duoshuoKey={article.ID} title={article.Title} url={article.Url} content={filterHtml(article.Intro)} />
                    <span> / </span>{article.ViewNums}
                  </span>
                </CardText>
              </Card>
            </article>
          </Style>
        })
      }</QueueAnim>
        <div>
          <Link to={this.pageTo(-1)}><FlatButton primary label='Prev' /></Link>
          <Link to={this.pageTo(1)}><FlatButton primary label='Next' style={{float: 'right'}} /></Link>
        </div>
      </div>
    }
    </div>)
  }

}
