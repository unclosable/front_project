import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import {
  Link
} from 'react-router-dom'
export default class Main extends React.Component {
  render() {
    const disBackHome = this.props.disBackHome;
    return <div className="main panel">
      {this.props.children}
      {disBackHome ? '' :
        <Link to='/' className="right-bottom">
          <IconButton tooltip="BACK HOME PAGE" tooltipPosition="top-left">
            <ActionHome />
          </IconButton>
        </Link>}
    </div>
  }
}
