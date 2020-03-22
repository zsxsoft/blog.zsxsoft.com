import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'

import Alipay from 'components/Alipay'
import CardWithHeader from 'components/CardWithHeader'
import Comment from 'components/Comment'
import Link from 'components/Link'
import Waiting from 'components/Waiting'
import Error from 'next/error'
import Head from 'next/head'

import api from 'utils/api'
import { formatArticleContent, formatDate, filterHtml } from '../../utils'
import config from '../../utils/config'

import { withRouter } from 'next/router'
import withGlobal from 'components/withGlobal'

import pc from '../page.scss'
import c from './Post.scss'

class Post extends PureComponent {
  static propTypes = {
    // SSR Props
    dataLoaded: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    status: PropTypes.number.isRequired,

    // withRouter
    router: PropTypes.object.isRequired,

    // withGlobal
    doEverything: PropTypes.func.isRequired,

    // onDataUpdate
    onDataUpdate: PropTypes.func.isRequired
  }

  state = {
    initialized: false,
    status: 200,
    data: {},
    dataLoaded: false,
    loading: true
  }

  static async getInitialProps ({ asPath, err, ctx, req, res, query }) {
    const ret = { loading: true }
    try {
      ret.data = await Post.api(query.id)
      ret.status = 200
      ret.dataLoaded = true
      ret.loading = false
    } catch (e) {
      console.error(e)
      ret.status = e.status || 500
      if (res) {
        res.statusCode = e.status || 500
      }
    }
    return ret
  }

  static getDerivedStateFromProps (props, state) {
    return {
      ...state,
      initialized: true,
      status: props.status || 200,
      data: props.data || {},
      dataLoaded: props.dataLoaded || false,
      loading: props.loading
    }
  }

  static api = (id) => {
    return api(`/post/${id}`)
  }

  loadData = async () => {
    this.setState({ loading: true })
    const article = await Post.api(this.props.router.query.id)
    this.setState({
      data: article,
      status: 200,
      dataLoaded: true,
      loading: false
    }, () => {
      setTimeout(() => {
        this.props.doEverything()
      }, 1000)
    })
    this.props.onDataUpdate(this.state.data.sidebar)
  }

  componentDidMount () {
    if (!this.state.dataLoaded) {
      return this.loadData()
    } else {
      this.props.onDataUpdate(this.state.data.sidebar)
    }
    setTimeout(() => {
      this.props.doEverything()
    }, 1000)
  }

  handleCommentPosted = () => {
    this.loadData()
  }

  render () {
    if (this.state.status > 200) {
      return <Error statusCode={this.state.status} />
    }

    const data = this.state.data
    const { article } = data
    const contentHtml = article ? { __html: formatArticleContent(article.Content) } : null

    if (!article) {
      return <Waiting show={this.state.loading} />
    }

    return (
      <div className={c.post}>
        <Waiting show={this.state.loading} />
        <Head>
          <title>{article.Title} - {config.title}</title>
          <meta name='description' content={filterHtml(article.Intro.substr(0, 50))} />
        </Head>
        <CardWithHeader titleOnly={false} title={article.Title} inArticle>
          <div className={`${pc.content} ${c.content}`}>
            <div className={`${pc.user} ${c.user}`}>
              <Avatar className={pc.avatar} src={article.Author.Avatar} />
              <span>
                <span style={{ float: 'left' }}>{article.Author.StaticName}</span>
                <span style={{ float: 'right' }}>
                  <time>{formatDate(article.PostTime)}</time>
                  <span>{' in '}</span>
                  <span>{article.Category.Name}</span>
                  <span> / {article.CommNums} / {article.ViewNums}</span>
                </span>
              </span>
            </div>
            <div className={c.article}>
              <article dangerouslySetInnerHTML={contentHtml} />
              <div className={`social-share ${c.center}`} />
            </div>
            <div className={`${c.center}`} >
              <p>如果本文对你有帮助，你可以用支付宝支持一下：</p>
              <Alipay />
            </div>
            <div>
              <Comment comments={article.Comments} onCommentPosted={this.handleCommentPosted} postArea article={article} />
            </div>
          </div>
        </CardWithHeader>
        <div className={pc.pageSwitch}>
          {article.Prev === null ? null : <Button component={Link} route='post' params={{ id: article.Prev.ID }} variant='contained' color='primary'>← {article.Prev.Title}</Button>}
          {article.Next === null ? null : <Button component={Link} route='post' params={{ id: article.Next.ID }} variant='contained' color='primary'>{article.Next.Title} →</Button>}
        </div>
      </div>
    )
  }
}

export default withGlobal(withRouter(Post))
