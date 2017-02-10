import React, { PropTypes } from 'react'
export default class Extensions extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    element: PropTypes.string,
    duoshuoKey: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string
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
