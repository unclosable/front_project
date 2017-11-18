import MainPanel from '../main.panel.jsx'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

const style = {}
class ContributePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: true
    }
  }
  clickHandler() {
    this.setState({
      snackbarOpen: true
    });
  }
  handleRequestClose() {
    this.setState({
      snackbarOpen: false
    });
  }
  render() {
    return <MainPanel>
        <Paper className="middleDiv" style={{ padding:10 }} zDepth={1} onClick={()=>{this.clickHandler()}}>
          <img src="/img/WechatIMG3.png"></img>
        </Paper>
        <Snackbar
          open={this.state.snackbarOpen}
          message="我也不知道为什么，既然你想要……"
          autoHideDuration={4000}
          onRequestClose={()=>{this.handleRequestClose()}}
        />
    </MainPanel>;
  }
}
export default ContributePanel;
