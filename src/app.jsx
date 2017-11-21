import LeftBar from './main/main.left.jsx';
import MainTopLinearProgress from './main/main.line.jsx';
import Hello from './component/helloPanel/index.jsx'
import ContributePanel from './component/contributePanel/index.jsx'
import Offer from './component/offerPanel/index.jsx'
import Test1 from './component/test1.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Provider
} from 'react-redux';
import {
  createStore
} from 'redux';
import menuStore from './store/reducer.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
const store = createStore(menuStore);

class App extends React.Component {
  render() {
    return <Provider store={store}>
            <Router>
              <MuiThemeProvider>
              <div className="main">
                <LeftBar/>
                 <MainTopLinearProgress/>
                  <Route exact path='/' component={Hello}/>
                  <Route path='/test1' component={Test1}/>
                  <Route path='/contribute' component={ContributePanel}/>
                  <Route path='/offer' component={Offer}/>
                </div>
              </MuiThemeProvider>
            </Router>
          </Provider>;
  }
}
// store.dispatch({
//   type: 'ADD_MENU',
//   menu: ['123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123', '123']
// })
export default function() {
  react_dom.render(
    <App/>, document.getElementById('root')
  );
}
