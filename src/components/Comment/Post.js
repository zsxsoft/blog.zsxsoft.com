import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import c from './Post.scss'

class CommentPost extends PureComponent {
  state = {
    name: '',
    email: '',
    url: '',
    buttonText: 'COMMENT NOW'
  }

  static propTypes = {
    onPosted: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
    replyComment: PropTypes.object,
    onReplyClicked: PropTypes.func.isRequired
  }

  componentDidMount () {
    try {
      if (localStorage.userData) {
        this.setState({
          ...this.state,
          ...JSON.parse(localStorage.userData)
        })
      }
    } catch (e) {
      console.log('Cannot load saved state: ', e)
    }
  }

  setButtonText = (text, duration = 4000) => {
    this.setState({ buttonText: text }, () => {
      setTimeout(() => {
        this.setState({ buttonText: 'COMMENT NOW' })
      }, duration)
    })
  }

  saveDataToLocalStorage = () => {
    const copiedState = Object.assign({}, this.state)
    try {
      localStorage.userData = JSON.stringify(copiedState)
    } catch (e) {
      console.error('Cannot save user info: ', e)
    }
  }

  handlePost = () => {
    this.props.onPosted(this.state)
    this.setState({ [`content-${this.props.article.ID}`]: '' })
  }

  handleChange = state => event => {
    this.setState({ [state]: event.target.value }, () => {
      this.saveDataToLocalStorage()
    })
  }

  handlePostComment = () => {
    const { article, replyComment } = this.props
    const { name, email, url } = this.state
    const content = this.state[`content-${article.ID}`]
    const replyCommentId = replyComment === null ? 0 : replyComment.ID
    if (!content) {
      return this.setButtonText('评论内容不能为空')
    }
    if (!/^[._A-Za-z0-9\u4e00-\u9fa5ぁ-んァ-ヶ]+$/ig.test(this.state.name)) {
      return this.setButtonText('名字只允许数字、英文字母、汉字、日文')
    }
    if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/ig.test(this.state.email)) {
      return this.setButtonText('邮箱地址不正常')
    }
    let realUrl = url
    if (!/^(.+):\/\//.test(url) && url !== '') {
      realUrl = 'http://' + url
    }

    const formData = new FormData()
    formData.append('postid', article.ID)
    formData.append('verify', '')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('content', content)
    formData.append('homepage', realUrl)
    formData.append('replyid', replyCommentId)
    formData.append('format', 'json')

    fetch(article.CommentPostUrl.replace(/&amp;/g, '&'), {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData
    })
      .then(p => p.json())
      .then(data => {
        if (data.err.code !== 0) {
          throw new Error(data.err.msg)
        }
        this.setButtonText('提交成功')
        this.handlePost()
      })
      .catch(e => {
        console.error(e)
        this.setButtonText(e.message)
      })
  }

  handleCancel = () => this.props.onReplyClicked(null)

  handleKeyDown = target => {
    if (target.keyCode === 13) this.handlePostComment()
  }

  render () {
    return (<Card>
      <form id='comment-post'>
        {this.props.replyComment
          ? <CardContent style={{ paddingBottom: 0, color: '#000000' }}>
          正在回复：{this.props.replyComment.Name} 说的 “{this.props.replyComment.Content.substr(0, 10)}...”。
            <a
            href={'ja' + 'vascript:;'} // eslint-disable-line
              onClick={this.handleCancel}>[取消]</a>
          </CardContent>
          : null
        }
        <CardContent>
          <TextField
            className={c.input}
            onKeyDown={this.handleKeyDown}
            label='Name'
            onChange={this.handleChange('name')}
            value={this.state.name} />
          <TextField
            className={c.input}
            onKeyDown={this.handleKeyDown}
            type='email'
            label='Email'
            onChange={this.handleChange('email')}
            value={this.state.email} />
          <TextField
            className={c.input}
            onKeyDown={this.handleKeyDown}
            label='Website'
            onChange={this.handleChange('url')}
            value={this.state.url} />
          <TextField
            className={c.textarea}
            placeholder='谢绝“好厉害”“好屌”“支持”“顶”等无意义评论；当我回复你的评论时，你会收到邮件提醒。'
            multiline
            rows={3}
            label='Content'
            onChange={this.handleChange(`content-${this.props.article.ID}`)}
            value={this.state[`content-${this.props.article.ID}`]} />
        </CardContent>
        <CardActions>
          <Button color='primary' fullWidth onClick={this.handlePostComment} variant='contained'>
            {this.state.buttonText}
          </Button>
        </CardActions>
      </form>
    </Card>)
  }
}

export default CommentPost
