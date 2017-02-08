import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import {formatDate, isMobile, filterHtml, getNewListUri, jsonConcat, formatArticleContent} from '../utils'
import ExtensionDuoshuo from '../components/Duoshuo/Extensions'
import ShareDuoshuo from '../components/Duoshuo/Share'
import EmbedDuoshuo from '../components/Duoshuo/EmbedThread'
import { List, ListItem } from 'material-ui/List'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import TouchRipple from 'material-ui/internal/TouchRipple'
import Trianglify from 'trianglify'

export default class Article extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      mounted: false
    }
    this.initState(props)
  }
  componentWillMount () {
    this.setState({ mounted: true })
  }
  componentDidMount () {
    document.title = '文章列表 - ' + window.config.title
  }

  componentDidUpdate () {
    Array.from(document.querySelectorAll('.canvas-triangles')).forEach(e => {
      const pattern = Trianglify({width: 900, height: 200})
      pattern.canvas(e)
    })

      /* window.doListLoaded()
      window.doGlobal() */
  }
  componentWillUnmount () {
    this.setState({ mounted: false })
  }
  componentWillReceiveProps (props) {
    this.initState(props)
  }
  initState (props) {
    fetch(window.config.apiUrl + props.location.pathname).then((data) => {
      return data.json()
    }).then(json => {
      if (this.state.mounted) {
        this.setState({ data: json })
      }
    })
  }

  render () {
    const data = this.state.data
    const article = data.article
    if (!article) return (<section>Please wait...</section>)
    const contentHtml = {__html: formatArticleContent(article.Content)}
    const linkTo = '/post/' + article.ID

    return (<div>
      <Card style={{marginBottom: '1em'}}>
        <div>
            <CardMedia
            expandable
            overlay={<CardTitle title={article.Title} />}
                    >
            <canvas className='canvas-triangles' />
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
    </div>)
  }

}
