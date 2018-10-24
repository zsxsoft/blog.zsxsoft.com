import Card from '@material-ui/core/Card'
import injectSheet from 'react-jss'
import withTrianglify from '../withTrianglify'

import cn from 'classnames'

import React, { PureComponent } from 'react'

import { Link } from '../../route'
import ButtonBase from '@material-ui/core/ButtonBase'

import CardPropTypes from './CardPropTypes'
import c from './CardWithHeader.scss'

const A = ({ ...props }) => <a {...props} />

const styles = {
  article: {
    '& a': {
      color: props => props.color
    },
    '& a:hover': {
      color: props => props.hoverColor
    },
    '& a:active': {
      color: props => props.activeColor
    },
    '& *::selection': {
      backgroundColor: props => props.selectionColor,
      color: '#ffffff'
    }
  },
  card: {
    background: props => `rgba(${props.baseColor}, 0.99)`
  }
}

class CardComponent extends PureComponent {
  titleWrapper = null

  state = {
    ssr: true
  }

  static propTypes = CardPropTypes

  componentDidMount () {
    this.setState({ ssr: false })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.ssr !== this.state.ssr) {
      if (this.titleWrapper) {
        setTimeout(() => {
          this.props.trianglify(this.titleWrapper)
        }, 300)
      }
    }
  }

  getTitleWrapperRef = (e) => {
    this.titleWrapper = e
  }

  render () {
    const {
      classes: style,
      link,
      title,
      children,
      titleOnly,
      secondaryTitle,
      radiusTop = true,
      radiusBottom = true
    } = this.props
    const height = titleOnly ? 50 : 150

    const titleContent = (
      <div
        className={c.titleWrapper}
        style={{ height, backgroundColor: this.props.color }}>
        {!this.state.ssr && <div className={`${c.canvas}`} data-color={this.props.colorString} ref={this.getTitleWrapperRef} height={height} />}
        {
          !titleOnly
            ? <span className={c.wideTitle}>{title}</span>
            : (
              <span className={c.narrowTitle}>
                <span className={c.primary}>{title}</span>
                <span className={c.secondary}>{secondaryTitle}</span>
              </span>
            )
        }
      </div>)

    return (
      <Card className={cn({
        [style.article]: !this.state.ssr,
        [c.card]: true,
        [c.cardOnlyTitle]: titleOnly,
        [c.cardRadiusTop]: radiusTop,
        [c.cardRadiusBottom]: radiusBottom
      })}>
        {!link
          ? (
            <React.Fragment>
              {titleContent}
            </React.Fragment>
          )
          : (
            <Link className={c.titleLink} passHref {...link}>
              <ButtonBase component={A} className={c.button}>
                {titleContent}
              </ButtonBase>
            </Link>
          )}
        {children}
      </Card>
    )
  }
}

export default withTrianglify()(injectSheet(styles)(CardComponent))
