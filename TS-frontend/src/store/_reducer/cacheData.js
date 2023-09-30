import {updateObject} from '../utility'
import * as actionTypes from '../_actions/actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CACHE_DATA:
      return updateObject(state, action.cachedData);
    case actionTypes.GET_CACHE_DATA:
      return state;
    case actionTypes.CLEAR_CACHE_DATA:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
