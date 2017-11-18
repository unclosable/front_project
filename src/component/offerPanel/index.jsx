import MainPanel from '../main.panel.jsx'
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';


const min = 10000;
const max = 32000;

class Offer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compment: '',
      position: '',
      monthPay: '21000',
      aliPay: '',
      contact: ''
    }
  }
  render() {
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
          value={this.state.aliPay} onChange={(e,value)=>{this._valueChange(value,'aliPay')}}/>
        <br />
        <TextField hintText="E-mail/PHONE ..." floatingLabelText="联系方式" multiLine={true}
          value={this.state.contact} onChange={(e,value)=>{this._valueChange(value,'contact')}}/>
        <br />
      </div>
    </MainPanel>;
  }
  _valueChange(value, key) {
    const state = {}
    state[key] = value
    this.setState(state)
  }
  _sliderChange(value) {
    const pay = (max - min) * value + min;
    this.setState({ monthPay: pay + '' })
  }
}
export default Offer;
