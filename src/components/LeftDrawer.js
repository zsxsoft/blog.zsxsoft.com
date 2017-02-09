import React, { PropTypes, PureComponent } from 'react'
import Drawer from 'material-ui/Drawer'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import {spacing, typography, zIndex} from 'material-ui/styles'
import {grey800} from 'material-ui/styles/colors'

const SelectableList = makeSelectable(List)

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: grey800,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8
  }
}

class LeftDrawer extends PureComponent {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onLogoClicked: PropTypes.func.isRequired,
    onListChanged: PropTypes.func.isRequired,
    onRequestChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {open: props.open}
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      open: nextProps.open
    })
  }

  render () {
    const archives = !this.props.data || !this.props.data.archives ? [] : this.props.data.archives
    const categories = !this.props.data || !this.props.data.categories ? [] : this.props.data.categories
    return (
      <Drawer docked={false} open={this.state.open} containerStyle={{zIndex: zIndex.drawer - 100}}
        onRequestChange={this.props.onRequestChange}>
        <div style={styles.logo} onClick={this.onLogoClicked}>
          zsx's Blog
        </div>
        <SelectableList
          value={this.props.location.pathname}
          onChange={this.props.onListChanged}
        >
          <ListItem primaryText='Index' value='/' />
          <ListItem primaryText='GitHub' value='https://github.com/zsxsoft' />
          <ListItem primaryText='About' value='/post/9' />
          <Divider />
          <ListItem primaryText={`Archives (${archives.length})`}
            primaryTogglesNestedList
            nestedItems={archives.map(archive =>
              <ListItem primaryText={archive.text} value={archive.url} />
            )}
          />
          <ListItem primaryText={`Categories (${categories.length})`}
            primaryTogglesNestedList
            nestedItems={categories.map(category =>
              <ListItem primaryText={category.text} value={category.url} />
            )}
          />
        </SelectableList>
      </Drawer>
    )
  }
}

export default LeftDrawer
