import LinearProgress from 'material-ui/LinearProgress';
import uuid from '../utils/uuid.js'
import {
  connect
} from 'react-redux'

class MainTopLinearProgress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uuids: props.uuids
    }
  }

  _getMode() {
    return this.state.uuids.length == 0 ? 'determinate' : 'indeterminate'
  }
  render() {
    return <LinearProgress mode={this._getMode()} />
  }
}


const mapStateToProps = (state) => {
  return {
    uuids: state.theLoading
  }
}


export default connect(mapStateToProps)(MainTopLinearProgress)
