import MainPanel from '../main.panel.jsx'
import TextField from 'material-ui/TextField';

//递归调用
const f0 = (n) => {
  if (n == 1 || n == 2) {
    return 1;
  }
  return f0(--n) + f0(--n);
}
//尾递归调用
const f1 = (n, sn = 1, sn1 = 1) => {
  if (n == 2 || n == 1) {
    return sn1
  }
  return f1(n - 1, sn1, sn + sn1);
}
//数组实现
const f2 = (n) => {
  const array = new Array(n);
  for (let i = 0; i < n; i++) {
    if (i == 0 || i == 1) {
      array[i] = 1;
    } else {
      array[i] = array[i - 1] + array[i - 2]
    }
  }
  return array[n - 1];
}

class ContributePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      multiLine: false,
      errorText: '',
      re: 0
    }
  }

  handleChange(event) {
    const value = event.target.value;
    if (new RegExp(/^\d+$/).test(value)) {
      const re = this.fib(value);
      this.setState({
        value: value,
        multiLine: false,
        errorText: '',
        re: re
      });
    } else {
      this.setState({
        value: '',
        multiLine: true,
        errorText: '需要为正整数',
        re: 0
      });

    }
  }
  fib(value) {
    if (new RegExp(/^\d+$/).test(value)) {
      return f2(value);
    } else {
      return 0
    }
  }

  render() {
    return <MainPanel disBackHome>
      <div className='middleDiv'><TextField
        hintText="输入一个正整数"
        errorText={this.state.errorText}
        value={this.state.value}
        onChange={(e)=>{this.handleChange(e)}}
        floatingLabelText="求通项"
        multiLine={this.state.multiLine}
        rows={2}
        /><br />
        <TextField
        floatingLabelText="通项"
          disabled={true}
          value={this.state.re}
        />
      </div>
    </MainPanel>;
  }
}
export default ContributePanel;
