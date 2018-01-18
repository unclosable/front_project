import MainPanel from '../main.panel.jsx'
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui/svg-icons/content/send';
import {
  post
} from '../../utils/http';
import {
  addLoading,
  loaded
} from '../../store/main.line/actions.js'
import {
  connect
} from 'react-redux'
import { Redirect } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';
import uuid from '../../utils/uuid'

const min = 10000;
const max = 32000;

class Offer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      snackbarOpen: false,
      postUUID: '',
      reMsg: '',
      compment: '',
      position: '',
      monthPay: '21000',
      alipay: '',
      contact: '',
      message: '',
      loaded: props.loaded,
      loading: props.loading
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />
    }
    return <MainPanel>
      <div className='middleDiv'>
        <Slider className='offerSlider' axis="y" defaultValue={0.5} onChange={(e,v)=>{this._sliderChange(v)}}/>
        <TextField hintText="公司名称" floatingLabelText="公司名称" multiLine={false}
          value={this.state.compment} onChange={(e,value)=>{this._valueChange(value,'compment')}}/>
        <br />
        <TextField hintText="没有名号也不重要其实" floatingLabelText="职位名称" multiLine={true}
          value={this.state.position} onChange={(e,value)=>{this._valueChange(value,'position')}}/>
        <br />
        <TextField hintText="税后实发" floatingLabelText="薪资(RMB/MONTH)" multiLine={true}
          disabled={true} value={this.state.monthPay}/>
        <br />
        <TextField hintText="谢谢老板(｡･ω･｡)" floatingLabelText="捐款交易号" multiLine={true}
          value={this.state.alipay} onChange={(e,value)=>{this._valueChange(value,'alipay')}}/>
        <br />
        <TextField hintText="E-mail/PHONE ..." floatingLabelText="联系方式" multiLine={true}
          value={this.state.contact} onChange={(e,value)=>{this._valueChange(value,'contact')}}/>
        <br />
        <IconButton className='offerSub' iconStyle={{ color:'#00BCD4'}} onClick={()=>{this._fetchOffer()}}>
          <Send/>
        </IconButton>
      </div>
      <Snackbar
        open={this.state.snackbarOpen}
        message={this.state.reMsg}
        autoHideDuration={4000}
        onRequestClose={()=>{this._handleRequestClose()}}
      />
    </MainPanel>;
  }
  _valueChange(value, key) {
    const state = {}
    state[key] = value
    this.setState(state)
  }
  _sliderChange(value) {
    const pay = (max - min) * value + min;
    this.setState({
      monthPay: pay + ''
    })
  }
  _handleRequestClose() {
    this.state.loaded(this.state.postUUID);
    this.setState({
      redirect: true,
      snackbarOpen: false,
    });

  }
  _fetchOffer() {
    const thiz = this;
    const postUUID = uuid();
    thiz.state.loading(postUUID);
    thiz.setState({
      postUUID: postUUID
    })
    post('/offer/post', thiz.state).then((response) => {
      return response.json();
    }).catch((e) => {
      thiz.state.loaded(postUUID);
      thiz.setState({
        snackbarOpen: true,
        reMsg: '发生了未知错误',
      })
    }).then((obj) => {
      if (obj.reCode == 200) {
        thiz.setState({
          snackbarOpen: true,
          reMsg: obj.reMessage,
        })
      }
    });
  }
}


const mapStateToProps = (state) => {
  return {}
}


const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    loading: (uuid) => {
      dispatch(addLoading(uuid));
    },
    loaded: (uuid) => {
      dispatch(loaded(uuid));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Offer);