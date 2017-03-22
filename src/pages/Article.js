import React from 'react'
import { Link } from 'react-router'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Style from 'style-it'
import chroma from 'chroma-js'

import {formatDate, filterHtml, formatArticleContent} from '../utils'
import Page from './Page'

import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import ExtensionDuoshuo from '../components/Duoshuo/Extensions'
import ShareDuoshuo from '../components/Duoshuo/Share'
import EmbedDuoshuo from '../components/Duoshuo/EmbedThread'
import Waiting from '../components/Waiting'

export default class Article extends Page {
  componentDidUpdate (prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState)
    window.doArticleLoaded()
    window.doGlobal()
  }

  render () {
    const data = this.state.data
    const color = this.colors[parseInt(Math.random() * this.colors.length, 10)]
    const article = data.article
    const brewer = chroma.brewer[color]
    const lastBrewer = brewer[brewer.length - 1]
    const rgb = `${parseInt(lastBrewer.substr(1, 2), 16)}, ${parseInt(lastBrewer.substr(3, 2), 16)}, ${parseInt(lastBrewer.substr(5, 2), 16)}`
    if (!article) return <Waiting />
    const contentHtml = {__html: formatArticleContent(article.Content)}
    document.title = article.Title + ' - zsx\'s Blog'
    return (<Style>
      {`
        .card-${article.ID} a {
          color: ${brewer[1]};
        }
        .card-${article.ID} a:hover {
          color: ${brewer[2]};
        }
        .card-${article.ID} a:active {
          color: ${brewer[3]};
        }
      `}
      <div>
        <Card style={{marginBottom: '1em', borderRadius: '0.5em', background: `rgba(${rgb}, 0.5)`}} className={`card-${article.ID}`}>
          <div>
            <CardMedia
              expandable
              overlay={<CardTitle title={article.Title} style={{
                textShadow: '1px 1px 8px #444'
              }} className='cardTitle' />}
              overlayContentStyle={{background: 'none'}}
            >
              <div
                className={`canvas-triangles canvas-triangle-${article.ID}`}
                data-color={color}
                style={{opacity: 0.5, height: 150, backgroundColor: brewer[brewer.length - 1]}}
                height='150'
              />
            </CardMedia>
          </div>
          <CardText>
            <div style={{overflow: 'hidden'}}>
              <Avatar src={article.Author.Avatar} style={{verticalAlign: 'middle', marginRight: 5, marginTop: -2, float: 'left'}} />
              <span>
                <span style={{float: 'left'}}>{article.Author.StaticName}</span>
                <span style={{float: 'right'}}>
                  {formatDate(article.PostTime)} <span>in </span>
                  <span>{article.Category.Name}</span>
                  <span> / </span>
                  <ExtensionDuoshuo type='thread-count' duoshuoKey={article.ID} title={article.Title} url={article.Url} content={filterHtml(article.Intro)} />
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
            <EmbedDuoshuo duoshuoKey={article.ID} title={article.Title} url={article.Url} />
          </CardText>
        </Card>
        <div>
          {article.Prev === null ? null : <Link to={article.Prev.Url}><FlatButton primary label={`← ${article.Prev.Title}`} /></Link>}
          {article.Next === null ? null : <Link to={article.Next.Url}><FlatButton primary label={`${article.Next.Title} →`} style={{float: 'right'}} /></Link>}
        </div>
      </div>
    </Style>)
  }

}
