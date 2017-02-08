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
    data: PropTypes.object.isRequired
  }

  onListChanged = () => {

  }

  render () {
    const archives = !this.props.data || !this.props.data.archives ? [] : this.props.data.archives
    const categories = !this.props.data || !this.props.data.categories ? [] : this.props.data.categories
    return (
      <Drawer open={this.props.open} containerStyle={{zIndex: zIndex.drawer - 100}}>
        <div style={styles.logo} onClick={this.onLogoClicked}>
          zsx's Blog
        </div>
        <SelectableList
          value={location.pathname}
          onChange={this.onListChanged}
        >
          <ListItem primaryText='Index' />
          <ListItem primaryText='GitHub' />
          <ListItem primaryText='About' />
          <Divider />
          <ListItem primaryText='Archives'
            nestedItems={archives.map(archive =>
              <ListItem primaryText={archive.text} />
            )}
          />
          <ListItem primaryText='Categories'
            nestedItems={categories.map(category =>
              <ListItem primaryText={category.text} />
            )}
          />
          <Divider />
          <ListItem primaryText='CC' />
        </SelectableList>
      </Drawer>
    )
  }
}

export default LeftDrawer
