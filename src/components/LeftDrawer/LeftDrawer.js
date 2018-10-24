
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

import React, { PureComponent } from 'react'

import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import PropTypes from 'prop-types'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import config from '../../utils/config'

import c from './LeftDrawer.scss'
import { Link, Router } from '../../route'

import A from 'components/A'

// const SelectableList = makeSelectable(List)

class LeftDrawer extends PureComponent {
  state = {
    archivesOpen: false,
    commentsOpen: false,
    categoriesOpen: false
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onListChanged: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  toggleArchive = () => {
    this.setState({ archivesOpen: !this.state.archivesOpen })
  }

  toggleComment = () => {
    this.setState({ commentsOpen: !this.state.commentsOpen })
  }

  toggleCategory = () => {
    this.setState({ categoriesOpen: !this.state.categoriesOpen })
  }

  toggleOther = (name) => () => {
    this.setState({ [`${name}Open`]: !this.state[`${name}Open`] })
  }

  pushRoute = ({ to, component, params }) => () => {
    if (!/^http/.test(to)) {
      Router.pushRoute(to)
    } else {
      window.open(to)
    }
    this.props.onClose()
  }

  ClickableListItem = ({ to, ...props }) => (
    to ? (
      <Link to={to} passHref>
        <ListItem button component={A} onClick={this.props.onClose} {...props} />
      </Link>)
      : <ListItem button {...props} />
  )

  render () {
    const ClickableListItem = this.ClickableListItem
    const archives = !this.props.data || !this.props.data.archives ? [] : this.props.data.archives
    const categories = !this.props.data || !this.props.data.categories ? [] : this.props.data.categories
    const comments = !this.props.data || !this.props.data.comments ? [] : this.props.data.comments
    const others = !this.props.data || !this.props.data.others ? {} : this.props.data.others
    return (
      <Drawer
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <div className={c.logo} onClick={this.onLogoClicked}>
          {config.title}
        </div>
        <List
          onChange={this.props.onListChanged}
          className={c.list}
        >
          <ClickableListItem to='/'>
            <ListItemText primary='Index' />
          </ClickableListItem>
          <ClickableListItem to='/post/2'>
            <ListItemText primary='Guestbook' />
          </ClickableListItem>
          <ClickableListItem to={config.github} target='_blank'>
            <ListItemText primary='GitHub' />
          </ClickableListItem>
          <Divider />
          <ListItem button onClick={this.toggleArchive}>
            <ListItemText primary={`Archives (${archives.length})`} />
            {this.state.archivesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.archivesOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {archives.map(archive =>
                <ClickableListItem key={archive.text} to={archive.url} className={c.sub}>
                  <ListItemText primary={archive.text} />
                </ClickableListItem>
              )}
            </List>
          </Collapse>

          <ListItem button onClick={this.toggleCategory}>
            <ListItemText primary={`Categories (${categories.length})`} />
            {this.state.categoriesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.categoriesOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {categories.map(category =>
                <ClickableListItem key={category.text} to={category.url} className={c.sub}>
                  <ListItemText primary={category.text} />
                </ClickableListItem>
              )}
            </List>
          </Collapse>

          <ListItem button onClick={this.toggleComment}>
            <ListItemText primary={`Comments`} />
            {this.state.commentsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.commentsOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {comments.map(comment =>
                <ClickableListItem key={comment.text} to={comment.url} className={c.sub}>
                  <ListItemText primary={comment.text} />
                </ClickableListItem>
              )}
            </List>
          </Collapse>

          {Object.keys(others).map(k => (
            <React.Fragment key={others[k].Name}>
              <ListItem button onClick={this.toggleOther(others[k].Name)}>
                <ListItemText primary={others[k].Name} />
                {this.state[`${others[k].Name}Open`] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state[`${others[k].Name}Open`]} timeout='auto' unmountOnExit>
                <div key={k} className={c.sub}>
                  <div dangerouslySetInnerHTML={{ __html: others[k].Content }} />
                </div>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    )
  }
}

export default LeftDrawer
