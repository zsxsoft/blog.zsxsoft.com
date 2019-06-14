import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Link } from '../../route'
import Waiting from 'components/Waiting'

import Avatar from '@material-ui/core/Avatar'
import CardContent from '@material-ui/core/CardContent'
import CardWithHeader from '../../components/CardWithHeader'
import Button from '@material-ui/core/Button'
import Error from 'next/error'
import Head from 'next/head'

import { formatDate } from '../../utils'
import config from '../../utils/config'
import classnames from 'classnames'
import api, { convertQueryToListParams } from '../../utils/api'

import { withRouter } from 'next/router'
import { Trail, config as springConfig } from 'react-spring'
import withGlobal from 'components/withGlobal'

import c from './List.scss'
import pc from '../page.scss'

const A = ({ ...props }) => <a {...props} />

class List extends PureComponent {
  static propTypes = {
    // SSR Props
    dataLoaded: PropTypes.bool,
    data: PropTypes.object,
    status: PropTypes.number,

    // withRouter
    router: PropTypes.object.isRequired,

    // withGlobal
    doEverything: PropTypes.func.isRequired,

    // onDataUpdate
    onDataUpdate: PropTypes.func.isRequired
  }

  state = {
    intiailized: false,
    data: {},
    dataLoaded: false,
    status: 200,
    ssr: true
  }

  static getDerivedStateFromProps (props, state) {
    // Use getInitialProps instead of componentDidUpdate here
    // because <Link shallow={false} />
    // if (state.initialized) return null
    return {
      ...state,
      initialized: true,
      status: props.status || 200,
      dataLoaded: props.dataLoaded || false,
      data: props.data || []
    }
  }

  static api = (query) => {
    return api(convertQueryToListParams(query))
  }

  static async getInitialProps ({ asPath, err, ctx, req, res, query }) {
    const ret = {}
    try {
      ret.data = await List.api(query)
      ret.dataLoaded = true
      ret.status = 200

      if (ret.data.articles.length === 0) {
        ret.status = 404
        if (res) res.statusCode = 404
      }
    } catch (e) {
      console.error(e)
      ret.status = e.status || 500
      if (res) {
        res.statusCode = e.status || 500
      }
    }
    return ret
  }

  async componentDidMount () {
    this.setState({ ssr: false })
    if (!this.props.dataLoaded) {
      this.setState({
        dataLoaded: true,
        data: await List.api(this.props.router.query),
        status: 200
      })
    }
    if (this.state.status === 200) {
      this.props.doEverything()
      this.props.onDataUpdate(this.state.data.sidebar)
    }
  }

  pageTo = relative => {
    const { query } = this.props.router
    const newPage = (Math.round(query.page) || 1) + relative
    return {
      ...query,
      page: newPage
    }
  }

  isPageRelativedAvailable = (current, relatived) => {
    const { data } = this.state
    if (!data || !data.pagebar) return false
    const currentPage = data.pagebar.current
    const maxPage = parseInt(data.pagebar.max / data.pagebar.pageCount, 10) + 1
    let nextPage = currentPage + relatived
    return !(nextPage <= 0 || nextPage > maxPage)
  }

  getArticleComponent = (article, index, articles, others) => {
    const titleOnly = article.titleOnly
    const prevTitleOnly = index === 0 ? false : articles[index - 1].titleOnly
    const nextTitleOnly = index === articles.length - 1 ? false : articles[index + 1].titleOnly
    return (
      <article
        key={article.ID}
        className={
          classnames({
            [c.article]: true,
            [c.onlyTitle]: titleOnly
          })}
        {...others}
      >

        <Head>
          <title>{this.props.router.asPath === '/' ? config.title : `文章列表 - ${config.title}`}</title>
        </Head>
        <CardWithHeader
          article={article}
          link={{
            shallow: true,
            route: 'post',
            params: { id: article.ID }
          }}
          title={article.Title}
          secondaryTitle={formatDate(article.PostTime)}
          titleOnly={titleOnly}
          radiusTop={!titleOnly || !prevTitleOnly}
          radiusBottom={!titleOnly || (titleOnly && !nextTitleOnly)}
        >
          {titleOnly ? null : <div>
            <CardContent className={pc.content} dangerouslySetInnerHTML={{ __html: article.Intro }} />
            <CardContent className={`${pc.content} ${pc.user}`}>
              <Avatar className={pc.avatar} src={article.Author.Avatar} />
              <span>
                <span style={{ float: 'left' }}>{article.Author.StaticName}</span>
                <span style={{ float: 'right' }}>
                  <time>{formatDate(article.PostTime)}</time>
                  <span>{' in '}</span>
                  <Link route={'list'} params={{ ...this.props.router.query, category: article.Category.ID, page: 1 }}>
                    <a>{article.Category.Name}</a>
                  </Link>
                  <span> / {article.CommNums} / {article.ViewNums}</span>
                </span>
              </span>
            </CardContent>
          </div>}
        </CardWithHeader>
      </article>
    )
  }

  render () {
    if (this.state.status > 200) {
      return <Error statusCode={this.state.status} />
    }

    const data = this.state.data
    const dataArticles = data ? (data.articles ? data.articles : []) : []
    const articles = dataArticles.map(article => {
      article.titleOnly = config.titleOnlyCategoires.indexOf(article.Category.ID) >= 0
      return article
    })

    return (
      <div className={pc.page}>
        {articles.length === 0 ? <Waiting /> : null}

        {/* react-spring doesn't support SSR, and i have to keep the html client rendered is same as server. */}
        {!this.state.ssr
          ? (
            <Trail config={springConfig.stiff} items={articles} keys={item => item.ID} from={{ transform: 'translateX(-200%)' }} to={{ transform: 'translateX(0%)' }}>
              {(article, index) => style => {
                return this.getArticleComponent(article, index, articles, { style })
              }}
            </Trail>
          )
          : (
            <div className={c.ssrAnimation}>
              {(articles.map((article, index) => {
                return this.getArticleComponent(article, index, articles)
              }))}
            </div>)
        }

        <div className={pc.pageSwitch}>
          {this.isPageRelativedAvailable(this.state.data.pagebar.current, -1) && <Link scroll={false} route={'list'} params={this.pageTo(-1)} passHref><Button variant='contained' component={A} color='primary'>Prev</Button></Link>}
          {this.isPageRelativedAvailable(this.state.data.pagebar.current, 1) && <Link scroll={false} route={'list'} params={this.pageTo(1)} passHref><Button component={A} variant='contained' color='primary'>Next</Button></Link>}
        </div>
      </div>)
  }
}

export default withGlobal(withRouter(List))
