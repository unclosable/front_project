import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

function handleTouchTap() {
  alert('onClick triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer'
  },
};

class BarItem extends React.Component {
    render() {
        return <AppBar
            title={<span style={styles.title}>{this.props.title}</span>}
            onTitleTouchTap={handleTouchTap}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            style={{
              width:'150px',
              height:'100%',
              display:'inline',
              position:'relative',
              float:'left'
            }}
            />
        }
}

export default class MainBar extends React.Component {
    render() {
      return <div className='topBar'>
        <div className='left'>
          <BarItem title="测试" />
          <BarItem title="测试" />
          <BarItem title="测试" />
          <BarItem title="测试" />
          <BarItem title="测试" />
          <BarItem title="测试" />
        </div>
        <div className='right'>
          <NotificationsIcon />
        </div>
      </div>;
    }
}
