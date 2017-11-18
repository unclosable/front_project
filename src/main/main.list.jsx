import {
  List,
  ListItem
} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {
  connect
} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'

class LinkedListItem extends React.Component {
  render() {
    return <NavLink to={this.props.to} activeStyle={{color: '#44bbd0', borderBottom: "100px solid #cfd0d0" }}>
        <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
    </NavLink>
  }
}

class ListExampleSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: props.menus
    };
  }
  render() {
    return <div className=''>
        <List className='top'>
          <LinkedListItem to="/test1" leftIcon={<ContentInbox />} />
          <LinkedListItem to="/main" leftIcon={<ContentInbox />} />
          { this.state.menus.map(name=>
            <ListItem primaryText={name} leftIcon={<ContentInbox />} />
          ) }
        </List>
        <List className='bottom'>
          <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
          <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
          <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
          <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
        </List>
      </div>;
  }
}
const mapStateToProps = (state) => {
  return {
    menus: state.addMenu
  }
}

const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    addMenu: (menu) => {
      dispatch({
        type: 'ADD_MENU',
        menu: menu
      });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListExampleSimple);
