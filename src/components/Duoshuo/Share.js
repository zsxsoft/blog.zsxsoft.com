import React from 'react'
import Extension from './Extensions'
export default class Share extends Extension {
  render () {
    const { element, type, id, duoshuoKey, url, title, content, ...other } = this.props // eslint-disable-line
    const duoshuoType = 'ds-share'
    const props = {
      className: duoshuoType,
      'data-thread-id': id,
      'data-thread-key': duoshuoKey,
      'data-title': title,
      'data-content': content,
      'data-url': url,
      ...other
    }
    return (
      <div {...props}>
        <div id='ds-reset'>
          <ul className='ds-share-icons-32'>
            <li style={{ top: 8, position: 'relative' }}>分享到：</li>
            <li> <a className='ds-weibo' href='javascript:void(0);' data-service='weibo' /> </li>
            <li> <a className='ds-qzone' href='javascript:void(0);' data-service='qzone' /> </li>
            <li> <a className='ds-qq' href='javascript:void(0);' data-service='qq' /> </li>
            <li> <a className='ds-wechat' href='javascript:void(0);' data-service='wechat' /> </li>
            <li> <a className='ds-youdao' href='javascript:void(0);' data-service='youdao' /> </li>
            <li> <a className='ds-facebook' href='javascript:void(0);' data-service='facebook' /> </li>
            <li> <a className='ds-twitter' href='javascript:void(0);' data-service='twitter' /> </li>
          </ul></div>
      </div>
    )
  }
};
