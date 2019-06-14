import React from 'react'
import c from './Footer.scss'
import config from '../../utils/config'

export default () => (
  <footer className={c.footer}>
    <div>未经特别标明，本站所有文章均采用<a rel='license' href='http://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh'>知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a>进行许可。</div>
    <div>Copyright © 2019 {config.author} <a href='/feed.php' target='_blank'>[RSS]</a></div>
    <div>API by <a href='//www.zblogcn.com/' target='_blank'>Z-BlogPHP</a>, Theme by {config.author}: <a href={config.themeUrl} target='_blank'>[Source]</a>
    </div>
    <div className={c.right}>
      <a href='http://www.miitbeian.gov.cn/' target='_blank' rel='nofollow'>{config.filing.icp}</a> &nbsp;
      <a target='_blank' rel='_nofollow' href={config.filing.security.link}>{config.filing.security.text}</a>
    </div>
  </footer>
)
