import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import {formatDate, isMobile, filterHtml, getNewListUri, jsonConcat} from '../utils'
import ExtensionDuoshuo from '../components/Duoshuo/Extensions'
import { List as MList, ListItem } from 'material-ui/List'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import TouchRipple from 'material-ui/internal/TouchRipple'
import Trianglify from 'trianglify'

export default class List extends PureComponent {
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

  getSidebarContainer (sidebar) {
    const contentHtml = { __html: sidebar.Content }
    let sidebarContainer = <div />

    if (sidebar.Type === 'div') {
      if (sidebar.HtmlID === 'Duoshuo_RecentComments') {
        sidebarContainer = (<ExtensionDuoshuo type='recent-comments' data-num-items='5' />)
      } else {
        sidebarContainer = (<div id={sidebar.HtmlID} dangerouslySetInnerHTML={contentHtml} />)
      }
      return sidebarContainer
    }

    let result
    let reg = /<li(.*?)>([\w\W]*?)<\/li>/gi
    let liContainer = []
    while ((result = reg.exec(sidebar.Content)) !== null) {
      liContainer.push(
        <ListItem key={result.index} {...result[1]}><div dangerouslySetInnerHTML={{__html: result[2]}} /></ListItem>
      )
    }
    sidebarContainer = (<MList id={sidebar.HtmlID}>{liContainer}</MList>)
    return sidebarContainer
  }

  render () {
    const data = this.state.data
    if (!data) return (<section>Please wait...</section>)

    return (<div>
      {!data.articles ? 'Please wait...'
        : data.articles.map((article) => {
          const introHtml = {__html: article.Intro}
          const linkTo = '/post/' + article.ID
          return <article key={article.ID}>
            <Card style={{marginBottom: '1em'}}>
              <Link to={linkTo} style={{display: 'block', position: 'relative'}}>
                <TouchRipple style={{zIndex: 1000}}>
                  <CardMedia
                    expandable
                    overlay={<CardTitle title={article.Title} />}
                >
                    <canvas className='canvas-triangles' />
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
        })
      }
    </div>)
  }

}

/*

              <Link to={linkTo}>

              </Link>

        <Col md={8} xs={12}>
          {data.articles.map(article => {
            let introHtml = { __html: article.Intro }
            let linkTo = '/post/' + article.ID
            return (<Well bsSize='large' key={article.ID} style={{padding: 0}}>
              <Button style={{ width: '100%', fontSize: 24, margin: 0}} className='articleTitle'><Link to={linkTo}>{article.Title}<Ink /></Link></Button>
              <div style={{backgroundColor: '#F5F5F5', padding: 16}}><div dangerouslySetInnerHTML={introHtml} /></div>
              <div style={{padding: 15}}>
                <Col md={2} xs={5}>
                  <Image circle src={article.Author.Avatar} style={{ verticalAlign: 'middle', marginRight: 5, height: 32 }} />{article.Author.StaticName}
                </Col>
                <Col style={{ textAlign: 'right' }}>
                  <span style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: isMobile ? 10 : 14}}>
                    {formatDate(article.PostTime) } in <Link to={getNewListUri(this.props.location.pathname, { cate: article.Category.ID })}>{article.Category.Name}</Link>
                    <span> / </span><ExtensionDuoshuo type='thread-count' duoshuoKey={article.ID} title={article.Title} url={article.Url} content={filterHtml(article.Intro)} />
                    <span> / </span>{article.ViewNums}
                  </span>
                </Col>
              </div>
            </Well>)
          }) }
        </Col>
        <Col md={3} xs={12}>
          {data.sidebar.map(sidebar => {
            return <Well bsSize='large' key={sidebar.HtmlID}>
              <p style={{ width: '100%', fontSize: 20 }}>{sidebar.Name}</p>
              {this.getSidebarContainer(sidebar)}
            </Well>
          }) }
        </Col>

        <div style={{ position: 'fixed', top: '90%', right: '2%', width: '120px', zIndex: 100000 }}>
          <Link to={this.pageTo(-1)}><Button className='btn-fab' style={{ float: 'left', backgroundColor: '#2e8bcc' }}>
            <span style={{ color: 'white' }}><i className='material-icons'>keyboard_arrow_left</i></span><Ink />
          </Button></Link>
          <Link to={this.pageTo(1)}><Button className='btn-fab' style={{ float: 'right', backgroundColor: '#2e8bcc' }}>
            <span style={{ color: 'white' }}><i className='material-icons'>keyboard_arrow_right</i></span><Ink />
          </Button></Link>
        </div>
      </div>)
 */
