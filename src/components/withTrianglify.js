import React from 'react'
import Trianglify from 'trianglify'

let queueRunning = false
const queue = []

const doQueue = () => {
  if (queue.length === 0 || queueRunning) return
  queueRunning = true
  const e = queue.shift()
  const pattern = Trianglify({ width: 1280, height: Math.floor(e.getAttribute('height')), x_colors: e.getAttribute('data-color') })
  e.style.backgroundImage = `url(${pattern.png()})`
  e.style.opacity = 1
  e.setAttribute('data-trianglified', 'true')
  // Improve performance
  requestAnimationFrame(() => {
    queueRunning = false
    doQueue()
  })
}

export default () => (Component) => {
  const trianglify = (e) => {
    if (e === null) return
    if (e.getAttribute('data-trianglified') === 'true') return
    queue.push(e)
    doQueue()
  }

  class ComponentWithTrianglify extends React.PureComponent {
    static getInitialProps (...props) {
      return Component.getInitialProps ? Component.getInitialProps(...props) : {}
    }

    render () {
      const { ...props } = this.props
      return React.createElement(Component, {
        ...props,
        trianglify
      })
    }
  }

  return ComponentWithTrianglify
}
