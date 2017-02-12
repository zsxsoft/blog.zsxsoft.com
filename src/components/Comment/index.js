import React, { PropTypes } from 'react'
import {List, ListItem, makeSelectable} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'

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

  makeComments = (comments) => comments.map(comment =>
    <div className='comment'>
      <header>
        <span className='comment--name'>{comment.Name} </span>
        <span className='comment--device' title={comment.UserAgent}>
          <span className='comment--useragent-img'>
            <img src='https://static-up.zsxsoft.com/useragent.js/img/16/os/linux.png-webp' alt='GNU\/Linux' />
          </span>GNU/Linux x64
        </span>
        <span className='comment--browser' title={comment.UserAgent}>
          <span className='comment--useragent-img'>
            <img src='https://static-up.zsxsoft.com/useragent.js/img/16/os/linux.png-webp' alt='GNU\/Linux' />
          </span>GNU/Linux x64
        </span>
        <span className='comment--revert'>回复</span>
      </header>
      <content dangerouslySetInnerHTML={{__html: comment.Content}} />
      <footer />
    </div>
      )

  render () {
    return (<div>
      {this.makeComments(this.props.comments)}
    </div>)
  }
}
