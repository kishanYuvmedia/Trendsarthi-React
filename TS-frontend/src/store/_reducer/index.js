import {combineReducers} from 'redux';
import localData from './localData';
import cacheData from './cacheData';
import network from "./network";

const appReducer = combineReducers({
  localData,
  network,
  cacheData
});

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_ALL_DATA') {
    // clearLocalStorage();
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
