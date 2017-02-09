import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import {formatDate, isMobile, filterHtml, getNewListUri, jsonConcat} from '../utils'
import ExtensionDuoshuo from '../components/Duoshuo/Extensions'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import TouchRipple from 'material-ui/internal/TouchRipple'
import Trianglify from 'trianglify'
import chroma from 'chroma-js'

export default class Page extends PureComponent {
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
    //document.title = '文章列表 - ' + window.config.title
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.location.pathname !== this.props.location.pathname || !this.state.dataLoaded) {
      this.initState(nextProps)
      return true
    }
    return false
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.dataLoaded === this.state.dataLoaded && this.state.dataLoaded === true) return
    Array.from(document.querySelectorAll('.canvas-triangles')).forEach(e => {
      const pattern = Trianglify({width: 900, height: 150, x_colors: e.getAttribute('data-color')})
      pattern.canvas(e)
    })

      /* window.doListLoaded()
      window.doGlobal() */
  }
  componentWillUnmount () {
    this.setState({ mounted: false })
  }
  componentWillReceiveProps (props) {
  }

  initState (props) {
    fetch(window.config.apiUrl + props.location.pathname).then((data) => {
      return data.json()
    }).then(json => {
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
