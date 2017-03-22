import React, {PureComponent, PropTypes} from 'react'
import { Link } from 'react-router'
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
    this.colors = ['Blues', 'BrBG', 'BuGn', 'BuPu', 'GnBu', 'Greens', 'Greys', 'Oranges', 'OrRd', 'PuBuGn', 'Purples', 'PuRd', 'RdPu', 'Reds', 'Set3', 'YlGn', 'YlGnBu', 'YlOrBr']
  }

  handleAnimationEnd = (data) => {
    if (data.type === 'enter') {
      this.trianglify(document.querySelector(`.canvas-triangle-${data.key}`))
    }
  }

  render () {
    const {id, link, title, children} = this.props
    const color = this.colors[id % this.colors.length]
    const brewer = chroma.brewer[color]
    const lastBrewer = brewer[brewer.length - 1]
    const rgb = `${parseInt(lastBrewer.substr(1, 2), 16)}, ${parseInt(lastBrewer.substr(3, 2), 16)}, ${parseInt(lastBrewer.substr(5, 2), 16)}`
    const titleContent = (
      <CardMedia
        overlay={<CardTitle title={title} style={{
          textShadow: '1px 1px 8px #444'
        }} className='cardTitle' />}
        overlayContentStyle={{background: 'none'}}
              >
        <div className='canvas-background' style={{opacity: 0.5, height: 150, backgroundColor: brewer[brewer.length - 1]}}>
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
          color: ${brewer[1]};
        }
        .card-${id} a:hover {
          color: ${brewer[2]};
        }
        .card-${id} a:active {
          color: ${brewer[3]};
        }
      `}
      <article key={id} className={`card-${id}`}>
        <Card style={{marginBottom: '1em', borderRadius: '0.5em', background: `rgba(${rgb}, 0.5)`}}>
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
