import React from 'react'

export default (Component) => {
  class ComponentWithGlobal extends React.Component {
    static getInitialProps (...props) {
      return Component.getInitialProps ? Component.getInitialProps(...props) : {}
    }

    doEverything = () => {
      if (window.Prism) {
        window.Prism.highlightAll()
      }
      if (window.socialShare) {
        window.socialShare('.social-share, .share-component')
      }
    }

    componentDidMount () {
      this.doEverything()
    }

    componentDidUpdate () {
      this.doEverything()
    }

    render () {
      return React.createElement(Component, {
        ...this.props,
        doEverything: this.doEverything
      })
    }
  }

  return ComponentWithGlobal
}
