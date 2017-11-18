import {
  ADD_MENU,
  SHOW,
  RESETCOLOR
} from './actions.jsx'
import {
  combineReducers
} from 'redux'

function addMenu(state = [], action) {
  switch (action.type) {
    case ADD_MENU:
      {
        return [...state, ...action.menu]
      }
    default:
      return state;
  }
}

function showMenu(state = { show: false }, action) {
  switch (action.type) {
    case SHOW:
      {
        return Object.assign({}, state, {
          show: action.show
        })
      }
    default:
      return state
  }
}

function setColor(state = '#B71C1C', action) {
  switch (action.type) {
    case RESETCOLOR:
      return action.color;
    default:
      return state

  }
}

export default combineReducers({
  addMenu,
  showMenu,
  setColor
})
