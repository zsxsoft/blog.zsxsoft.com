import React, { PureComponent, PropTypes } from 'react'
import Trianglify from 'trianglify'
import chroma from 'chroma-js'

export default class Page extends PureComponent {
  static propTypes = {
    onDataUpdate: PropTypes.func,
    location: PropTypes.any.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      dataLoaded: false,
      mounted: false
    }
    this.colors = Object.keys(chroma.brewer).filter(p => p !== 'Pastel1')
    this.initState(props)
  }

  componentWillMount () {
    this.setState({ mounted: true })
  }

  componentDidMount () {
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!this.state.dataLoaded && nextState.dataLoaded) {
      return true
    }
    if (nextProps.location.pathname !== this.props.location.pathname) { // || (!this.state.dataLoaded && !nextState.dataLoaded)) {
      this.initState(nextProps)
      return true
    }
    return false
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.dataLoaded === this.state.dataLoaded && this.state.dataLoaded === true) return
    this.trianglifyAllElements()
  }

  componentWillUnmount () {
    this.setState({ mounted: false })
  }
  componentWillReceiveProps (props) {
    if (props.location.pathname !== this.props.location.pathname) {
      this.setState({
        dataLoaded: false
      })
    }
  }

  trianglifyAllElements () {
    Array.from(document.querySelectorAll('.canvas-triangles')).forEach(e => this.trianglify(e))
  }

  trianglify (e) {
    const pattern = Trianglify({width: 900, height: 150, x_colors: e.getAttribute('data-color')})
    pattern.canvas(e)
  }

  initState (props) {
    fetch(window.config.apiUrl + props.location.pathname)
      .then(data => data.json())
      .then(json => {
        if (this.state.mounted) {
          this.setState({
            data: json,
            dataLoaded: true
          })
          this.props.onDataUpdate(json)
        }
      })
  }

  render () {
    return <div />
  }

}
