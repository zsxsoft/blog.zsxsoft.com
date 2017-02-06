import React, { PropTypes } from 'react'
export default class Extensions extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    element: PropTypes.string.isRequired,
    duoshuoKey: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };
  componentDidMount () {
    const duoshuoType = `ds-${this.props.type}`
    setTimeout(() => {
      window.DUOSHUO.initSelector(`.${duoshuoType}`, window.DUOSHUO.selectors[`.${duoshuoType}`])
    }, 1000)
  }
  render () {
    const { element, type, id, duoshuoKey, url, title, content, ...other } = this.props
    const duoshuoType = 'ds-' + type
    const props = {
      className: duoshuoType,
      'data-thread-id': id,
      'data-thread-key': duoshuoKey,
      'data-title': title,
      'data-content': content,
      'data-url': url,
      ...other
    }
    if (element === 'div') {
      return (<div {...props} />)
    }
    return (<span {...props} />)
  }
};
