import {updateObject} from '../utility'
import * as actionTypes from '../_actions/actionTypes';


const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_LOCAL_DATA:
      return updateObject(state, action.localData);
    case actionTypes.REMOVE_LOCAL_DATA: {
      let newState = {...state};
      delete newState[action.key];
      return newState;
    }
    case actionTypes.CLEAR_LOCAL_DATA: {
      return {};
    }
    default:
      return state;
  }
};

export default reducer;
