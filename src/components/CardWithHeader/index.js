import React, { PureComponent } from 'react'
import chroma from 'chroma-js'

import CardComponent from './CardComponent'
import CardPropTypes from './CardPropTypes'

const colors = ['Blues', 'BrBG', 'BuGn', 'GnBu', 'Greens', 'Greys', 'Oranges', 'OrRd', 'PuBuGn', 'PuRd', 'RdPu', 'Reds', 'YlGn', 'YlGnBu', 'YlOrBr', 'Spectral']

export default class CardWithHeader extends PureComponent {
  static propTypes = CardPropTypes

  constructor (props) {
    super(props)
    if (process.browser) {
      this.color = colors[Math.floor(Math.random() * colors.length)] // id % this.colors.length]
    } else {
      this.color = colors[0]
    }
    this.brewer = chroma.brewer[this.color]
    this.lastBrewer = this.brewer[0] // brewer[brewer.length - 1]
    this.rgb = this.getLighterColor(this.lastBrewer.substr(1, 2), this.lastBrewer.substr(3, 2), this.lastBrewer.substr(5, 2)).join(',')
  }

  getLighterColor = (...originalColors) => {
    const colors = originalColors.map(p => parseInt(p, 16))
    while (colors.filter(p => p >= 243).length < 3) {
      for (let i = 0; i < colors.length; i++) colors[i] += (255 - colors[i]) * 0.1
    }
    return colors.map(p => Math.floor(p))
  }

  render () {
    return (
      <CardComponent
        colorString={this.color}
        color={this.brewer[this.brewer.length - 1]}
        hoverColor={this.brewer[this.brewer.length - 2]}
        activeColor={this.brewer[this.brewer.length - 3]}
        selectionColor={this.brewer[this.brewer.length - 4]}
        baseColor={this.rgb}
        {...this.props}
      />
    )
  }
}
