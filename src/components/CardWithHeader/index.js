import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import Style from 'style-it'
import chroma from 'chroma-js'
import TouchRipple from 'material-ui/internal/TouchRipple'

export default class CardWithHeader extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    secondaryTitle: PropTypes.string,
    titleOnly: PropTypes.bool.isRequired,
    children: PropTypes.any
  }

  constructor () {
    super()
    this.colors = ['Blues', 'BrBG', 'BuGn', 'GnBu', 'Greens', 'Greys', 'Oranges', 'OrRd', 'PuBuGn', 'PuRd', 'RdPu', 'Reds', 'Set3', 'YlGn', 'YlGnBu', 'YlOrBr', 'Spectral']
  }

  handleAnimationEnd = (data) => {
    if (data.type === 'enter') {
      this.trianglify(document.querySelector(`.canvas-triangle-${data.key}`))
    }
  }

  getLighterColor = (...originalColors) => {
    const colors = originalColors.map(p => parseInt(p, 16))
    while (colors.filter(p => p >= 243).length < 3) {
      for (let i = 0; i < colors.length; i++) colors[i] += (255 - colors[i]) * 0.1
    }
    return colors.map(p => Math.floor(p))
  }

  render () {
    const {id, link, title, children, titleOnly, secondaryTitle} = this.props
    const height = titleOnly ? 50 : 150
    const color = this.colors[id % this.colors.length]
    const brewer = chroma.brewer[color]
    const lastBrewer = brewer[0] // brewer[brewer.length - 1]
    const rgb = this.getLighterColor(lastBrewer.substr(1, 2), lastBrewer.substr(3, 2), lastBrewer.substr(5, 2)).join(',')
    const titleContent = (
      <CardMedia
        className='card-media'
        overlay={<CardTitle title={
            !titleOnly
            ? title
            : <span>
              <span style={{display: 'inline-block', width: '75%', overflow: 'hidden', height: 36}}>{title}</span>
              <span style={{fontSize: 12, float: 'right'}}>{secondaryTitle}</span>
            </span>
          } className='card-title' />
        }
        overlayContentStyle={{
          background: 'none',
          top: titleOnly ? '-1em' : 'auto'
        }}>
        <div className='canvas-background' style={{height, backgroundColor: brewer[brewer.length - 1]}}>
          <div
            className={`canvas-triangles canvas-triangle-${id}`}
            data-color={color}
            height={height}
        />
        </div>
      </CardMedia>)

    return <Style key={id}>
      {`
        .article-card-${id} a {
          color: ${brewer[brewer.length - 1]};
        }
        .article-card-${id} a:hover {
          color: ${brewer[brewer.length - 2]};
        }
        .article-card-${id} a:active {
          color: ${brewer[brewer.length - 3]};
        }
        .article-card-${id} *::selection {
          background-color: ${brewer[brewer.length - 4]};
          color: #ffffff;
        }
      `}
      <article key={id} className={`article-card-${id}`}>
        <Card className={`article-card article-card-${id}`} style={{marginBottom: '1em', borderRadius: '0.5em', background: `rgba(${rgb}, 0.9)`}}>
          {link === '' ? titleContent
          : <Link to={link} style={{display: 'block', position: 'relative'}} className='titleWrapper'>
            <TouchRipple style={{zIndex: 1000}}>
              {titleContent}
            </TouchRipple>
          </Link>
          }
          {children}
        </Card>
      </article>
    </Style>
  }
}
