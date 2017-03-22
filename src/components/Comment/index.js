import React, { PropTypes } from 'react'
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import {formatDate} from '../../utils'

const iconButtonElement = (
  <IconButton
    touch
    tooltip='more'
    tooltipPosition='bottom-left'
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
)

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
)

export default class Comments extends React.PureComponent {
  static propTypes = {
    comments: PropTypes.array.isRequired
  }

  makeComments = (comments, isChild = false) => comments.map(comment =>
    <Card className='comment' style={{
      backgroundColor: 'auto',
      width: isChild ? '90%' : '100%',
      marginLeft: isChild ? '3rem' : 'auto',
      marginTop: isChild ? '0.2rem' : '1rem',
      paddingBottom: '1rem'
    }}>
      <CardHeader title={
        <span>
          <a href={comment.HomePage} target='_blank' rel='nofollow'>{comment.Name}</a> at {formatDate(comment.PostTime)}
          <a style={{marginLeft: '1rem'}}href='javascript:;'>[回复]</a>
        </span>
      }
        subtitle={
          <span className='useragent-js' data-useragent={comment.Agent } />
        }
        style={{
          paddingBottom: 0
        }}
        avatar={<Avatar style={{marginTop: 8}} src={comment.Avatar} />} />
      <CardText style={{
        paddingTop: 0,
        paddingBottom: 0,
        color: '#ffffff'
      }} dangerouslySetInnerHTML={{__html: comment.Content}} />
      {this.makeComments(comment.Comments, true)}
      <footer />
    </Card>
      )

  render () {
    return (<div>
      {this.makeComments(this.props.comments)}
    </div>)
  }
  /*
        <div>
        <span className='comment--name'></span>

        <span className='comment--revert'>回复</span>
      </div>
       */
}
