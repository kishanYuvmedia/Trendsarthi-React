import * as actionTypes from './actionTypes';

export const getLocalData = () => {
  return {
    type: actionTypes.GET_LOCAL_DATA
  };
};

export const storeLocalData = (localData) => {
  return {
    type: actionTypes.STORE_LOCAL_DATA,
    localData
  };
};

export const removeLocalData = (key) => {
  return {
    type: actionTypes.REMOVE_LOCAL_DATA,
    key
  };
};

export const clearLocalData = () => {
  return {
    type: actionTypes.CLEAR_LOCAL_DATA
  };
};


export const clearAllData = () => {
  return {
    type: actionTypes.CLEAR_ALL_DATA
  };
};
