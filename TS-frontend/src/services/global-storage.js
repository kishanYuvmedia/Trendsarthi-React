import store from "../store/index"
import _ from "lodash"
import axios from 'axios';
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
const getSectorList = async (value) => {
  try {
    const url = `https://www.nseindia.com/api/equity-stockIndices?index=${value}`;
    const headers = {
      Referer: `https://www.nseindia.com/market-data/live-equity-market?symbol=${value}`,
      "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    };
    // Make the API request
    const response = await axios.get(url, { headers });
    return response; // Return the resolved response
  } catch (error) {
    console.error("Error fetching sector list:", error);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};
export {
  removeItem,
  hasUserAlreadyLoggedIn,
  clearLocalData,
  storeLocalData,
  getLocalData,
  removeLocalData,
  getAccessToken,
  getSectorList,
}
