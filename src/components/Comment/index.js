import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import { animateToPosition, getElementPosition } from '../../utils/scroll'

import Avatar from '@material-ui/core/Avatar'
import Post from './Post'
import PropTypes from 'prop-types'
import React from 'react'
import { formatDate } from '../../utils'
import cn from 'classnames'
import UserAgent from '../UserAgent'

import c from './comment.scss'

class Comments extends React.Component {
  state = {
    replyComment: null
  }

  static propTypes = {
    article: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    onCommentPosted: PropTypes.func.isRequired,
    postArea: PropTypes.bool.isRequired
  }

  handleReplyClicked = (comment) => () => {
    const elementPosition = getElementPosition(document.getElementById('comment-post'))
    animateToPosition(elementPosition.y)
    this.setState({ replyComment: comment })
  }

  makeComments = (comments, isChild = false) => comments.map(comment =>
    <Card
      className={cn({
        [c.comment]: true,
        [c.childComment]: isChild
      })}
      key={comment.ID}
    >
      <CardHeader
        className={c.author}
        title={
          <span className={c.authorText}>
            <a href={comment.HomePage} target='_blank' rel='nofollow'>
              {comment.Name}
            </a>
            <span>{' '}at {formatDate(comment.PostTime)}</span>
            <a
              className={c.replyLink}
              href={'ja' + 'vascript:;'} // eslint-disable-line
              onClick={this.handleReplyClicked(comment)}
            >
              [回复]
            </a>
          </span>
        }
        subheader={
          <UserAgent userAgent={comment.Agent} />
        }
        avatar={<Avatar src={comment.Avatar} className={c.avatar} />} />
      <CardContent className={c.content} dangerouslySetInnerHTML={{ __html: comment.Content }} />
      {this.makeComments(comment.Comments, true)}
    </Card>
  )

  render () {
    return (<div>
      {this.makeComments(this.props.comments)}
      {this.props.postArea
        ? <Post article={this.props.article} onPosted={this.props.onCommentPosted} replyComment={this.state.replyComment} onReplyClicked={this.handleReplyClicked(null)} />
        : null}
    </div>)
  }
}

export default Comments
