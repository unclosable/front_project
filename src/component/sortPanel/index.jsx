import MainPanel from '../main.panel.jsx'
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui/svg-icons/content/send';
import Sync from 'material-ui/svg-icons/notification/sync';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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

const bubble_sort = 'Bubble Sort';
const simple_selection_sort = 'Simple Selection Sort';
const double_selection_sort = 'Double Selection Sort';

const getSortType = (type) => {

  let sort_type = '';
  switch (type) {
    case bubble_sort:
      sort_type = '冒泡排序'
      break;
    case simple_selection_sort:
      sort_type = '简单选择排序'
      break;
    case double_selection_sort:
      sort_type = '双选择排序'
      break;
    default:
      sort_type = '冒泡排序'
      break;
  }
  return sort_type;
}

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
    let basicClassName = 'sort-item';
    if (this.props.act) {
      basicClassName += ' act';
    }
    if (this.props.forcus) {
      basicClassName += ' forcus';
    }
    return <div className={basicClassName}>
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
        act: false,
        forcus: false
      }
    })
    this.state = {
      list: list,
      changeNum: 0,
      checkNum: 0,
      runable: true,
      sort_type: bubble_sort
    }
  }
  render() {
    let sort_type = getSortType(this.state.sort_type);
    return <MainPanel>
      <div className='sort-card1'>
        <Card>
          <CardHeader title="当前排序算法" />
          <CardText expandable={false}>{sort_type}</CardText>
        </Card>
      </div>
      <div className='sort-card2'>
        <Card>
          <CardText expandable={false}>交换次数：{this.state.changeNum}</CardText>
          <CardText expandable={false}>循环次数：{this.state.checkNum}</CardText>
        </Card>
      </div>
      <div className='middleDiv'>
        <Card>
          <CardActions>
            <FlatButton label="冒泡排序" backgroundColor="#D9EDF7" onClick={()=>{this.setState({sort_type:bubble_sort})}}/>
            <FlatButton label="简单选择排序" backgroundColor="#66AFE9" onClick={()=>{this.setState({sort_type:simple_selection_sort})}}/>
            <FlatButton label="双选择排序" backgroundColor="#00BCD4" onClick={()=>{this.setState({sort_type:double_selection_sort})}}/>
          </CardActions>
          <div className='sort-div'>
              {this.state.list.map((k)=><SortItem key={k.num} num={k.num} act={k.act} forcus={k.forcus}/>)}
          </div>
          <IconButton className='sort-sub' iconStyle={{ color:'#00BCD4'}} onClick={()=>{this._sort_act()}} disabled={!this.state.runable}>
            <Send/>
          </IconButton>
          <IconButton className='sort-reset' iconStyle={{ color:'#00BCD4'}} onClick={()=>{this._reset()}} disabled={!this.state.runable}>
            <Sync/>
          </IconButton>
        </Card>
      </div>
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
        act: false,
        forcus: false
      }
    })
    this.setState({
      list: list
    });
  }
  _sort_act() {
    switch (this.state.sort_type) {
      case bubble_sort:
        this._bubble_sort();
        break;
      case simple_selection_sort:
        this._simple_selection_sort();
        break;
      case double_selection_sort:
        this._double_selection_sort();
        break;
      default:
        this._bubble_sort(thiz);
        break;
    }
  }
  //双选择排序
  _double_selection_sort() {
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
    const upCheckNum = () => {
      let c = thiz.state.checkNum;
      thiz.setState({
        checkNum: c + 1
      })
    }

    const stepAct = (select, check, reset, stepTime, finalAct) => {
      const selectRecall = () => {
        select();
        setTimeout(checkRecall, stepTime)
      }
      const checkRecall = () => {
        check();
        setTimeout(resetRecall, stepTime)
      }
      const resetRecall = () => {
        reset();
        finalAct();
      }
      setTimeout(selectRecall, stepTime)
    }

    let i = 0,
      j = 1;
    let max = i;
    let min = list.length - 1 - i;
    const selectAct = (index) => {
      list[max].act = true;
      list[min].act = true;
      if (list[max].num < list[min].num) {
        let temp = list[max];
        list[max] = list[min];
        list[min] = temp;
      }
      up(list);
    }
    const resetAct = (index) => {
      upC();
      list[i].act = false;
      list[list.length - 1 - i].act = false;
      list[max].act = false;
      list[min].act = false;
      let temp = list[i];
      list[i] = list[max];
      list[max] = temp;
      temp = list[list.length - 1 - i];
      list[list.length - 1 - i] = list[min];
      list[min] = temp;
      up(list);
    }

    const actFunc = (index, finalAct) => {
      upCheckNum();
      stepAct(() => {
        list[index].forcus = true;
        up(list);
      }, () => {
        if (list[index].num > list[max].num) {
          if (max != i)
            list[max].act = false;
          max = index;
          list[max].act = true;
          up(list);
        }
        if (list[index].num < list[min].num) {
          if (min != list.length - 1 - i)
            list[min].act = false;
          min = index;
          list[min].act = true;
          up(list);
        }
      }, () => {
        list[index].forcus = false;
        up(list);
      }, 50, finalAct);

    }

    let si = setInterval(() => {
      if (j == i + 1) {
        selectAct();
      }
      actFunc(j++, () => {
        if (j == list.length - i - 1) {
          resetAct();
          ++i;
          max = i;
          min = list.length - 1 - i;
          j = i + 1;
        }
        if (i == list.length / 2) {
          clearInterval(si);
          thiz.setState({
            runable: true
          })
        }
      });
    }, 181);
  }
  //简单选择排序
  _simple_selection_sort() {
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
    const upCheckNum = () => {
      let c = thiz.state.checkNum;
      thiz.setState({
        checkNum: c + 1
      })
    }

    const stepAct = (select, check, reset, stepTime, finalAct) => {
      const selectRecall = () => {
        select();
        setTimeout(checkRecall, stepTime)
      }
      const checkRecall = () => {
        check();
        setTimeout(resetRecall, stepTime)
      }
      const resetRecall = () => {
        reset();
        finalAct();
      }
      setTimeout(selectRecall, stepTime)
    }

    let i = 0,
      j = 1;
    let max = i;
    const selectAct = (index) => {
      list[index].act = true;
      up(list);
    }
    const resetAct = (index) => {
      upC();
      list[index].act = false;
      list[max].act = false;
      let temp = list[index];
      list[index] = list[max];
      list[max] = temp;
      up(list);
    }

    const actFunc = (index, finalAct) => {
      upCheckNum();
      stepAct(() => {
        list[index].forcus = true;
        up(list);
      }, () => {
        if (list[index].num > list[max].num) {
          if (max != i)
            list[max].act = false;
          max = index;
          list[max].act = true;
          up(list);
        }
      }, () => {
        list[index].forcus = false;
        up(list);
      }, 60, finalAct);

    }

    let si = setInterval(() => {
      if (j == i + 1) {
        selectAct(i);
      }
      actFunc(j++, () => {
        if (j == list.length) {
          resetAct(i);
          i++;
          max = i;
          j = i + 1;
        }
        if (i == list.length - 1) {
          clearInterval(si);
          thiz.setState({
            runable: true
          })
        }
      });
    }, 181);
  }
  //冒泡排序
  _bubble_sort() {
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
    const upCheckNum = () => {
      let c = thiz.state.checkNum;
      thiz.setState({
        checkNum: c + 1
      })
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
      upCheckNum();
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