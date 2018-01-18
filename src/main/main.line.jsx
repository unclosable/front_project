import CircularProgress from 'material-ui/CircularProgress';
import uuid from '../utils/uuid.js'
import {
  connect
} from 'react-redux'

class MainTopLinearProgress extends React.Component {
  _getMode(uuids) {
    return uuids.length == 0
  }
  render() {
    const { uuids } = this.props;
    if (this._getMode(uuids))
      return <div></div>
    else
      return <CircularProgress style={{
          position: 'absolute',
          right:1,
          top:1
        }} size={40} thickness={1} />
  }
}


const mapStateToProps = (state) => {
  return {
    uuids: state.theLoading
  }
}


export default connect(mapStateToProps)(MainTopLinearProgress)