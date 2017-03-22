import React, { PureComponent, PropTypes } from 'react'
import { Card, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const textFieldStyle = {
  width: 'calc(33.333333% - 3rem)',
  marginLeft: '1rem',
  marginRight: '1rem'
}

export default class CommentPost extends PureComponent {
  static propTypes = {
    onPosted: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
    revertComment: PropTypes.object,
    onRevertClicked: PropTypes.func.isRequired
  }

  constructor (props) {
    let savedState = {}
    super(props)
    try {
      if (localStorage.userData) {
        savedState = JSON.parse(localStorage.userData)
      }
    } catch (e) {
      console.log('Cannot load saved state: ', e)
    }
    this.state = {
      name: savedState.name || '',
      email: savedState.email || '',
      url: savedState.url || '',
      buttonText: 'COMMENT NOW'
    }
  }

  setButtonText = (text, duration = 4000) => {
    this.setState({buttonText: text}, () => {
      setTimeout(() => {
        this.setState({buttonText: 'COMMENT NOW'})
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
    this.setState({[`content-${this.props.article.ID}`]: ''})
  }

  handleChange = state => target => {
    this.setState({[state]: target.currentTarget.value}, () => {
      this.saveDataToLocalStorage()
    })
  }

  handlePostComment = () => {
    const {article, revertComment} = this.props
    const {name, email, url} = this.state
    const content = this.state[`content-${article.ID}`]
    const revertCommentId = revertComment === null ? 0 : revertComment.ID
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
    formData.append('replyid', revertCommentId)
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

  handleCancel = () => this.props.onRevertClicked(null)

  handleKeyDown = target => {
    if (target.keyCode === 13) this.handlePostComment()
  }

  render () {
    return (<Card style={{backgroundColor: 'auto'}}>
      <form>
        {this.props.revertComment
        ? <CardText style={{paddingBottom: 0}}>
          正在回复：{this.props.revertComment.Name} 说的 “{this.props.revertComment.Content.substr(0, 10)}...”。
          <a
            href={'ja' + 'vascript:;'} // eslint-disable-line
            onClick={this.handleCancel}>[取消]</a>
        </CardText>
        : null
      }
        <CardText style={{paddingTop: 0}}>
          <TextField style={textFieldStyle} onKeyDown={this.handleKeyDown} floatingLabelText='Name' onChange={this.handleChange('name')} value={this.state.name} />
          <TextField style={textFieldStyle} type='email' onKeyDown={this.handleKeyDown} floatingLabelText='Email' onChange={this.handleChange('email')} value={this.state.email} />
          <TextField style={textFieldStyle} onKeyDown={this.handleKeyDown} floatingLabelText='Website' onChange={this.handleChange('url')} value={this.state.url} />
          <TextField style={Object.assign({}, textFieldStyle, {width: 'calc(100% - 5rem)'})}
            hintText='发表“好厉害”“好屌”“支持”“顶”等无意义评论，或是发广告，一律封IP :)'
            floatingLabelText='Content' onChange={this.handleChange(`content-${this.props.article.ID}`)} value={this.state[`content-${this.props.article.ID}`]} />
        </CardText>
        <CardActions>
          <RaisedButton primary fullWidth label={this.state.buttonText} onClick={this.handlePostComment} style={{color: '#ffffff'}} />
        </CardActions>
      </form>
    </Card>)
  }
}
