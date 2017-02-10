import React, { PropTypes, PureComponent } from 'react'
import Drawer from 'material-ui/Drawer'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import {spacing, typography, zIndex} from 'material-ui/styles'
import ExtensionDuoshuo from './Duoshuo/Extensions'
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
    const others = !this.props.data || !this.props.data.others ? {} : this.props.data.others
    return (
      <Drawer docked={false} open={this.state.open} containerStyle={{zIndex: zIndex.drawer - 100}}
        onRequestChange={this.props.onRequestChange}>
        <div style={styles.logo} onClick={this.onLogoClicked}>
          {window.config.title}
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
              <ListItem key={archive.text} primaryText={archive.text} value={archive.url} />
            )}
          />
          <ListItem primaryText={`Categories (${categories.length})`}
            primaryTogglesNestedList
            nestedItems={categories.map(category =>
              <ListItem key={category.text} primaryText={category.text} value={category.url} />
            )}
          />
          <Divider />
          {Object.keys(others).map(k => (
            <ListItem primaryText={others[k].Name}
              primaryTogglesNestedList
              initiallyOpen
              nestedItems={[
                <div key={k} style={{marginLeft: '1em', marginRight: '1em'}}>
                  {others[k].HtmlID.slice(0, 3) === 'ds-'
                    ? <ExtensionDuoshuo type={others[k].HtmlID.slice(3)} data-num-items={others[k].MaxLi} />
                    : <div dangerouslySetInnerHTML={{__html: others[k].Content}} />
                  }
                </div>
              ]}
            />
          ))}
        </SelectableList>
      </Drawer>
    )
  }
}

export default LeftDrawer
