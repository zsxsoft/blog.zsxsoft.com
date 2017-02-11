import React, { PureComponent, PropTypes } from 'react'
// import Trianglify from 'trianglify'
import './Page.css'

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
    this.colors = ['Blues', 'BrBG', 'BuGn', 'BuPu', 'GnBu', 'Greens', 'Greys', 'Oranges', 'OrRd', 'PiYG', 'PRGn', 'PuBuGn', 'Purples', 'PuRd', 'RdPu', 'RdYlBu', 'RdYlGn', 'Reds', 'Set3', 'Spectral', 'YlGn', 'YlGnBu', 'YlOrBr']
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
    e.style.opacity = 1
    e.style.backgroundImage = `url(//static-up.zsxsoft.com/blog/triangles/${e.getAttribute('data-color')}.png)`
    /*
    const pattern = Trianglify({width: 900, height: 150, x_colors: e.getAttribute('data-color')})
    pattern.canvas(e)
    e.style.opacity = 1
    */
  }

  initState (props) {
    fetch(window.config.apiUrl + props.location.pathname, {
      headers: {
        'x-webp': window.isSupportWebp ? 1 : 0
      }
    })
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
