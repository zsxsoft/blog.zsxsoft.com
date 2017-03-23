import React, {PureComponent, PropTypes} from 'react'
import { Link } from 'react-router-dom'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import Style from 'style-it'
import chroma from 'chroma-js'
import TouchRipple from 'material-ui/internal/TouchRipple'

export default class List extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
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
    const {id, link, title, children} = this.props
    const color = this.colors[id % this.colors.length]
    const brewer = chroma.brewer[color]
    const lastBrewer = brewer[0] // brewer[brewer.length - 1]
    const rgb = this.getLighterColor(lastBrewer.substr(1, 2), lastBrewer.substr(3, 2), lastBrewer.substr(5, 2)).join(',')
    const titleContent = (
      <CardMedia
        overlay={<CardTitle title={title} style={{
          textShadow: '1px 1px 8px #444'
        }} className='cardTitle' />}
        overlayContentStyle={{background: 'none'}}
              >
        <div className='canvas-background' style={{height: 150, backgroundColor: brewer[brewer.length - 1]}}>
          <div
            className={`canvas-triangles canvas-triangle-${id}`}
            data-color={color}
            height='150'
        />
        </div>
      </CardMedia>)

    return <Style key={id}>
      {`
        .card-${id} a {
          color: ${brewer[brewer.length - 1]};
        }
        .card-${id} a:hover {
          color: ${brewer[brewer.length - 2]};
        }
        .card-${id} a:active {
          color: ${brewer[brewer.length - 3]};
        }
        .card-${id} *::selection {
          background-color: ${brewer[brewer.length - 4]};
          color: #ffffff;
        }
      `}
      <article key={id} className={`card-${id}`}>
        <Card style={{marginBottom: '1em', borderRadius: '0.5em', background: `rgba(${rgb}, 0.9)`}}>
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
