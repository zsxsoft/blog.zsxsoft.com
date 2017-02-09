import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {formatDate, isMobile, filterHtml, getNewListUri, jsonConcat} from '../utils'
import ExtensionDuoshuo from '../components/Duoshuo/Extensions'
import Page from './Page'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import TouchRipple from 'material-ui/internal/TouchRipple'
import Style from 'style-it'
import chroma from 'chroma-js'
import './List.css'

export default class List extends Page {
  componentDidMount () {
    document.title = '文章列表 - ' + window.config.title
  }

  componentDidUpdate (prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState)
      /* window.doListLoaded()
      window.doGlobal() */
  }

  render () {
    const data = this.state.data
    if (!data) return (<section>Please wait...</section>)
    return (<div>
      {!data.articles ? 'Please wait...'
        : data.articles.map((article) => {
          const introHtml = {__html: article.Intro}
          const linkTo = '/post/' + article.ID
          const color = this.colors[parseInt(Math.random() * this.colors.length)]
          const brewer = chroma.brewer[color]
          return <Style>
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
                      <canvas className='canvas-triangles' data-color={color} />
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
