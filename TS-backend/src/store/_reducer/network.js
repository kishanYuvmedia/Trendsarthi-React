import * as actionTypes from '../_actions/actionTypes';

const initialState = {
  fullPageLoader: false,
  loadingText: '',
  apiError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.API_ERROR:
    // return updateObject(state, {fullPageLoader: false, loadingText: '', apiError: action.errorMessage});
    case actionTypes.API_REQUEST:
    // return updateObject(state, {fullPageLoader: false, loadingText: action.loadingText, apiError: null});
    case actionTypes.API_CLOSE:
    // return updateObject(state, {fullPageLoader: false, loadingText: '', apiError: null});
    default: {
      // return state;
    }
      return state;
  }
};
export default reducer;


