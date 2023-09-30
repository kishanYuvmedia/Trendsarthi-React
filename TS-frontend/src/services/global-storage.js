import store from "../store/index"
import _ from "lodash"

const removeItem = key => {
  // SyncStorage.remove(key);
}
const hasUserAlreadyLoggedIn = () => {
  return !_.isEmpty(getLocalData("accessToken"))
}

const storeLocalData = (key, value) => {
  localStorage.setItem(key, value)
}

const removeLocalData = key => {
  localStorage.removeItem(key)
}

const clearLocalData = key => {
  store.dispatch({ type: "REMOVE_LOCAL_DATA", key: key })
}

const getLocalData = key => {
  return localStorage.getItem(key)
}

const getAccessToken = async () => {
  return localStorage.getItem("accessToken")
}

export {
  removeItem,
  hasUserAlreadyLoggedIn,
  clearLocalData,
  storeLocalData,
  getLocalData,
  removeLocalData,
  getAccessToken,
}
