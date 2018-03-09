//main component
import LeftBar from './main/main.left.jsx';
import MainTopLinearProgress from './main/main.line.jsx';
//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import menuStore from './store/reducer.js' //MY STORE
//router
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import routerMap from './route'
//UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ContributePanel from './component/contributePanel/index.jsx'
import Hello from './component/helloPanel/index.jsx'
import Offer from './component/offerPanel/index.jsx'
import Sort from './component/sortPanel/index.jsx';
import Test1 from './component/test1.jsx'

const routes = routerMap.map((r, index) => < Route exact key={index} path={r.path} component={r.component} />);

const store = createStore(menuStore);

class App extends React.Component {
  render() {
    return <Provider store={store}>
      <Router>
        <MuiThemeProvider>
          <div className="main">
            <LeftBar />
            <MainTopLinearProgress />
            <Switch>
              {routes}
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    </Provider>;
  }
}
export default function () {
  react_dom.render(<App />, document.getElementById('root'));
}
