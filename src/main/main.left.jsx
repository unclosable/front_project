import Sort from 'material-ui/svg-icons/content/sort';
import Mood from 'material-ui/svg-icons/social/mood';
import Drafts from 'material-ui/svg-icons/content/drafts';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MenuList from './main.list.jsx'
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import CompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton';

class MyMenu extends React.Component {
  render() {
    const { leftIcon, menuText } = this.props;
    return <MenuItem leftIcon={leftIcon}>{menuText}</MenuItem>
  }
}

class LinkedIconBtn extends React.Component {
  render() {
    return <Link to={this.props.to}>
      <IconButton tooltip={this.props.tip} touch={true} onClick={this.props.onClick} tooltipPosition="top-right" iconStyle={this.props.iconStyle}>
        {this.props.icon}
      </IconButton>
    </Link>
  }
}

const contributeColors = [
  '#B71C1C',
  '#8C9EFF',
  '#006064',
  '#AFB42B',
  '#FF9E80',
  '#607D8B',
  '#00E676',
  '#5C6BC0'
];

class LeftBar extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      colorIndex: 0,
      color: contributeColors[ 0 ]
    };
  }
  componentDidMount() {
    this._contributeIcon();
  }
  render() {
    const { showMenu, hideMenu, setMenu } = this.props
    const color = this.state.color;
    const iconStyle = {
      color: color
    }
    return <div className="leftTopIcon">
      <IconButton tooltip="MENUS" touch={true} tooltipPosition="bottom-right">
        <Sort onClick={showMenu}/>
      </IconButton>
      <Drawer docked={false} width={200} open={this.props.show} onRequestChange={( show ) => setMenu( show )}>
        <div className=" hiddenOvweflow">
          <div className="leftTopMenu">
            <MenuItem>Menu Item</MenuItem>
            <MyMenu leftIcon={<CompareArrows />} menuText="排序PLAYs"/>
          </div>
        </div>
        <div className="leftBottomBtn">
          <LinkedIconBtn to='/contribute' tip='CONTRIBUTE' icon={<Mood />} iconStyle={iconStyle} onClick={() => {
              hideMenu()
            }}/>
          <LinkedIconBtn to='/offer' tip='OFFER' icon={<Drafts />} onClick={() => {
              hideMenu()
            }}/>
        </div>
      </Drawer>
    </div>
  }
  componentWillUnmount() {
    clearTimeout( this.state.intervalID )
  }
  _contributeIcon() {
    const thiz = this;
    const interval = () => {
      let ci = thiz.state.colorIndex,
        c;
      if ( ci < contributeColors.length ) {
        c = contributeColors[ ci ];
        ci += 1;
      } else {
        c = contributeColors[ 0 ];
        ci = 1;
      }
      thiz.setState( { colorIndex: ci, color: c } )
    }
    thiz.setState( {
      intervalID: setInterval( interval, 500 )
    } )
  }
}

const mapStateToProps = ( state ) => {
  return { show: state.showMenu.show, menus: state.addMenu }
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    showMenu: () => {
      dispatch( { type: 'SHOW', show: true } );
    },
    hideMenu: () => {
      dispatch( { type: 'SHOW', show: false } );
    },
    setMenu: ( show ) => {
      dispatch( { type: 'SHOW', show: show } );
    },
    addMenu: ( menu ) => {
      dispatch( { type: 'ADD_MENU', menu: menu } );
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( LeftBar )
