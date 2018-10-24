import React from 'react'

export default function delayUnmount (Component, delayTime) {
  return class extends React.Component {
    state = {
      render: this.props.show
    }

    component = null
    getComponentRef = (ref) => {
      this.component = ref
    }

    componentDidUpdate (prevProps) {
      if (prevProps.show && !this.props.show) {
        if (this.component && this.component.componentPrepareUnmount) {
          this.component.componentPrepareUnmount()
        }
        setTimeout(
          () => this.setState({ render: false }),
          delayTime
        )
      } else if (!prevProps.show && this.props.show) {
        this.setState({ render: true }) // eslint-disable-line
      }
    }

    render () {
      return this.state.render ? <Component ref={this.getComponentRef} {...this.props} /> : null
    }
  }
}
