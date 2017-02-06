import React, { PropTypes } from 'react'
export default class EmbedThread extends React.Component {
  static propTypes = {
    duoshuoKey: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };
  componentDidMount () {
    window.DUOSHUO.EmbedThread('.ds-thread')
  }
  render () {
    const { id, duoshuoKey, url, title, ...other } = this.props
    return (
      <div
        className='ds-thread'
        data-thread-id={id}
        data-thread-key={duoshuoKey}
        data-title={title}
        data-url={url}
        {...other}
      />
    )
  }
};

