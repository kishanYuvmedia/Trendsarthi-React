import * as actionTypes from './actionTypes';

export function apiError(errorMessage) {
  return {
    type: actionTypes.API_ERROR,
    errorMessage,
  };
}

export function apiClose() {
  return {
    type: actionTypes.API_CLOSE
  };
}

export function apiRequest(loadingText) {
  return {
    type: actionTypes.API_REQUEST,
    loadingText,
  };
}


