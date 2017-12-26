import MainPanel from '../main.panel.jsx'
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui/svg-icons/content/send';
import Sync from 'material-ui/svg-icons/notification/sync';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
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
const GetRandomList = (max, len) => {
  let originalArray = []; //原数组
  let reList = []
  //给原数组originalArray赋值
  for (var i = 0; i < max; i++) {
    originalArray.push(i + 1);
  }
  for (i = 0; i < len; i++) {
    let index = Math.floor(Math.random() * originalArray.length); //随机取一个位置
    reList.push(originalArray.splice(index, 1)[0]);
  }
  return reList;

}
const GetRandomNum = (Min, Max, list) => {
  let Range = Max - Min;
  let Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}
const roa = (arr) => //arr为可能出现的元素集合
  {
    var temp = new Array(); //temp存放生成的随机数组
    var count = arr.length;
    for (let i = 0; i < count; i++) {
      var num = Math.floor(Math.random() * arr.length); //生成随机数num
      temp.push(arr[num]); //获取arr[num]并放入temp
      arr.splice(num, 1);
    }
    return temp;
  }
const heightFunc = (height) => {
  return (100 - height) + '%';
}

const sleep = (numberMillis) => {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return;
  }
}

class SortItem extends React.Component {
  render() {
    let item = heightFunc(this.props.num);
    let className = this.props.act ? 'sort-item act' : 'sort-item';
    return <div className={className}>
        <div className='top' style={{
              height:item
          }}><div className='front'>{this.props.num}</div></div>
    </div>
  }
}

class Sort extends React.Component {
  constructor(props) {
    super(props);
    let list = GetRandomList(100, 50);
    list = list.map(num => {
      return {
        num: num,
        act: false
      }
    })
    this.state = {
      list: list,
      changeNum: 0,
      runable: true
    }
  }
  render() {
    return <MainPanel>
      <div className='sort-card'>
      <Card>
    <CardHeader
      title="交换次数"
    />
  <CardText expandable={false}>{this.state.changeNum}
    </CardText>
  </Card></div>
      <div className='middleDiv'>
        <div className='sort-div'>
          {this.state.list.map((k)=><SortItem key={k.num} num={k.num} act={k.act}/>)}
        </div>
      </div>
      <IconButton className='sort-sub' iconStyle={{ color:'#00BCD4'}} onClick={()=>{this._sort_act()}} disabled={!this.state.runable}>
        <Send/>
      </IconButton>
      <IconButton className='sort-reset' iconStyle={{ color:'#00BCD4'}} onClick={()=>{this._reset()}} disabled={!this.state.runable}>
        <Sync/>
      </IconButton>
    </MainPanel>;
  }
  _valueChange(value, key) {
    const state = {}
    state[key] = value
    this.setState(state)
  }
  _reset(value) {
    let list = GetRandomList(100, 50);
    list = list.map(num => {
      return {
        num: num,
        act: false
      }
    })
    this.setState({
      list: list
    });
  }
  _sort_act() {
    const thiz = this;
    thiz.setState({
      runable: false
    })
    const list = this.state.list;
    const up = (list) => {
      thiz.setState({
        list: list
      })
    }
    const upC = () => {
      let c = thiz.state.changeNum;
      thiz.setState({
        changeNum: c + 1
      })
    }
    for (let i = 0; i < list.length - 1; i++) {
      for (let j = 0; j < list.length - i - 1; j++) {

      }
    }

    const stepAct = (select, check, reset, stepTime) => {
      const selectRecall = () => {
        select();
        setTimeout(checkRecall, stepTime)
      }
      const checkRecall = () => {
        check();
        setTimeout(reset, stepTime)
      }
      setTimeout(selectRecall, stepTime)

    }

    const actFunc = (j) => {
      stepAct(() => {
        list[j].act = true;
        list[j + 1].act = true;
        up(list);
      }, () => {
        if (list[j].num < list[j + 1].num) {
          let temp = list[j];
          list[j] = list[j + 1];
          list[j + 1] = temp
          upC();
          up(list);
        }
      }, () => {
        list[j].act = false;
        list[j + 1].act = false;
        up(list);
      }, 50);
    }

    let i = 0,
      j = 0;
    let si = setInterval(() => {
      actFunc(j++);
      if (j == list.length - i - 1) {
        j = 0;
        i++;
      }
      if (i == list.length - 1) {
        clearInterval(si);
        thiz.setState({
          runable: true
        })
      }
    }, 160);
  }
  _sort() {
    const thiz = this;
    const list = this.state.list;
    for (let i = 0; i < list.length - 1; i++) {
      for (let j = 0; j < list.length - i - 1; j++) {
        if (list[j] < list[j + 1]) {
          let temp = list[j];
          list[j] = list[j + 1];
          list[j + 1] = temp
        }
      }
    }
    thiz.setState({
      list: list
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

export default connect(mapStateToProps, mapDispatchToProps)(Sort);