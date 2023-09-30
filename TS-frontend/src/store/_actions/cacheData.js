import * as actionTypes from './actionTypes';

export function loadCacheData(cachedData) {
  return {
    type: actionTypes.LOAD_CACHE_DATA,
    cachedData,
  };
}

export function getCacheData() {
  return {
    type: actionTypes.GET_CACHE_DATA
  };
}

export function clearCacheData() {
  return {
    type: actionTypes.CLEAR_CACHE_DATA
  };
}



